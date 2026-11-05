'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '../../config';
import { Icon } from './Icon';
import { Logo } from './Logo';

const links = [
  ['how-it-works', 'How It Works'],
  ['for-clinics', 'For Clinics'],
  ['capabilities', 'Capabilities'],
  ['faq', 'FAQ'],
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      let current = '';
      for (const [id] of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
      <div className="wrap wrap--wide header__inner">
        <a href="#top" className="header__brand" aria-label="Frigo Flow home" onClick={closeMenu}><Logo /></a>

        <nav className="header__nav" aria-label="Main">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : undefined} aria-current={active === id ? 'location' : undefined}>{label}</a>
          ))}
        </nav>

        <div className="header__actions">
          <a href={siteConfig.loginUrl} className="btn btn--navy">Login</a>
          <a href="#demo" className="btn btn--navy">Request Demo <Icon name="arrow" /></a>
        </div>

        <button type="button" className="header__toggle" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(open => !open)}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <nav className="wrap" aria-label="Mobile">
          {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}<Icon name="chevronRight" /></a>)}
          <a href={siteConfig.loginUrl} className="btn btn--navy mobile-menu__login">Login</a>
          <a href="#demo" className="btn btn--gold" onClick={closeMenu}>Request a Demo <Icon name="arrow" /></a>
        </nav>
      </div>
    </header>
  );
}
