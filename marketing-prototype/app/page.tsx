import { siteConfig } from '../config';
import { DemoForm } from './components/DemoForm';
import { Faq } from './components/Faq';
import { Header } from './components/Header';
import { Icon, type IconName } from './components/Icon';
import { Logo } from './components/Logo';
import { BrandedDevices, HeroDevices, TestOrdersPanel } from './components/Mockups';
import { Reveal } from './components/Reveal';

const steps: [IconName, string, string][] = [
  ['users', 'Enroll Patient', 'Create a patient and select an available testing package.'],
  ['flask', 'Initiate Testing', 'Coordinate the diagnostic request through our partner network.'],
  ['box', 'Track Progress', 'Monitor kit, collection, and lab processing updates in real time.'],
  ['file', 'Access Results', 'Authorized clinic users can securely view and manage lab results.'],
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

function Waves({ className }: { className: string }) {
  return (
    <svg className={`waves ${className}`} viewBox="0 0 600 400" fill="none" aria-hidden="true" preserveAspectRatio="none">
      {[0, 1, 2, 3, 4, 5].map(i => (
        <path key={i} d={`M0 ${300 - i * 22}C150 ${220 - i * 22} 300 ${360 - i * 24} 600 ${150 - i * 18}`} stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <Reveal />

      <main id="main">
        {/* Hero */}
        <section className="hero" id="top">
          <Waves className="waves--hero" />
          <div className="wrap wrap--wide hero__grid">
            <div className="hero__copy" data-reveal>
              <p className="eyebrow eyebrow--line">Diagnostic workflow platform for clinics</p>
              <h1>From Patient Enrollment to<br className="br-desktop" /> Lab Results. <span className="gold">One Connected Workflow.</span></h1>
              <p className="lead">Simplify diagnostic testing with centralized ordering, collection tracking, and secure results access, all within your clinic’s own branded experience.</p>
              <div className="hero__actions">
                <a href="#demo" className="btn btn--gold btn--lg">Request a Demo <Icon name="arrow" /></a>
                <a href="#how-it-works" className="btn btn--outline btn--lg"><Icon name="play" />Explore the Workflow</a>
              </div>
              <ul className="hero__badges">
                <li><Icon name="shield" />Clinic-Branded Experience</li>
                <li><Icon name="layers" />Secure &amp; Compliant</li>
                <li><Icon name="bolt" />Streamlined Workflow</li>
              </ul>
            </div>
            <div className="hero__visual" data-reveal>
              <HeroDevices />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="how" id="how-it-works" aria-labelledby="how-title">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <p className="eyebrow">How it works</p>
              <h2 id="how-title">A Simple, End-to-End Testing Workflow</h2>
            </div>
            <ol className="steps">
              {steps.map(([icon, title, text], i) => (
                <li key={title} className="step" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                  <Icon name={icon} className="step__icon" />
                  <h3>{i + 1}. {title}</h3>
                  <p>{text}</p>
                  {i < steps.length - 1 && <Icon name="arrow" className="step__arrow" />}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* For clinics */}
        <section className="clinics" id="for-clinics" aria-labelledby="clinics-title">
          <Waves className="waves--clinics" />
          <div className="wrap split">
            <div data-reveal>
              <p className="eyebrow eyebrow--line">For clinics</p>
              <h2 id="clinics-title">Spend Less Time Chasing Tests.<br className="br-desktop" /> More Time Supporting Patients.</h2>
              <ul className="checklist">
                {benefits.map(([title, text]) => (
                  <li key={title}><Icon name="check" /><div><h3>{title}</h3><p>{text}</p></div></li>
                ))}
              </ul>
            </div>
            <div data-reveal><TestOrdersPanel /></div>
          </div>
        </section>

        {/* White-label */}
        <section className="brand-band-section" aria-labelledby="brand-title">
          <div className="wrap">
            <div className="brand-band split" data-reveal>
              <BrandedDevices />
              <div>
                <p className="eyebrow">White-label experience</p>
                <h2 id="brand-title">Your Clinic. Your Brand. One Connected Platform.</h2>
                <p className="body">Deliver a seamless testing experience for your team and patients with a custom-branded portal, powered by Frigo Flow’s secure infrastructure.</p>
                <ul className="ticks">
                  {brandPoints.map(point => <li key={point}><Icon name="check" />{point}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="capabilities" id="capabilities" aria-labelledby="cap-title">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <p className="eyebrow">Platform capabilities</p>
              <h2 id="cap-title">Everything You Need to Manage Diagnostic Testing</h2>
            </div>
            <ul className="cap-grid">
              {capabilities.map(([icon, title, text], i) => (
                <li key={title} className="cap" data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                  <Icon name={icon} className="cap__icon" />
                  <div><h3>{title}</h3><p>{text}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Data protection */}
        <section className="protect-section" aria-labelledby="protect-title">
          <div className="wrap">
            <div className="protect" data-reveal>
              <div className="protect__lead">
                <Icon name="shield" />
                <h2 id="protect-title">Designed With Patient<br className="br-desktop" /> Data Protection in Mind</h2>
              </div>
              {protections.map(([icon, title, text]) => (
                <div key={title} className="protect__item">
                  <Icon name={icon} />
                  <div><h3>{title}</h3><p>{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ + Demo */}
        <section className="closing" aria-label="Questions and demo request">
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
        <div className="wrap footer__grid">
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
          <div className="footer__logins">
            <a href={siteConfig.clinicLoginUrl} className="btn btn--outline-gold"><Icon name="user" />Clinic Login</a>
            <a href={siteConfig.patientLoginUrl} className="btn btn--outline-light"><Icon name="users" />Patient Login</a>
          </div>
        </div>
      </footer>
    </>
  );
}
