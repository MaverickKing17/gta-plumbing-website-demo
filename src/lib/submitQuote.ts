export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  description: string;
  contactMethod: 'email' | 'phone';
  consent: boolean;
}

export interface QuoteResult {
  success: boolean;
  message: string;
}

/**
 * Demo submission handler.
 *
 * This function simulates a network request with a short delay and always
 * succeeds. It does NOT transmit, store, or forward any data. Replace the
 * body of this function with a call to a secure server-side endpoint when
 * connecting a real backend (e.g., Make.com webhook, Google Sheets API, or
 * a custom API that protects credentials server-side).
 */
export async function submitQuote(
  _data: QuoteFormData
): Promise<QuoteResult> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    success: true,
    message:
      'Your quote request has been received in demo mode. No data was transmitted or stored. Replace the demo handler with a secure endpoint to enable real submissions.',
  };
}
