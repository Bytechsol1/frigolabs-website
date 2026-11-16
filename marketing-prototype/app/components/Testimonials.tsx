// PLACEHOLDER testimonials for design review. Attributed by role only, no invented
// names or clinics. Replace with real, approved quotes from partner clinics before
// the site is made public (see README).
const testimonials: [number, string, string][] = [
  [5, 'We stopped chasing kit updates by phone. Everything our team needs to know about a patient’s test is in one place.', 'Practice Manager · Independent clinic'],
  [5, 'Our patients see our clinic’s name and branding from start to finish. It feels like our own service, not a third party.', 'Medical Director · Multi-location clinic group'],
  [5, 'Enrolling a patient and ordering a panel takes a couple of minutes. Our front desk picked it up on the first day.', 'Clinic Administrator · Wellness clinic'],
  [4, 'Status tracking alone has cut our follow-up calls significantly. We know exactly which patients need attention.', 'Nurse Coordinator · Primary care practice'],
  [5, 'Role-based access was a must for us. Each team member sees only what they need, and we have a clear record of access.', 'Operations Lead · Hospital outpatient group'],
  [5, 'Rolling out across our locations was simple. Every site uses the same workflow, so reporting is finally consistent.', 'Director of Operations · Clinic group'],
  [4, 'The results view is clean and easy to review. Our physicians spend their time on patients, not on paperwork.', 'Physician · Functional medicine practice'],
  [5, 'Offering at-home testing used to mean juggling vendors. Now it is one connected workflow under our own brand.', 'Owner · Independent clinic'],
  [5, 'Patients love being able to track their kit and see when results are ready. Fewer “where is my result” calls.', 'Patient Experience Lead · Wellness center'],
  [4, 'Setup was straightforward and the team was responsive. We were offering testing to patients within weeks.', 'Practice Owner · Concierge medicine'],
  [5, 'Having ordering, collection tracking and results together has made our testing program far easier to manage.', 'Clinical Lead · Diagnostic partner'],
  [5, 'It looks and feels premium, which matters to our patients. The branded portal reflects the standard of our clinic.', 'Founder · Longevity clinic'],
];

function Stars({ count }: { count: number }) {
  return (
    <span className="tm__stars" role="img" aria-label={`${count} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map(i => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className={i < count ? 'is-on' : undefined}>
          <path d="M10 1.6l2.5 5.4 5.9.7-4.4 4 1.2 5.8L10 14.6l-5.2 2.9 1.2-5.8-4.4-4 5.9-.7z" />
        </svg>
      ))}
    </span>
  );
}

function Card({ stars, quote, by }: { stars: number; quote: string; by: string }) {
  return (
    <figure className="tm__card">
      <Stars count={stars} />
      <blockquote>“{quote}”</blockquote>
      <figcaption>{by}</figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <div className="tm" role="region" aria-label="What clinics say about Frigo Flow">
      <div className="tm__track">
        {/* Two identical sets make the loop seamless; the copy is hidden from screen readers. */}
        {[0, 1].map(set => (
          <div key={set} className="tm__set" aria-hidden={set === 1 || undefined}>
            {testimonials.map(([stars, quote, by]) => <Card key={quote} stars={stars} quote={quote} by={by} />)}
          </div>
        ))}
      </div>
    </div>
  );
}
