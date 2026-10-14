import { useState, useEffect } from 'react';
import { Menu, X, Droplet, Phone } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why Choose Us' },
  { href: '#area', label: 'Service Area' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-navy text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center">
          {BUSINESS.announcement}
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4" aria-label="Main">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <a href="#home" onClick={closeMenu} className="flex items-center gap-2 shrink-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
                <Droplet className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold text-navy leading-tight">
                Northstar <span className="text-brand">Plumbing</span>
              </span>
            </a>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-navy-600 hover:text-brand transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center gap-2 text-sm font-medium text-navy hover:text-brand transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {BUSINESS.phone}
              </a>
              <a
                href="#contact"
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Request a Quote
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-navy hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-gray-100 bg-white animate-fade-in"
          >
            <ul className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-navy hover:bg-gray-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="block rounded-lg bg-brand px-3 py-3 text-center text-base font-semibold text-white"
                >
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
