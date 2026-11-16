'use client';

import { useEffect, useRef } from 'react';

// Ported from Bytechsol1/frigoflow-website@db141b9 (dist/index.html + dist/testimonials.js).
// Fictional placeholder testimonials, copied verbatim. Not actual customer endorsements.
type Testimonial = { topic: string; quote: string; identity: string; role: string; company: string };

const testimonials: Testimonial[] = [
  { topic: 'Clinic workflows', quote: 'Having ordering and collection updates in one place helps our team stay focused on patients rather than chasing the next step.', identity: 'Clinic Partner 01', role: 'Clinic owner', company: 'Independent clinic' },
  { topic: 'Patient follow-up', quote: 'A clear path from testing to physician-reviewed results makes follow-up conversations easier to prepare for and more useful for patients.', identity: 'Clinic Partner 02', role: 'Healthcare provider', company: 'Primary care practice' },
  { topic: 'Clinical coordination', quote: 'We value diagnostic technology that fits into clinical care. Consistent visibility across testing workflows helps our teams coordinate with confidence.', identity: 'Clinic Partner 03', role: 'Medical director', company: 'Multi-site clinic' },
  { topic: 'Laboratory collaboration', quote: 'Clear diagnostic requests and collection status updates help the clinic and laboratory work from the same information.', identity: 'Clinic Partner 04', role: 'Laboratory professional', company: 'Partner laboratory' },
  { topic: 'Clinic operations', quote: 'Our priority is a repeatable process across locations. A shared view of orders helps staff spot gaps and coordinate follow-ups.', identity: 'Clinic Partner 05', role: 'Healthcare operations manager', company: 'Healthcare group' },
  { topic: 'Diagnostic infrastructure', quote: 'Connected infrastructure makes it easier to coordinate with clinics, track each stage of testing, and keep responsibilities clear.', identity: 'Clinic Partner 06', role: 'Diagnostic service provider', company: 'Diagnostic services' },
  { topic: 'Your clinic brand', quote: 'A clinic-branded experience keeps the patient relationship with our practice, while giving our team a clearer way to manage testing.', identity: 'Clinic Partner 07', role: 'Clinic owner', company: 'Specialty clinic' },
  { topic: 'Patient experience', quote: 'Patients want to understand what happens next. Clear testing updates give our team a better starting point for those conversations.', identity: 'Clinic Partner 08', role: 'Healthcare provider', company: 'Community practice' },
  { topic: 'Results access', quote: 'Secure access to reports supports our review process. It helps us keep diagnostic information organized while clinical decisions remain with the treating physician.', identity: 'Clinic Partner 09', role: 'Medical director', company: 'Clinical network' },
];

/* Reusable, dependency-free editorial carousel (original logic; adds teardown for React). */
class FrigoTestimonialSlider {
  static instances = 0;
  root: HTMLElement; items: Testimonial[]; index = 0;
  track: HTMLElement; progress: HTMLElement; counter: HTMLElement;
  reducedMotion: MediaQueryList; slides: HTMLElement[] = [];
  pendingFrame: number | null = null; autoplayTimer?: ReturnType<typeof setTimeout>;
  autoplayPaused = false; focused = false; dragging = false; visible = true;
  autoplayButton?: HTMLButtonElement; resizeObserver: ResizeObserver | null = null;
  visibilityObserver?: IntersectionObserver; abort = new AbortController();

  constructor(root: HTMLElement, testimonials: Testimonial[]) {
    if (!root.id) root.id = `partner-slider-${++FrigoTestimonialSlider.instances}`;
    const signal = this.abort.signal;
    this.root = root;
    this.items = testimonials;
    this.track = root.querySelector('.signature-track') as HTMLElement;
    this.progress = root.querySelector('.signature-progress') as HTMLElement;
    this.counter = root.querySelector('.signature-count') as HTMLElement;
    this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    this.render();
    this.track.addEventListener('scroll', () => {
      if (this.pendingFrame) return;
      this.pendingFrame = requestAnimationFrame(() => {
        this.pendingFrame = null;
        const closest = this.slides.reduce((best, _slide, index) => Math.abs(this.offset(index) - this.track.scrollLeft) < Math.abs(this.offset(best) - this.track.scrollLeft) ? index : best, 0);
        this.select(closest);
      });
    }, { passive: true, signal });
    this.track.addEventListener('keydown', event => {
      const actions: Record<string, number> = { ArrowLeft: this.index - 1, ArrowRight: this.index + 1, Home: 0, End: this.items.length - 1 };
      if (!(event.key in actions)) return;
      event.preventDefault();
      this.go(actions[event.key]);
    }, { signal });
    root.querySelectorAll<HTMLButtonElement>('[data-slide-direction]').forEach(button => {
      button.addEventListener('click', () => this.go(this.index + Number(button.dataset.slideDirection)), { signal });
    });
    const align = () => this.track.scrollTo({ left: this.offset(this.index), behavior: 'instant' as ScrollBehavior });
    this.resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(align) : null;
    if (this.resizeObserver) this.resizeObserver.observe(this.track);
    else window.addEventListener('resize', align, { signal });
    (root.querySelector('.signature-controls') as HTMLElement).hidden = false;
    this.select(0);
    this.setupAutoplay();
  }

