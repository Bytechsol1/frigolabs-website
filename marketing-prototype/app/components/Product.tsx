// Illustrated stand-ins for the Frigo Flow collection kit and device.
// Swap for real product photography when it is supplied (see README).

export function KitBox({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 420 300" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="kb-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ececea" />
        </linearGradient>
        <linearGradient id="kb-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7f7f5" />
          <stop offset="1" stopColor="#dededb" />
        </linearGradient>
        <linearGradient id="kb-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d4d4d0" />
          <stop offset="1" stopColor="#bdbdb8" />
        </linearGradient>
        <filter id="kb-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000" floodOpacity=".35" />
        </filter>
      </defs>
      <g filter="url(#kb-shadow)">
        <path d="M40 92 L330 92 L380 52 L90 52 Z" fill="url(#kb-top)" />
        <path d="M330 92 L380 52 L380 240 L330 280 Z" fill="url(#kb-side)" />
        <rect x="40" y="92" width="290" height="188" fill="url(#kb-front)" />
        <rect x="40" y="200" width="290" height="38" fill="#111113" />
        <path d="M330 200 L380 160 L380 198 L330 238 Z" fill="#000" />
        <circle cx="66" cy="124" r="5" fill="#e5322d" />
        <text x="80" y="129" fontFamily="var(--font-sans), sans-serif" fontSize="13" fontWeight="600" letterSpacing="3" fill="#111113">FRIGO FLOW</text>
        <text x="62" y="172" fontFamily="var(--font-serif), serif" fontSize="30" fill="#111113">Diagnostic Kit</text>
        <text x="62" y="224" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" fill="#f2f2f2">CLINIC-ISSUED · SAMPLE COLLECTION</text>
      </g>
    </svg>
  );
}

export function Device({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 330" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="dv-body" cx=".38" cy=".3" r=".8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".7" stopColor="#e9e9e7" />
          <stop offset="1" stopColor="#c9c9c5" />
        </radialGradient>
        <radialGradient id="dv-button" cx=".38" cy=".32" r=".75">
          <stop offset="0" stopColor="#ff5a52" />
          <stop offset=".65" stopColor="#d9261f" />
          <stop offset="1" stopColor="#a5150f" />
        </radialGradient>
        <linearGradient id="dv-tube" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9d9d6" stopOpacity=".9" />
          <stop offset=".45" stopColor="#ffffff" stopOpacity=".95" />
          <stop offset="1" stopColor="#bdbdb9" stopOpacity=".9" />
        </linearGradient>
        <linearGradient id="dv-blood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8f1410" />
          <stop offset=".5" stopColor="#c8231c" />
          <stop offset="1" stopColor="#7d110d" />
        </linearGradient>
        <filter id="dv-shadow" x="-30%" y="-20%" width="160%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#000" floodOpacity=".4" />
        </filter>
      </defs>
      <g filter="url(#dv-shadow)">
        <rect x="86" y="170" width="28" height="140" rx="9" fill="url(#dv-tube)" />
        <rect x="90" y="226" width="20" height="78" rx="6" fill="url(#dv-blood)" />
        <rect x="80" y="160" width="40" height="22" rx="6" fill="#d8d8d4" />
        <path d="M100 18 C150 18 182 50 182 96 C182 132 160 156 128 168 L72 168 C40 156 18 132 18 96 C18 50 50 18 100 18 Z" fill="url(#dv-body)" />
        <circle cx="100" cy="94" r="54" fill="url(#dv-button)" />
        <circle cx="100" cy="94" r="54" fill="none" stroke="#000" strokeOpacity=".12" strokeWidth="2" />
        <text x="100" y="99" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="13" fontWeight="600" letterSpacing="2.5" fill="#000" fillOpacity=".32">FRIGO</text>
      </g>
    </svg>
  );
}

const stages: [string, string, string, string][] = [
  ['01', 'Patient enrolled', 'John Miller · Comprehensive Panel', 'stage__card--1'],
  ['02', 'Kit delivered', 'Collection kit · Tracking active', 'stage__card--2'],
  ['03', 'Lab processing', 'Sample received at partner lab', 'stage__card--3'],
  ['04', 'Results available', 'Physician-reviewed · Ready for clinic', 'stage__card--4'],
];

const flowPath = 'M 40 130 C 200 130 220 390 380 390 C 470 390 500 280 600 280 C 700 280 730 130 860 130 C 1000 130 1000 390 1160 390';

/** Hero "stage": the kit and device at the centre of the clinic workflow. */
export function HeroStage() {
  return (
    <div className="stage" role="img" aria-label="Frigo Flow collection kit and device at the centre of the clinic workflow: patient enrolled, kit delivered, lab processing, results available">
      <svg className="stage__flow" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="flow-fade" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".12" stopColor="#fff" stopOpacity=".22" />
            <stop offset=".88" stopColor="#fff" stopOpacity=".22" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={flowPath} className="stage__line" stroke="url(#flow-fade)" />
        <path d={flowPath} className="stage__pulse" pathLength={1000} />
      </svg>
      <div className="stage__pedestal" />
      <div className="stage__product">
        <KitBox className="stage__kit" />
        <Device className="stage__device" />
      </div>
      {stages.map(([num, title, sub, mod]) => (
        <div key={num} className={`stage__card ${mod}`}>
          <span className="stage__num">{num}</span>
          <span><b>{title}</b><small>{sub}</small></span>
          {num === '04' ? <span className="stage__live" /> : <span className="stage__tick" />}
        </div>
      ))}
    </div>
  );
}
