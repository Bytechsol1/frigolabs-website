'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  return <main className="login-page">
    <aside className="login-story">
      <a href="/" className="login-back">← Back to Frigo Flow</a>
      <div><div className="eyebrow">CONNECTED WORKFLOWS. CLEARER PROGRESS.</div>
        <h1>One place to<br/>keep things<br/><em>moving forward.</em></h1>
        <p>A clearer view of clinic requests, kit logistics, and the path to report availability.</p>
        <div className="login-journey"><span>Clinic request</span><b>↓</b><span>Coordinated progress</span><b>↓</b><span>Report availability</span></div>
      </div>
      <small>Local review prototype · No patient data</small>
    </aside>
    <section className="login-panel" aria-labelledby="login-heading">
      <a href="/" className="login-logo"><Image src="/logo.jpg" alt="Frigo Flow home" width={2800} height={1020} sizes="260px" /></a>
      <div className="eyebrow">WELCOME TO FRIGO FLOW</div>
      <h2 id="login-heading">Welcome back.</h2>
      <p className="login-intro">Sign in to your organization’s workspace.</p>
      <div className="review-note" id="login-preview-note">Design preview only. Authentication is not connected. Please use fictional details, not your real password.</div>
      <form className="login-form" aria-describedby="login-preview-note" onSubmit={event => {
        event.preventDefault();
        event.currentTarget.reset();
        setShowPassword(false);
        setMessage('Sign-in is not available in this preview. The existing application authentication service must be connected. No credentials were sent or stored.');
      }}>
        <label htmlFor="login-email">Email address</label>
        <input id="login-email" name="email" type="email" autoComplete="off" placeholder="you@organization.com" required maxLength={254} />
        <label htmlFor="login-password">Password</label>
        <div className="password-field"><input id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="off" placeholder="Enter a demo password" required maxLength={128} /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>{showPassword ? 'Hide' : 'Show'}</button></div>
        <button type="submit" className="button">Sign in <span aria-hidden="true">↗</span></button>
        <p className="form-status" role="status">{message}</p>
      </form>
      <div className="login-help">Need access or help signing in? <a href="/#contact">Contact our team ↗</a></div>
      <p className="login-disclaimer">Access is intended for authorized Admin, Clinic, and Patient accounts. Account permissions will be determined by the connected application.</p>
    </section>
  </main>;
}