  setupAutoplay() {
    const signal = this.abort.signal;
    this.autoplayButton = this.element('button', 'signature-autoplay', '❚❚') as HTMLButtonElement;
    this.autoplayButton.type = 'button';
    this.autoplayButton.setAttribute('aria-label', 'Pause automatic testimonials');
    this.autoplayButton.setAttribute('aria-pressed', 'false');
    this.root.querySelector('.signature-arrows')!.prepend(this.autoplayButton);
    this.autoplayButton.addEventListener('click', () => {
      this.autoplayPaused = !this.autoplayPaused;
      if (!this.autoplayPaused) this.focused = false;
      this.autoplayButton!.textContent = this.autoplayPaused ? '▶' : '❚❚';
      this.autoplayButton!.setAttribute('aria-pressed', String(this.autoplayPaused));
      this.autoplayButton!.setAttribute('aria-label', this.autoplayPaused ? 'Resume automatic testimonials' : 'Pause automatic testimonials');
      this.scheduleAutoplay();
    }, { signal });
    this.root.addEventListener('focusin', () => {
      this.focused = !!this.root.querySelector(':focus-visible');
      this.scheduleAutoplay();
    }, { signal });
    this.root.addEventListener('focusout', () => {
      setTimeout(() => { this.focused = !!this.root.querySelector(':focus-visible'); this.scheduleAutoplay(); }, 0);
    }, { signal });
    this.track.addEventListener('pointerdown', () => { this.dragging = true; this.scheduleAutoplay(); }, { signal });
    const release = () => { this.dragging = false; this.scheduleAutoplay(); };
    window.addEventListener('pointerup', release, { signal });
    window.addEventListener('pointercancel', release, { signal });
    document.addEventListener('visibilitychange', () => this.scheduleAutoplay(), { signal });
    this.reducedMotion.addEventListener('change', () => this.scheduleAutoplay(), { signal });
    if (typeof IntersectionObserver === 'function') {
      this.visibilityObserver = new IntersectionObserver(entries => {
        this.visible = entries.some(entry => entry.isIntersecting);
        this.scheduleAutoplay();
      }, { threshold: 0.1 });
      this.visibilityObserver.observe(this.root);
    }
    this.scheduleAutoplay();
  }

  scheduleAutoplay() {
    clearTimeout(this.autoplayTimer);
    if (this.abort.signal.aborted) return;
    const playing = !this.autoplayPaused && !this.focused && !this.dragging && this.visible && !document.hidden && !this.reducedMotion.matches;
    this.counter.setAttribute('aria-live', playing ? 'off' : 'polite');
    if (!playing) return;
    this.autoplayTimer = setTimeout(() => {
      this.go((this.index + 1) % this.items.length, true);
      this.scheduleAutoplay();
    }, 1500);
  }

