'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { BrandedDevices, type ClinicBrand } from './Mockups';
import { Icon } from './Icon';

// Fictional sample clinics used to preview white-labelling. Not real organisations.
const brands: (ClinicBrand & { color: string; soft: string; ink: string; domain: string })[] = [
  { name: 'NexGen Wellness', icon: 'leaf', color: '#2f8f5b', soft: '#e7f3ec', ink: '#1f3a2b', domain: 'portal.nexgenwellness.com' },
  { name: 'Harbor Health', icon: 'drop', color: '#2563eb', soft: '#e6eefd', ink: '#172a55', domain: 'care.harborhealth.com' },
  { name: 'Solace Clinic', icon: 'sun', color: '#c2410c', soft: '#fbece4', ink: '#4a1d08', domain: 'my.solaceclinic.com' },
  { name: 'Aurora Medical', icon: 'shield', color: '#7c3aed', soft: '#f0e9fd', ink: '#2e1660', domain: 'patients.auroramedical.com' },
];

/** Interactive preview: the same portal re-skinned for different (fictional) clinic brands. */
export function BrandStudio() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const brand = brands[index];

  useEffect(() => {
    if (!auto || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = false;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (root.current) io.observe(root.current);
    const timer = setInterval(() => { if (visible && !document.hidden) setIndex(i => (i + 1) % brands.length); }, 3200);
    return () => { clearInterval(timer); io.disconnect(); };
  }, [auto]);

  const style = { '--brand': brand.color, '--brand-soft': brand.soft, '--brand-ink': brand.ink } as CSSProperties;

  return (
    <div ref={root} className="studio" style={style}>
      <div className="studio__glow" aria-hidden="true" />
      <div className="studio__stage">
        <div key={brand.name} className="studio__swap"><BrandedDevices clinic={brand} /></div>
        <div className="studio__domain" aria-hidden="true">
          <Icon name="lock" /><span key={brand.domain}>{brand.domain}</span>
        </div>
      </div>
      <div className="studio__picker" role="radiogroup" aria-label="Preview the portal with a sample clinic brand">
        <span className="studio__label">Try a brand</span>
        {brands.map((b, i) => (
          <button key={b.name} type="button" role="radio" aria-checked={i === index} aria-label={b.name}
            className={`studio__swatch${i === index ? ' is-active' : ''}`} style={{ '--sw': b.color } as CSSProperties}
            onClick={() => { setIndex(i); setAuto(false); }}>
            <Icon name={b.icon} />
          </button>
        ))}
        <span className="studio__name" aria-live="polite">{brand.name}</span>
      </div>
      <p className="studio__note"></p>
    </div>
  );
}
