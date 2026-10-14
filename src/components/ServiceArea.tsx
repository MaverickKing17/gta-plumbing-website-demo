import { MapPin, Info } from 'lucide-react';
import { SERVICE_AREAS } from '@/lib/constants';

export default function ServiceArea() {
  return (
    <section id="area" className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">
            Coverage
          </p>
          <h2 className="text-balance text-3xl font-bold text-navy sm:text-4xl">
            Serving Toronto and the GTA
          </h2>
          <p className="mt-4 text-lg text-navy-400">
            Submit a request from any of these areas. Service availability is confirmed when
            the business responds.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICE_AREAS.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-navy shadow-sm"
              >
                <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                {area}
              </span>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 p-5">
            <Info className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <p className="text-sm text-navy-400">
              This list represents areas where service requests can be submitted. It does
              not guarantee availability in every location. Actual coverage is confirmed
              during the follow-up conversation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
