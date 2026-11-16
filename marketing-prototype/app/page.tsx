import type { ReactNode } from 'react';
import { siteConfig } from '../config';
import { DemoForm } from './components/DemoForm';
import { Faq } from './components/Faq';
import { Header } from './components/Header';
import { Icon, type IconName } from './components/Icon';
import { Logo } from './components/Logo';
import { BrandedDevices, HeroDevices } from './components/Mockups';
import { HeroSpotlight } from './components/HeroSpotlight';
import { Device, HeroStage, KitBox } from './components/Product';
import { Reveal } from './components/Reveal';
import { Testimonials } from './components/Testimonials';

const steps: [string, string, ReactNode][] = [
  ['Enroll Patient', 'Create a patient and select an available testing package.', (
    <div className="vg vg--enroll">
      <div className="vg-card">
        <span className="vg-avatar">JM</span>
        <span><b>John Miller</b><small>New patient</small></span>
      </div>
      <div className="vg-card vg-card--muted">
        <span className="vg-label">Package</span>
        <b>Comprehensive Panel</b>
      </div>
    </div>
  )],
  ['Initiate Testing', 'Coordinate the diagnostic request through our partner network.', (
    <div className="vg vg--kit">
      <KitBox className="vg-kit" />
      <Device className="vg-device" />
    </div>
  )],
  ['Track Progress', 'Monitor kit, collection, and lab processing updates in real time.', (
    <ol className="vg vg--track">
      <li className="is-done"><span />Kit shipped</li>
      <li className="is-done"><span />Sample collected</li>
      <li className="is-now"><span />Lab processing</li>
      <li><span />Results ready</li>
    </ol>
  )],
  ['Access Results', 'Authorized clinic users can securely view and manage lab results.', (
    <div className="vg vg--results">
      <div className="vg-card vg-card--col">
        <span className="vg-label">Results Available</span>
        {[['Vitamin D', 62], ['Ferritin', 78], ['TSH', 45]].map(([name, w]) => (
          <span key={name} className="vg-bar"><em>{name}</em><i style={{ width: `${w}%` }} /></span>
        ))}
      </div>
    </div>
  )],
];

const benefits = [
  ['Centralized Visibility', 'Manage patient testing workflows in one place.'],
  ['Fewer Manual Follow-Ups', 'See available status updates and identify patients who need attention.'],
  ['Clinic-Branded Experience', 'A familiar, branded portal for your staff and patients.'],
];

const brandPoints = ['Clinic-specific branding (logo, colors, domain)', 'Branded clinic and patient portals', 'Consistent, professional patient experience'];

const capabilities: [IconName, string, string][] = [
  ['users', 'Patient Management', 'Manage patient enrollment and diagnostic histories.'],
  ['flask', 'Diagnostic Ordering', 'Initiate and coordinate testing requests.'],
  ['box', 'Collection Tracking', 'Monitor available kit and collection updates.'],
  ['file', 'Results Management', 'Provide controlled access to laboratory reports.'],
  ['palette', 'Clinic Branding', 'Deliver a personalized, clinic-branded experience for staff and patients.'],
  ['shield', 'Role-Based Access', 'Keep patient information secure with granular permissions and audit logs.'],
];

const protections: [IconName, string, string][] = [
  ['lock', 'Role-Based Permissions', 'Ensure the right access for each user.'],
  ['layers', 'Secure Data Handling', 'Built with industry-standard security practices.'],
  ['audit', 'Audit & Access Records', 'Maintain a record of key actions, including agreement acceptance and data access.'],
];

