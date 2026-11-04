import { normalizeDemo, validateDemo } from '../../../lib/demo';

// Simple in-memory rate limit: 5 requests per IP per 10 minutes.
// Replace with a shared store (e.g. Redis) when running multiple instances.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(time => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 10_000) return Response.json({ ok: false, message: 'Request too large.' }, { status: 413 });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return Response.json({ ok: false, message: 'Too many requests. Please try again later.' }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (typeof body.website === 'string' && body.website.trim() !== '') return Response.json({ ok: true });

  const data = normalizeDemo(body);
  const errors = validateDemo(data);
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  const webhook = process.env.DEMO_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'frigoflow-website', submittedAt: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    } catch (error) {
      console.error('Demo request delivery failed', error);
      return Response.json({ ok: false, message: 'We could not send your request. Please try again shortly.' }, { status: 502 });
    }
    return Response.json({ ok: true });
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('[demo request — no DEMO_WEBHOOK_URL configured, not delivered]', { ...data, message: data.message ? '(provided)' : '' });
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false, message: 'Demo requests are temporarily unavailable. Please try again later.' }, { status: 503 });
}
