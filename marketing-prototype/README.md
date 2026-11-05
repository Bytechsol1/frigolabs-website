# Frigo Flow — one-page marketing site

Next.js 16 / React 19 / TypeScript. Clinic-first, one-page site built from the approved homepage design concept.

## Run

From the repository root (or from `marketing-prototype/`):

    npm install
    npm run dev        # http://127.0.0.1:3000
    npm run build      # production build
    npm run typecheck

## Structure

| Path | Purpose |
|---|---|
| `app/page.tsx` | The ten sections, in order: nav, hero, How It Works, For Clinics, white-label, Capabilities, Data Protection, FAQ, Request a Demo, footer |
| `app/components/Header.tsx` | Sticky header, active-section underline, Login dropdown (Clinic / Patient portal), mobile menu |
| `app/components/Mockups.tsx` | HTML/CSS product previews (dashboard, patient phone, test-orders table, NexGen branded portal). **Fictional data only.** |
| `app/components/Faq.tsx` | Accessible accordion, one item open at a time |
| `app/components/DemoForm.tsx` | Demo form with client validation, loading / error / success states, honeypot |
| `app/api/demo/route.ts` | Server validation, size limit, per-IP rate limit, honeypot, delivery to `DEMO_WEBHOOK_URL` |
| `lib/demo.ts` | Shared form schema (fields, dropdown options, validation) |
| `app/components/Logo.tsx`, `app/icon.svg` | Vector logo and favicon |
| `app/globals.css` | Design tokens and all site styles; breakpoints 1199px (tablet) and 767px (mobile) |
| `config.ts` | Login, legal and site URLs, read from environment variables |

The product mockups scale with their container using CSS container units (`cqi`), so they stay sharp at every width.

## Configuration (`.env.local`, see `.env.example`)

- `NEXT_PUBLIC_CLINIC_LOGIN_URL`, `NEXT_PUBLIC_PATIENT_LOGIN_URL`: portal destinations. Default is `#` until the real portal URLs exist.
- `NEXT_PUBLIC_PRIVACY_URL`, `NEXT_PUBLIC_TERMS_URL`: legal pages. **Default is `#`. These must be set before launch.**
- `NEXT_PUBLIC_SITE_URL`: canonical / Open Graph base URL.
- `NEXT_PUBLIC_ALLOW_INDEXING=true`: allows search indexing. Set it only on the approved production domain; otherwise the site is `noindex`.
- `DEMO_WEBHOOK_URL` (server-only): receives each demo request as a JSON POST. In development without it, requests are logged to the server console. In production without it, the API answers 503 and the form shows an error, so it never claims success falsely.

The rate limiter is in-memory, so with more than one server instance you'll need to replace it with a shared store.

## Content notes for review

The copy follows the design concept exactly. Before launch, these lines need product, legal or compliance sign-off (see the implementation brief):

- Hero badge "Secure & Compliant"
- "Clinic-specific branding (logo, colors, domain)"
- "…in real time"
- "Keep patient information secure with granular permissions and audit logs"
- Data Protection claims and FAQ answers

Never put real patient information in mockups or demo requests.
