// Ported from Bytechsol1/frigoflow-website@db141b9 (dist/index.html, dist/clinics.css, dist/app.js).
// Marker values are illustrative sample data, not actual patient results.
const markers: [string, boolean][] = [
  ['Vitamin D', false], ['Testosterone', false], ['TSH', true], ['Free T3', false], ['Creatinine', false],
  ['Estrogen', false], ['Ferritin', true], ['Progesterone', false], ['ApoB', false],
];

function MarkerList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className={`marker-list${duplicate ? ' marker-duplicates' : ''}`} aria-hidden={duplicate || undefined} inert={duplicate || undefined}>
      {markers.map(([name, outOfRange]) => (
        <li key={name}><span>{name}</span>{outOfRange ? <small className="marker-range">Out of range</small> : <small>Optimal</small>}</li>
      ))}
    </ul>
  );
}

export function ClinicShowcase() {
  return (
    <section className="ff-src clinic-section section-pad" id="for-clinics" aria-labelledby="clinic-heading">
      <div className="container clinic-grid">
        <div className="clinic-copy"><h2 id="clinic-heading">Spend less time<br />chasing tests.<br /><span>More time supporting patients.</span></h2></div>
        <figure className="clinic-testing-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/clinic-digital-care.jpg" alt="A healthcare professional using a tablet in a clinical setting" width={1600} height={1067} loading="lazy" decoding="async" />
          <div className="marker-overlay" role="group" aria-label="Illustrative sample markers, not actual patient results or confirmed test availability">
            <span className="marker-demo-label">Sample data</span>
            <div className="marker-window"><div className="marker-belt"><MarkerList /><MarkerList duplicate /></div></div>
          </div>
        </figure>
        <div className="clinic-benefits">
          <p className="clinic-benefits-label">LESS ADMIN. MORE OVERSIGHT.</p>
          <ul className="benefits">
            <li><div><h3>Centralized visibility</h3><p>Manage patient testing workflows in one place.</p></div></li>
            <li><div><h3>Fewer manual follow-ups</h3><p>See available status updates and identify patients who need attention.</p></div></li>
            <li><div><h3>Clinic-branded experience</h3><p>A familiar, branded portal for your staff and patients.</p></div></li>
          </ul>
          <a className="clinic-demo-link" href="#demo">Explore it with your team <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg></a>
        </div>
      </div>
    </section>
  );
}
