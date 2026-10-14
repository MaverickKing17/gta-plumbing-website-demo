import { ClipboardList, Send, MessagesSquare } from 'lucide-react';

const STEPS = [
  {
    number: 1,
    icon: ClipboardList,
    title: 'Tell Us What\u2019s Wrong',
    description:
      'Open the quote form and describe the plumbing issue you are experiencing — what happened, when it started, and where it is in your home.',
  },
  {
    number: 2,
    icon: Send,
    title: 'Submit Your Request',
    description:
      'Send the form with your contact details and preferred contact method. The request is reviewed on the business side — no instant booking.',
  },
  {
    number: 3,
    icon: MessagesSquare,
    title: 'Discuss the Next Steps',
    description:
      'The business follows up to confirm scope, timing, and availability. This is where the actual appointment is arranged — not at submission.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-navy py-20 lg:py-28 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            Simple Process
          </p>
          <h2 className="text-balance text-3xl font-bold sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-navy-100">
            Three steps from problem to conversation. Submitting a request is not a
            confirmed appointment or emergency dispatch.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <div
                  className="absolute top-7 left-1/2 hidden h-px w-full bg-white/15 md:block"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg ring-4 ring-navy-800">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-wider text-accent">
                  Step {step.number}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-navy-100">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
