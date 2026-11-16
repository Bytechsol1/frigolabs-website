'use client';

import { useEffect } from 'react';

// Adds a subtle fade-up to elements marked with data-reveal as they enter the viewport.
// data-reveal="repeat" replays the animation every time the element scrolls back into view.
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('has-reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        const repeat = (entry.target as HTMLElement).dataset.reveal === 'repeat';
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (!repeat) observer.unobserve(entry.target);
        } else if (repeat) {
          entry.target.classList.remove('is-visible');
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
