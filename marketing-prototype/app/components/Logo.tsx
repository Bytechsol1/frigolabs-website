// Vector version of the Frigo Flow logo (gold swoosh + wordmark), so it stays crisp
// and works on both light and dark backgrounds.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="40 150 490 455" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ff-gold" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#c39126" />
          <stop offset="1" stopColor="#ddb145" />
        </linearGradient>
      </defs>
      <path fill="url(#ff-gold)" d="M83 435C120 300 200 228 320 226 430 224 505 200 525 155 495 250 420 318 300 320 200 322 120 360 83 435Z" />
      <path fill="url(#ff-gold)" d="M43 598C90 470 175 390 290 388 400 386 470 360 487 318 460 420 390 482 285 484 180 486 95 520 43 598Z" />
    </svg>
  );
}

export function Logo({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <span className={`logo logo--${tone} ${className}`}>
      <LogoMark className="logo__mark" />
      <span className="logo__word">
        <b>FRIGO</b> <span>FLOW</span>
      </span>
    </span>
  );
}