  element(tag: string, className: string, text?: string) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  render() {
    this.slides = this.items.map((item, index) => {
      const slide = this.element('figure', 'signature-slide');
      slide.id = `${this.root.id || 'partner'}-quote-${index + 1}`;
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${index + 1} of ${this.items.length}`);
      const top = this.element('div', 'signature-slide-top');
      top.append(this.element('span', '', item.topic), this.element('span', 'signature-placeholder', 'Placeholder perspective'));
      const mark = this.element('span', 'signature-quote-mark', '“');
      mark.setAttribute('aria-hidden', 'true');
      const quote = this.element('blockquote', '');
      quote.append(this.element('p', '', item.quote));
      const author = this.element('figcaption', 'signature-author');
      const avatar = this.element('span', 'signature-monogram', String(index + 1).padStart(2, '0'));
      avatar.setAttribute('aria-hidden', 'true');
      const identity = this.element('div', '');
      identity.append(this.element('strong', '', item.identity), this.element('span', '', item.role));
      author.append(avatar, identity, this.element('span', 'signature-clinic', `${item.company} / placeholder`));
      slide.append(top, mark, quote, author);
      this.track.append(slide);
      const button = this.element('button', 'signature-step') as HTMLButtonElement;
      button.type = 'button';
      button.setAttribute('aria-label', `Show testimonial ${index + 1}: ${item.role}`);
      button.setAttribute('aria-controls', slide.id);
      button.append(this.element('span', '', String(index + 1).padStart(2, '0')));
      button.addEventListener('click', () => this.go(index), { signal: this.abort.signal });
      this.progress.append(button);
      return slide;
    });
  }

  offset(index: number) {
    return this.slides[index].offsetLeft - this.slides[0].offsetLeft;
  }

  select(index: number) {
    const changed = this.index !== index;
    this.index = index;
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
      slide.classList.toggle('is-before', i === index - 1);
      slide.classList.toggle('is-after', i === index + 1);
      slide.setAttribute('aria-hidden', String(i !== index));
      this.progress.children[i].setAttribute('aria-current', String(i === index));
    });
    (this.root.querySelector('[data-slide-direction="-1"]') as HTMLButtonElement).disabled = index === 0;
    (this.root.querySelector('[data-slide-direction="1"]') as HTMLButtonElement).disabled = index === this.items.length - 1;
    if (changed || !this.counter.dataset.initialized) {
      this.counter.replaceChildren(this.element('strong', '', String(index + 1).padStart(2, '0')), this.element('span', '', `/ ${String(this.items.length).padStart(2, '0')}`));
      this.counter.dataset.initialized = 'true';
    }
  }

  go(index: number, automatic = false) {
    const target = Math.max(0, Math.min(index, this.items.length - 1));
    const wrap = automatic && target === 0 && this.index === this.items.length - 1;
    this.track.scrollTo({ left: this.offset(target), behavior: (this.reducedMotion.matches || wrap ? 'instant' : 'smooth') as ScrollBehavior });
    if (!automatic && this.autoplayButton) this.scheduleAutoplay();
  }

  destroy() {
    this.abort.abort();
    clearTimeout(this.autoplayTimer);
    if (this.pendingFrame) cancelAnimationFrame(this.pendingFrame);
    this.resizeObserver?.disconnect();
    this.visibilityObserver?.disconnect();
    this.autoplayButton?.remove();
    this.track.replaceChildren();
    this.progress.replaceChildren();
  }
}

function ArrowIcon() {
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

export function PartnerTestimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;
    const slider = new FrigoTestimonialSlider(sliderRef.current, testimonials);
    return () => slider.destroy();
  }, []);

  return (
    <section className="ff-src testimonials-section section-pad" id="testimonials" aria-labelledby="testimonials-heading" aria-describedby="testimonials-disclaimer">
      <div className="container">
        <div className="testimonials-heading"><p className="eyebrow">TRUSTED HEALTHCARE PARTNERS</p><h2 id="testimonials-heading">Experiences That Move Healthcare Forward.</h2><p className="testimonials-intro">Discover how modern diagnostic infrastructure can help clinics and healthcare providers deliver better testing experiences.</p></div>
        <p id="testimonials-disclaimer" className="testimonial-accessible-note">Fictional placeholder testimonials. Not actual customer endorsements.</p>
        <div className="signature-slider" ref={sliderRef} data-testimonial-slider role="region" aria-roledescription="carousel" aria-label="Healthcare partner placeholder testimonials">
          <div className="signature-track" tabIndex={0} aria-label="Testimonial slides. Use left and right arrow keys to navigate."></div>
          <div className="signature-controls" hidden>
            <p className="signature-count" aria-live="polite" aria-atomic="true"><strong>01</strong><span>/ 09</span></p>
            <div className="signature-progress" role="group" aria-label="Choose testimonial"></div>
            <div className="signature-arrows"><button type="button" data-slide-direction="-1" aria-label="Previous testimonial"><ArrowIcon /></button><button type="button" data-slide-direction="1" aria-label="Next testimonial"><ArrowIcon /></button></div>
          </div>
          <noscript><blockquote>Having ordering and collection updates in one place helps our team stay focused on patients rather than chasing the next step.</blockquote><p>Clinic Partner 01 / Fictional placeholder. Enable JavaScript to browse all nine perspectives.</p></noscript>
        </div>
      </div>
    </section>
  );
}
