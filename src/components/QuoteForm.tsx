import { useState, useEffect, useRef, type FormEvent } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  RotateCcw,
} from 'lucide-react';
import { SERVICES, BUSINESS } from '@/lib/constants';
import { submitQuote, type QuoteFormData } from '@/lib/submitQuote';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Errors {
  name?: string;
  email?: string;
  service?: string;
  description?: string;
  consent?: string;
}

const MAX_DESCRIPTION = 1000;

function validate(data: QuoteFormData): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = 'Please enter your full name.';
  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.service) errors.service = 'Please select a service.';
  if (!data.description.trim()) {
    errors.description = 'Please describe the issue you are experiencing.';
  } else if (data.description.length > MAX_DESCRIPTION) {
    errors.description = `Please keep the description under ${MAX_DESCRIPTION} characters.`;
  }
  if (!data.consent) errors.consent = 'Please provide consent to submit this request.';
  return errors;
}

export default function QuoteForm() {
  const [data, setData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    address: '',
    description: '',
    contactMethod: 'email',
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState('');
  const serviceSelectRef = useRef<HTMLSelectElement>(null);

  // Preselect service from URL hash or data-service attribute click
  useEffect(() => {
    const preselect = () => {
      const hash = window.location.hash;
      // Check for #contact?service=xxx pattern
      const match = hash.match(/service=([^&]+)/);
      if (match) {
        const serviceId = decodeURIComponent(match[1]);
        if (SERVICES.some((s) => s.id === serviceId)) {
          setData((prev) => ({ ...prev, service: serviceId }));
        }
      }
    };
    preselect();
    window.addEventListener('hashchange', preselect);
    return () => window.removeEventListener('hashchange', preselect);
  }, []);

  const update = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Focus first error field
      const firstError = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstError);
      el?.focus();
      return;
    }

    setStatus('submitting');
    setSubmitError('');

    try {
      const result = await submitQuote(data);
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setSubmitError(result.message);
      }
    } catch {
      setStatus('error');
      setSubmitError('Something went wrong while submitting your request. Please try again.');
    }
  };

  const resetForm = () => {
    setData({
      name: '',
      email: '',
      phone: '',
      service: '',
      address: '',
      description: '',
      contactMethod: 'email',
      consent: false,
    });
    setErrors({});
    setStatus('idle');
    setSubmitError('');
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-card lg:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
            <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
          </div>
          <h3 className="mt-5 text-2xl font-bold text-navy">Request Received</h3>
          <p className="mt-3 max-w-md text-navy-400">
            Your quote request has been processed in demo mode. No data was transmitted or
            stored. This is not a confirmed booking — in a live setup, the business would
            follow up to discuss next steps.
          </p>
          <div className="mt-6 rounded-xl bg-gray-50 p-4 text-left">
            <p className="text-sm text-navy-400">
              <span className="font-semibold text-navy">Service requested:</span>{' '}
              {SERVICES.find((s) => s.id === data.service)?.label ?? data.service}
            </p>
            <p className="mt-1 text-sm text-navy-400">
              <span className="font-semibold text-navy">Contact:</span> {data.email}
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8 lg:p-10">
      {status === 'error' && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-sm text-red-800">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
              Full name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={data.name}
              onChange={(e) => update('name', e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 ${
                errors.name
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-gray-300 focus:border-brand'
              }`}
              placeholder="Jane Doe"
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-xs text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
              Email address <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={data.email}
              onChange={(e) => update('email', e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 ${
                errors.email
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-gray-300 focus:border-brand'
              }`}
              placeholder="jane@example.com"
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone + Address */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
              Phone number <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
              placeholder="(416) 555-0000"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-1.5 block text-sm font-medium text-navy"
            >
              Service address or postal code{' '}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="address"
              type="text"
              autoComplete="street-address"
              value={data.address}
              onChange={(e) => update('address', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
              placeholder="123 Main St, Toronto, ON"
            />
          </div>
        </div>

        {/* Service dropdown */}
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-navy">
            Service required <span className="text-red-600">*</span>
          </label>
          <select
            id="service"
            ref={serviceSelectRef}
            value={data.service}
            onChange={(e) => update('service', e.target.value)}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'service-error' : undefined}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-brand/30 ${
              errors.service
                ? 'border-red-400 focus:border-red-500'
                : 'border-gray-300 focus:border-brand'
            } ${data.service ? '' : 'text-gray-400'}`}
          >
            <option value="">Select a service…</option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id} className="text-navy">
                {s.label}
              </option>
            ))}
            <option value="other" className="text-navy">
              Other
            </option>
          </select>
          {errors.service && (
            <p id="service-error" className="mt-1.5 text-xs text-red-600">
              {errors.service}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Description of the issue <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            maxLength={MAX_DESCRIPTION}
            value={data.description}
            onChange={(e) => update('description', e.target.value)}
            aria-invalid={!!errors.description}
            aria-describedby={
              errors.description ? 'description-error' : 'description-count'
            }
            className={`w-full resize-y rounded-lg border px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 ${
              errors.description
                ? 'border-red-400 focus:border-red-500'
                : 'border-gray-300 focus:border-brand'
            }`}
            placeholder="Describe what's happening — when it started, where it is, and any visible damage."
          />
          <div className="mt-1.5 flex items-center justify-between">
            {errors.description ? (
              <p id="description-error" className="text-xs text-red-600">
                {errors.description}
              </p>
            ) : (
              <span />
            )}
            <p id="description-count" className="text-xs text-gray-400">
              {data.description.length}/{MAX_DESCRIPTION}
            </p>
          </div>
        </div>

        {/* Contact method */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-navy">
            Preferred contact method
          </legend>
          <div className="flex gap-4">
            {(['email', 'phone'] as const).map((method) => (
              <label
                key={method}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm capitalize transition-colors ${
                  data.contactMethod === method
                    ? 'border-brand bg-brand-50 text-brand font-semibold'
                    : 'border-gray-300 text-navy-400 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={data.contactMethod === method}
                  onChange={() => update('contactMethod', method)}
                  className="sr-only"
                />
                {method}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Consent */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(e) => update('consent', e.target.checked)}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-brand focus:ring-2 focus:ring-brand/30"
            />
            <span className="text-sm text-navy-400">
              I understand the submitted information may be used to respond to my specific
              service inquiry. <span className="text-red-600">*</span>
            </span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="mt-1.5 pl-7 text-xs text-red-600">
              {errors.consent}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            <>
              <Send className="h-5 w-5" aria-hidden="true" />
              Submit Quote Request
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          Submitting this form is a request for a callback, not a confirmed appointment.
          Demo mode — no data is transmitted or stored.
        </p>
      </form>
    </div>
  );
}
