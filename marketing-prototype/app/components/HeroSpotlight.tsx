'use client';

import { useEffect } from 'react';

/** Soft spotlight that follows the pointer across the hero (sets --mx / --my). */
export function HeroSpotlight({ target }: { target: string }) {
  useEffect(() => {
    const el = document.getElementById(target);
    if (!el || window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        el.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    };
    el.addEventListener('pointermove', onMove);
    return () => { el.removeEventListener('pointermove', onMove); cancelAnimationFrame(frame); };
  }, [target]);
  return null;
}
