import { MessageSquare, ClipboardList, Home } from 'lucide-react';
import { HERO_IMAGE, BUSINESS } from '@/lib/constants';

const REASSURANCE = [
  { icon: MessageSquare, text: 'Clear Communication' },
  { icon: ClipboardList, text: 'Convenient Quote Requests' },
  { icon: Home, text: 'Residential Plumbing Services' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy text-white"
    >
      {/* Decorative gradient accents */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left column */}
          <div className="animate-slide-up">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent">
              Residential Plumbing · Toronto &amp; GTA
            </p>
            <h1 className="text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Plumbing Problems?{' '}
              <span className="text-accent">Let&apos;s Find the Right Solution.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
              Request plumbing assistance for your home, describe what&apos;s going on, and
              arrange a callback. Submitting the form is a request — not a confirmed
              appointment.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-brand-600 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Request a Free Quote
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                View Our Services
              </a>
            </div>

            {/* Reassurance points */}
            <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-6">
              {REASSURANCE.map((item) => (
                <li key={item.text} className="flex items-center gap-2 text-sm text-navy-100">
                  <item.icon className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column - hero image with overlay card */}
          <div className="relative animate-fade-in">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <img
                src={HERO_IMAGE}
                alt="Plumber installing pipes under a sink, performing residential plumbing work"
                className="h-72 w-full object-cover sm:h-96 lg:h-[480px]"
                loading="eager"
              />
              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs">
                <div className="rounded-xl bg-white/95 p-5 shadow-xl backdrop-blur">
                  <p className="text-base font-bold text-navy">
                    Need plumbing help?
                  </p>
                  <p className="mt-1 text-sm text-navy-400">
                    Tell us what you need and request a callback.
                  </p>
                  <a
                    href="#contact"
                    className="mt-3 inline-flex text-sm font-semibold text-brand hover:text-brand-600"
                  >
                    Start your request &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone strip for mobile */}
      <div className="border-t border-white/10 bg-navy-800/50 lg:hidden">
        <a
          href={BUSINESS.phoneHref}
          className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white"
        >
          {BUSINESS.phone} — {BUSINESS.name}
        </a>
      </div>
    </section>
  );
}
