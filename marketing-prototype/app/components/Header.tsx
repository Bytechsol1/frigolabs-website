'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [loginOpen, setLoginOpen] = useState(false);
  const loginRef = useRef<HTMLDivElement>(null);

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
      if (event.key !== 'Escape') return;
      setLoginOpen(false);
      setMenuOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (loginRef.current && !loginRef.current.contains(event.target as Node)) setLoginOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
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
          <div className="login" ref={loginRef}>
            <button type="button" className="login__toggle" aria-expanded={loginOpen} aria-controls="login-menu" onClick={() => setLoginOpen(open => !open)}>
              Login <Icon name="chevronDown" />
            </button>
            <div id="login-menu" className="login__menu" hidden={!loginOpen}>
              <a href={siteConfig.clinicLoginUrl}><Icon name="user" />Clinic Portal</a>
              <a href={siteConfig.patientLoginUrl}><Icon name="users" />Patient Portal</a>
            </div>
          </div>
          <a href="#demo" className="btn btn--navy">Request Demo <Icon name="arrow" /></a>
        </div>

        <button type="button" className="header__toggle" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(open => !open)}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <nav className="wrap" aria-label="Mobile">
          {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}<Icon name="chevronRight" /></a>)}
          <div className="mobile-menu__logins">
            <a href={siteConfig.clinicLoginUrl} className="btn btn--outline"><Icon name="user" />Clinic Login</a>
            <a href={siteConfig.patientLoginUrl} className="btn btn--outline"><Icon name="users" />Patient Login</a>
          </div>
          <a href="#demo" className="btn btn--gold" onClick={closeMenu}>Request a Demo <Icon name="arrow" /></a>
        </nav>
      </div>
    </header>
  );
}
