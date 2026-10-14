/**
 * Vercel Serverless Function — Quote Request → Resend Email
 *
 * Accepts a POST request with quote form data, validates all fields
 * server-side, and sends a notification email via the Resend API.
 *
 * Environment variables (configure in Vercel Project Settings → Environment Variables):
 *   RESEND_API_KEY       — Resend API key (re_xxx)
 *   QUOTE_RECIPIENT_EMAIL — Fixed recipient for quote notifications
 *   RESEND_FROM_EMAIL     — Verified sender address (e.g. quotes@yourdomain.com)
 *
 * Domain verification: Before you can send from a custom domain, you must
 * add the domain in the Resend dashboard and add the DNS records Resend
 * provides (SPF, DKIM, etc.) to your domain's DNS configuration. Until
 * verification is complete, you can only use the shared testing sender
 * onboarding@resend.dev, which delivers to the Resend account owner only.
 *
 * DEMO MODE: When RESEND_API_KEY is not set, the endpoint returns a
 * controlled demo-mode response so the frontend can be exercised without
 * a live Resend account. No email is sent in demo mode.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface QuotePayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  description: string;
  contactMethod: 'email' | 'phone';
  consent: boolean;
  // honeypot — should always be empty
  website?: string;
}

const VALID_SERVICES = [
  'leak-detection-repairs',
  'drain-cleaning',
  'faucet-fixture-installation',
  'toilet-repairs-installation',
  'water-heater-service',
  'general-plumbing-repairs',
  'other',
];

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_PHONE = 30;
const MAX_ADDRESS = 200;
const MAX_DESCRIPTION = 1000;
const MAX_BODY_BYTES = 16 * 1024; // 16 KB

function json(status: number, body: Record<string, unknown>) {
  return { status, body };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validatePayload(payload: QuotePayload): string[] {
  const errors: string[] = [];

  if (!payload.name || !payload.name.trim()) {
    errors.push('Name is required.');
  } else if (payload.name.trim().length > MAX_NAME) {
    errors.push(`Name must be ${MAX_NAME} characters or fewer.`);
  }

  if (!payload.email || !payload.email.trim()) {
    errors.push('Email is required.');
  } else if (payload.email.trim().length > MAX_EMAIL) {
    errors.push(`Email must be ${MAX_EMAIL} characters or fewer.`);
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (payload.phone && payload.phone.length > MAX_PHONE) {
    errors.push(`Phone must be ${MAX_PHONE} characters or fewer.`);
  }

  if (!payload.service) {
    errors.push('Service selection is required.');
  } else if (!VALID_SERVICES.includes(payload.service)) {
    errors.push('Invalid service selection.');
  }

  if (payload.address && payload.address.length > MAX_ADDRESS) {
    errors.push(`Address must be ${MAX_ADDRESS} characters or fewer.`);
  }

  if (!payload.description || !payload.description.trim()) {
    errors.push('Description is required.');
  } else if (payload.description.length > MAX_DESCRIPTION) {
    errors.push(`Description must be ${MAX_DESCRIPTION} characters or fewer.`);
  }

  if (!payload.consent) {
    errors.push('Consent is required.');
  }

  if (payload.contactMethod !== 'email' && payload.contactMethod !== 'phone') {
    errors.push('Invalid contact method.');
  }

  return errors;
}

function buildEmailHtml(payload: QuotePayload, serviceLabel: string): string {
  const rows: [string, string][] = [
    ['Name', payload.name.trim()],
    ['Email', payload.email.trim()],
    ['Phone', payload.phone.trim() || '—'],
    ['Service Requested', serviceLabel],
    ['Service Address / Postal Code', payload.address.trim() || '—'],
    ['Preferred Contact Method', payload.contactMethod],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;font-weight:600;color:#10243A;vertical-align:top;white-space:nowrap;">${escapeHtml(
          label
        )}:</td><td style="padding:6px 0;color:#333;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.6;color:#333;max-width:600px;margin:0 auto;">
  <h2 style="color:#10243A;margin-bottom:4px;">New Plumbing Quote Request</h2>
  <p style="color:#666;margin-top:0;margin-bottom:24px;font-size:13px;">Submitted from the Northstar Plumbing Co. website quote form.</p>
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    ${rowsHtml}
  </table>
  <h3 style="color:#10243A;font-size:14px;margin-top:24px;margin-bottom:8px;">Description of the Issue</h3>
  <p style="background:#f4f6f8;border-radius:8px;padding:16px;margin:0;white-space:pre-wrap;word-break:break-word;">${escapeHtml(
    payload.description.trim()
  )}</p>
  <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0;">
  <p style="font-size:12px;color:#999;">This is an automated notification from the Northstar Plumbing Co. quote form. Portfolio demonstration — fictional business and contact details.</p>
</body>
</html>`;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Restrict to POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  // Enforce request-size limit
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > MAX_BODY_BYTES) {
    res.status(413).json({ error: 'Request too large.' });
    return;
  }

  let payload: QuotePayload;
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    res.status(400).json({ error: 'Invalid JSON.' });
    return;
  }

  if (!payload || typeof payload !== 'object') {
    res.status(400).json({ error: 'Invalid request body.' });
    return;
  }

  // Honeypot: if the hidden "website" field has a value, silently reject
  if (payload.website && payload.website.trim() !== '') {
    // Return a fake success to not tip off the bot
    res.status(200).json({ success: true, message: 'Request received.' });
    return;
  }

  // Server-side validation
  const errors = validatePayload(payload);
  if (errors.length > 0) {
    res.status(400).json({ error: errors[0] });
    return;
  }

  // --- Demo mode: no API key configured ---
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.QUOTE_RECIPIENT_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !recipientEmail || !fromEmail) {
    res.status(200).json({
      success: true,
      demoMode: true,
      message:
        'Demo mode: RESEND_API_KEY, QUOTE_RECIPIENT_EMAIL, or RESEND_FROM_EMAIL is not configured. No email was sent.',
    });
    return;
  }

  // --- Live mode: send email via Resend ---
  const serviceLabel =
    VALID_SERVICES.includes(payload.service) && payload.service !== 'other'
      ? VALID_SERVICES.find((s) => s === payload.service)?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) ?? payload.service
      : payload.service === 'other'
        ? 'Other'
        : payload.service;

  const subject = `New Plumbing Quote Request — ${serviceLabel}`;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipientEmail,
        subject,
        html: buildEmailHtml(payload, serviceLabel),
        reply_to: payload.email.trim(),
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', resendResponse.status, errorText);
      res.status(502).json({
        error: 'The email service could not process the request. Please try again later.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      demoMode: false,
      message:
        'Your quote request has been submitted. This is not a confirmed booking — the business will follow up to discuss next steps.',
    });
  } catch (err) {
    console.error('Resend request failed:', err);
    res.status(502).json({
      error: 'Unable to connect to the email service. Please try again later.',
    });
  }
}
