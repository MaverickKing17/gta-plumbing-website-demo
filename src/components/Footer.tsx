import { Droplet, Phone, Mail } from 'lucide-react';
import { BUSINESS, SERVICES, SERVICE_AREAS } from '@/lib/constants';

const QUICK_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why Choose Us' },
  { href: '#area', label: 'Service Area' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand">
                <Droplet className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold leading-tight">
                Northstar <span className="text-brand">Plumbing</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-navy-100">
              Residential plumbing quote requests for Toronto and the Greater Toronto Area.
              Submit your request and a follow-up conversation will help determine the right
              next steps.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-navy-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#contact?service=${s.id}`}
                    className="text-sm text-navy-100 transition-colors hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service area + contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Service Area
            </h3>
            <p className="mt-4 text-sm text-navy-100">
              {SERVICE_AREAS.join(', ')}
            </p>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">
              Demo Contact
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={BUSINESS.phoneHref}
                  className="flex items-center gap-2 text-sm text-navy-100 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.emailHref}
                  className="flex items-center gap-2 text-sm text-navy-100 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-navy-200">
              &copy; {year} {BUSINESS.name}. All rights reserved.
            </p>
            <p className="text-xs text-navy-300">
              Portfolio demonstration — fictional business and contact details.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
