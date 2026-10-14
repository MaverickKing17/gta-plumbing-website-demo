import { FileText, ListChecks, PhoneCall } from 'lucide-react';

const BENEFITS = [
  {
    icon: FileText,
    title: 'Straightforward Requests',
    description:
      'Describe the issue using a clear, structured form. No need to figure out technical jargon — just tell us what you see and what you need.',
  },
  {
    icon: ListChecks,
    title: 'Clear Next Steps',
    description:
      'Once the request is submitted, the business can review the details and follow up to discuss what needs to happen and when.',
  },
  {
    icon: PhoneCall,
    title: 'Convenient Contact Options',
    description:
      'Choose whether you prefer to be contacted by email or phone. Provide the details that work best for your schedule.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">
            Why Northstar
          </p>
          <h2 className="text-balance text-3xl font-bold text-navy sm:text-4xl">
            A Better Way to Request Plumbing Service
          </h2>
          <p className="mt-4 text-lg text-navy-400">
            No phone tag, no guesswork. Submit your request and get a clear response.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl border border-gray-100 bg-gray-50 p-8 text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-sm">
                <benefit.icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-navy">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
