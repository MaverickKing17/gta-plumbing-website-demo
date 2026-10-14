import { Droplet, LifeBuoy, Mail } from 'lucide-react';
import { BUSINESS, SERVICES, SERVICE_AREAS } from '@/lib/constants';
import QuoteFormComponent from '@/components/QuoteForm';

export default function QuoteSection() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-gray-50 to-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: context */}
          <div className="lg:pt-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">
              Get In Touch
            </p>
            <h2 className="text-balance text-3xl font-bold text-navy sm:text-4xl">
              Request Your Free Quote
            </h2>
            <p className="mt-4 text-lg text-navy-400">
              Fill out the form with your details and a description of the issue. The
              business will review your request and follow up to discuss next steps.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
                  <LifeBuoy className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">What happens next</p>
                  <p className="mt-1 text-sm text-navy-400">
                    Your request is reviewed and you will be contacted to confirm the scope,
                    timing, and availability before anything is scheduled.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-500">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">Demo contact details</p>
                  <p className="mt-1 text-sm text-navy-400">
                    Phone: {BUSINESS.phone} · Email: {BUSINESS.email}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Fictional details for portfolio demonstration only.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy">
                  <Droplet className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">Service area</p>
                  <p className="mt-1 text-sm text-navy-400">
                    {BUSINESS.serviceArea}. Availability confirmed on follow-up.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <QuoteFormComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
