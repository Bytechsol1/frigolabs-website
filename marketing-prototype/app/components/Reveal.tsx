'use client';

import { useEffect } from 'react';

// Adds a subtle fade-up to elements marked with data-reveal as they enter the viewport.
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('has-reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