const trust: [IconName, string][] = [
  ['palette', 'Clinic-Branded Experience'],
  ['layers', 'Secure & Compliant'],
  ['bolt', 'Streamlined Workflow'],
  ['lock', 'Role-Based Access'],
  ['audit', 'Audit Records'],
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <Reveal />

      <main id="main">
        {/* Hero */}
        <section className="hero" id="top">
          <HeroSpotlight target="top" />
          <div className="hero__grid-bg" aria-hidden="true" />
          <div className="wrap wrap--wide hero__inner">
            <div className="hero__copy" data-reveal>
              <h1>From Patient Enrollment to Lab Results. <em>One Connected Workflow.</em></h1>
              <p className="lead">Simplify diagnostic testing with centralized ordering, collection tracking, and secure results access, all within your clinic’s own branded experience.</p>
              <div className="hero__actions">
                <a href="#demo" className="btn btn--white btn--lg">Request a Demo <Icon name="arrow" /></a>
                <a href="#how-it-works" className="btn btn--ghost btn--lg"><Icon name="play" />Explore the Workflow</a>
              </div>
            </div>
            <div className="hero__visual" data-reveal><HeroStage /></div>
            <ul className="trust">
              {trust.map(([icon, label]) => <li key={label}><Icon name={icon} />{label}</li>)}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section className="section how" id="how-it-works" aria-labelledby="how-title">
          <div className="how__bg" aria-hidden="true" />
          <div className="wrap">
            <div className="head" data-reveal>
              <h2 id="how-title">How It <em>Works</em></h2>
              <p>A simple, end-to-end testing workflow.</p>
            </div>
            <div className="rail" data-reveal aria-hidden="true">
              <span className="rail__track"><span className="rail__fill" /></span>
              {steps.map(([title], i) => (
                <span key={title} className="rail__node" style={{ transitionDelay: `${300 + i * 350}ms` }}>{String(i + 1).padStart(2, '0')}</span>
              ))}
            </div>
            <ol className="steps">
              {steps.map(([title, text, visual], i) => (
                <li key={title} className="step" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="step__media">
                    <span className="step__ghost" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    {visual}
                  </div>
                  <div className="step__body">
                    <span className="step__tag">Step {String(i + 1).padStart(2, '0')}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section testimonials" aria-labelledby="tm-title">
          <div className="wrap">
            <div className="head" data-reveal>
              <h2 id="tm-title">What Clinics Are Saying</h2>
              <p>Teams using Frigo Flow to run their testing programs.</p>
            </div>
          </div>
          <Testimonials />
        </section>

        {/* For clinics */}
        <section className="section dark clinics" id="for-clinics" aria-labelledby="clinics-title">
          <div className="wrap">
            <div className="clinics__head" data-reveal>
              <h2 id="clinics-title"><b>Spend Less Time Chasing Tests.</b> More Time Supporting Patients.</h2>
            </div>
            <div className="clinics__visual" data-reveal><HeroDevices /></div>
            <ul className="clinics__list">
              {benefits.map(([title, text], i) => (
                <li key={title} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                  <Icon name="check" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* White-label */}
        <section className="section brand" aria-labelledby="brand-title">
          <div className="wrap split">
            <div data-reveal><BrandedDevices /></div>
            <div data-reveal>
              <p className="eyebrow">White-label experience</p>
              <h2 id="brand-title">Your Clinic. Your Brand. One Connected Platform.</h2>
              <p className="body">Deliver a seamless testing experience for your team and patients with a custom-branded portal, powered by Frigo Flow’s secure infrastructure.</p>
              <ul className="ticks">
                {brandPoints.map(point => <li key={point}><Icon name="check" />{point}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="section capabilities" id="capabilities" aria-labelledby="cap-title">
          <div className="wrap">
            <div className="head" data-reveal>
              <h2 id="cap-title">Everything You Need to Manage Diagnostic Testing</h2>
              <p>Platform capabilities</p>
            </div>
            <ul className="cap-grid">
              {capabilities.map(([icon, title, text], i) => (
                <li key={title} className="cap" data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                  <span className="cap__num">{String(i + 1).padStart(2, '0')}</span>
                  <Icon name={icon} className="cap__icon" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Data protection */}
        <section className="section dark protect" aria-labelledby="protect-title">
          <div className="wrap protect__grid">
            <div className="protect__lead" data-reveal>
              <Icon name="shield" />
              <h2 id="protect-title">Designed With Patient Data Protection in Mind</h2>
            </div>
            {protections.map(([icon, title, text], i) => (
              <div key={title} className="protect__item" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <Icon name={icon} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ + Demo */}
        <section className="section closing" aria-label="Questions and demo request">
          <div className="wrap closing__grid">
            <div className="faq" id="faq" data-reveal>
              <h2>Frequently Asked Questions</h2>
              <Faq />
            </div>
            <div className="demo" id="demo" data-reveal>
              <h2>Request a Demo</h2>
              <p>See how Frigo Flow can streamline diagnostic testing for your clinic.</p>
              <DemoForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="wrap wrap--wide">
          <div className="footer__cta">
            <h2>Ready to bring diagnostic testing <em>under your brand?</em></h2>
            <div className="footer__cta-actions">
              <a href="#demo" className="btn btn--white btn--lg">Request a Demo <Icon name="arrow" /></a>
              <a href={siteConfig.loginUrl} className="btn btn--ghost btn--lg" target="_blank" rel="noopener noreferrer">Login</a>
            </div>
          </div>

          <div className="footer__grid">
            <div className="footer__brand">
              <a href="#top" aria-label="Frigo Flow home"><Logo tone="light" /></a>
              <p>A diagnostic workflow platform that connects clinics, patients, and diagnostic partners.</p>
            </div>
            <nav className="footer__col" aria-label="Platform">
              <h2>Platform</h2>
              <a href="#how-it-works">How It Works</a>
              <a href="#for-clinics">For Clinics</a>
              <a href="#capabilities">Capabilities</a>
            </nav>
            <nav className="footer__col" aria-label="Resources">
              <h2>Resources</h2>
              <a href="#faq">FAQ</a>
              <a href="#demo">Contact</a>
            </nav>
            <nav className="footer__col" aria-label="Legal">
              <h2>Legal</h2>
              <a href={siteConfig.privacyUrl}>Privacy Policy</a>
              <a href={siteConfig.termsUrl}>Terms of Service</a>
            </nav>
          </div>
        </div>

        <div className="footer__mega" aria-hidden="true">
          <svg viewBox="0 0 1000 150" preserveAspectRatio="xMidYMax meet">
            <defs>
              <linearGradient id="mega-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity=".95" />
                <stop offset=".6" stopColor="#fff" stopOpacity=".35" />
                <stop offset="1" stopColor="#fff" stopOpacity=".04" />
              </linearGradient>
            </defs>
            <text x="500" y="138" textAnchor="middle" textLength="992" lengthAdjust="spacingAndGlyphs" fill="url(#mega-fill)">FRIGO FLOW</text>
          </svg>
        </div>

        <div className="wrap wrap--wide footer__base">
          <span>© {new Date().getFullYear()} Frigo Flow. All rights reserved.</span>
          <span className="footer__made"><i />Diagnostic workflow platform for clinics</span>
          <a href="#top" className="footer__top">Back to top <Icon name="arrow" /></a>
        </div>
      </footer>
    </>
  );
}
