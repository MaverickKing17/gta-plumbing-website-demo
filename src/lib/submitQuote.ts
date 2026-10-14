export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  description: string;
  contactMethod: 'email' | 'phone';
  consent: boolean;
  website: string; // honeypot — must stay empty
}

export interface QuoteResult {
  success: boolean;
  demoMode?: boolean;
  message: string;
}

/**
 * Submits the quote form data to the server-side /api/submit-quote endpoint.
 *
 * The server validates all fields, checks a honeypot field for spam, and
 * sends a notification email via Resend. The Resend API key is never
 * exposed to the browser — it lives only in the Vercel environment.
 *
 * When RESEND_API_KEY is not configured server-side, the endpoint returns
 * a controlled demo-mode response instead of sending an email.
 */
export async function submitQuote(
  data: QuoteFormData
): Promise<QuoteResult> {
  const response = await fetch('/api/submit-quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => ({
    error: 'Unexpected response from the server.',
  }));

  if (!response.ok) {
    return {
      success: false,
      message: result.error || 'Something went wrong. Please try again.',
    };
  }

  return {
    success: result.success ?? true,
    demoMode: result.demoMode,
    message: result.message || 'Your quote request has been submitted.',
  };
}
