import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

export default function Services() {
  return (
    <section id="services" className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">
            What We Can Help With
          </p>
          <h2 className="text-balance text-3xl font-bold text-navy sm:text-4xl">
            Plumbing Services for Your Home
          </h2>
          <p className="mt-4 text-lg text-navy-400">
            Explore common residential plumbing needs and tell us what you&apos;d like help with.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col rounded-xl bg-white p-7 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <service.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-navy">
                {service.label}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-400">
                {service.description}
              </p>
              <a
                href={`#contact?service=${service.id}`}
                data-service={service.id}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-600"
              >
                Request This Service
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
