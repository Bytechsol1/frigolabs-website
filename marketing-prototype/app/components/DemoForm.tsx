'use client';

import { useState, type FormEvent } from 'react';
import { clinicCounts, normalizeDemo, organizationTypes, validateDemo, type DemoErrors } from '../../lib/demo';
import { Icon } from './Icon';

type State = 'idle' | 'sending' | 'sent' | 'error';

export function DemoForm() {
  const [state, setState] = useState<State>('idle');
  const [errors, setErrors] = useState<DemoErrors>({});
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const data = normalizeDemo(raw);
    const found = validateDemo(data);
    setErrors(found);
    if (Object.keys(found).length) {
      setState('idle');
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }
    setState('sending');
    setMessage('');
    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, website: raw.website || '' }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.ok) {
        form.reset();
        setState('sent');
        return;
      }
      if (result.errors) setErrors(result.errors);
      setMessage(result.message || 'Something went wrong. Please check the form and try again.');
      setState('error');
    } catch {
      setMessage('We could not reach the server. Please check your connection and try again.');
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="demo__success" role="status">
        <Icon name="check" />
        <h3>Thank you. Your request has been received.</h3>
        <p>Our team will be in touch shortly to arrange your Frigo Flow demo.</p>
        <button type="button" className="btn btn--ghost-light" onClick={() => setState('idle')}>Send another request</button>
      </div>
    );
  }

  const field = (name: keyof DemoErrors) => ({
    name,
    id: `demo-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `demo-${name}-error` : undefined,
  });
  const error = (name: keyof DemoErrors) => errors[name] && <span className="demo__error" id={`demo-${name}-error`}>{errors[name]}</span>;

  return (
    <form className="demo__form" noValidate onSubmit={onSubmit}>
      <div className="demo__grid">
        <div className="demo__field">
          <label htmlFor="demo-fullName" className="sr-only">Full Name (required)</label>
          <input {...field('fullName')} autoComplete="name" maxLength={100} placeholder="Full Name *" required />
          {error('fullName')}
        </div>
        <div className="demo__field">
          <label htmlFor="demo-email" className="sr-only">Work Email (required)</label>
          <input {...field('email')} type="email" autoComplete="email" maxLength={254} placeholder="Work Email *" required />
          {error('email')}
        </div>
        <div className="demo__field">
          <label htmlFor="demo-organization" className="sr-only">Organization Name (required)</label>
          <input {...field('organization')} autoComplete="organization" maxLength={160} placeholder="Organization Name *" required />
          {error('organization')}
        </div>
        <div className="demo__field demo__select">
          <label htmlFor="demo-organizationType" className="sr-only">Organization Type (required)</label>
          <select {...field('organizationType')} defaultValue="" required>
            <option value="" disabled>Organization Type *</option>
            {organizationTypes.map(option => <option key={option}>{option}</option>)}
          </select>
          <Icon name="chevronDown" />
          {error('organizationType')}
        </div>
        <div className="demo__field">
          <label htmlFor="demo-role" className="sr-only">Role / Job Title (optional)</label>
          <input {...field('role')} autoComplete="organization-title" maxLength={100} placeholder="Role / Job Title" />
          {error('role')}
        </div>
        <div className="demo__field demo__select">
          <label htmlFor="demo-clinicCount" className="sr-only">Number of Clinics (optional)</label>
          <select {...field('clinicCount')} defaultValue="">
            <option value="">Number of Clinics</option>
            {clinicCounts.map(option => <option key={option}>{option}</option>)}
          </select>
          <Icon name="chevronDown" />
          {error('clinicCount')}
        </div>
        <div className="demo__field demo__field--full">
          <label htmlFor="demo-message" className="sr-only">Message (optional). Please do not include patient information.</label>
          <textarea {...field('message')} rows={3} maxLength={2000} placeholder="Message (Optional)" />
          {error('message')}
        </div>
      </div>
      <div className="demo__honey" aria-hidden="true">
        <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button type="submit" className="btn btn--gold" disabled={state === 'sending'} aria-busy={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Request a Demo'} <Icon name="arrow" />
      </button>
      <p className="demo__status" role="status" aria-live="polite">{state === 'error' ? message : ''}</p>
    </form>
  );
}
