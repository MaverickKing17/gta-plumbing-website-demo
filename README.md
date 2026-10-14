# Northstar Plumbing Co. — Portfolio Demo Website

A complete, responsive, single-page website for a fictional Toronto-area plumbing company. Built as a portfolio demonstration for a freelance service that creates professional websites and lead-capture systems for small home-service businesses.

> **Disclaimer:** Northstar Plumbing Co. is a fictional business. All contact details, service descriptions, and service-area references are for demonstration purposes only.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** (build tool and dev server)
- **Tailwind CSS 3** (utility-first styling)
- **Lucide React** (icons)
- **Resend** (email delivery via Vercel serverless function)

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts automatically. Open the printed local URL in your browser.

## Building for Production

```bash
npm run build
```

Output is written to the `dist/` directory. Preview the production build:

```bash
npm run preview
```

## Deploying on Vercel

1. **Push to GitHub:** The project is connected to `MaverickKing17/gta-plumbing-website-demo`.
2. **Import in Vercel:** Go to [vercel.com](https://vercel.com), click "New Project," and import the GitHub repository.
3. **Settings:** Vercel auto-detects Vite. No special configuration is needed:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. **Environment Variables:** Configure the three variables below (see the Resend section).
5. **Deploy:** Click Deploy. The site goes live on a Vercel subdomain. You can connect a custom domain in the Vercel dashboard.

## Form Submission — Resend Email Integration

The quote form POSTs to a Vercel serverless function at `/api/submit-quote`. The function validates all fields server-side, checks a honeypot field for spam, and sends a notification email via the Resend API. The Resend API key is never exposed to the browser.

### Environment Variables (configure in Vercel)

Add these in **Vercel Project Settings → Environment Variables**:

| Variable | Description | Example |
|---|---|---|
| `RESEND_API_KEY` | Your Resend API key (starts with `re_`). Keep this secret. | `re_abc123...` |
| `QUOTE_RECIPIENT_EMAIL` | The fixed email address that receives quote notifications. This is set server-side and cannot be overridden by the browser. | `owner@yourdomain.com` |
| `RESEND_FROM_EMAIL` | The sender address. Must be on a domain you have verified in Resend. | `quotes@yourdomain.com` |

> **Never** put secret values in `.env` files that are committed to the repository. Set them in the Vercel dashboard or via the Vercel CLI.

### Resend Domain Verification

Before you can send email from a custom domain (e.g., `quotes@yourdomain.com`):

1. Create a free account at [resend.com](https://resend.com).
2. In the Resend dashboard, go to **Domains** and add your domain.
3. Resend will provide DNS records (SPF, DKIM, and optionally DMARC). Add these to your domain's DNS configuration through your domain registrar or DNS provider.
4. Wait for DNS propagation and Resend to verify the domain (usually within minutes to a few hours).
5. Once verified, use any address on that domain as the `RESEND_FROM_EMAIL`.

> **Testing without a verified domain:** Until your domain is verified, Resend only allows sending from the shared address `onboarding@resend.dev`, and emails are delivered **only** to the email address associated with your Resend account. This is useful for initial testing but not for production. The fictional `demo@northstarplumbing.example` address **cannot** be used as a sender — Resend will reject it.

### Demo Mode (no API key configured)

When `RESEND_API_KEY`, `QUOTE_RECIPIENT_EMAIL`, or `RESEND_FROM_EMAIL` is not set, the endpoint returns a controlled demo-mode response. The form shows a success state with a note that the email service is not yet configured — no email is sent. This lets you exercise the full form flow without a live Resend account.

### Email Content

The notification email includes:
- Customer name
- Customer email (set as `reply_to`)
- Phone number (if provided)
- Requested plumbing service
- Service address or postal code (if provided)
- Description of the issue
- Preferred contact method

Subject line: `New Plumbing Quote Request — [Selected Service]`

## Project Structure

```
api/
└── submit-quote.ts          # Vercel serverless function (Resend email)

src/
├── App.tsx                  # Page assembly
├── index.css                # Global styles + Tailwind
├── main.tsx                 # Entry point
├── components/
│   ├── Header.tsx           # Announcement bar + sticky nav + mobile menu
│   ├── Hero.tsx             # Two-column hero with overlay card
│   ├── Services.tsx         # Six service cards with preselect links
│   ├── WhyChooseUs.tsx      # Three benefit cards
│   ├── HowItWorks.tsx       # Three-step process
│   ├── ServiceArea.tsx      # Location chips
│   ├── FAQ.tsx              # Accessible accordion
│   ├── QuoteForm.tsx        # Validated form with honeypot, success/error states
│   ├── QuoteSection.tsx     # Form wrapper with context panel
│   └── Footer.tsx           # Links, service area, demo notice
└── lib/
    ├── constants.ts         # Business info, services, FAQs, images
    └── submitQuote.ts       # Fetch wrapper for /api/submit-quote
```

## Security Notes

- The Resend API key is used only in the Vercel serverless function (`api/submit-quote.ts`), never in client-side code.
- The frontend bundle contains no API keys, secrets, or credentials.
- The email recipient is fixed through the `QUOTE_RECIPIENT_EMAIL` environment variable — the browser cannot override it.
- All form fields are validated on the server, not just in the browser.
- A hidden honeypot field (`website`) silently rejects bot submissions.
- The endpoint is restricted to POST requests and enforces a 16 KB body-size limit.
- User-supplied text is HTML-escaped before being included in the email body.
- Error responses do not expose internal details or stack traces.

## Features

- Fully responsive (mobile, tablet, desktop)
- Sticky header with functional mobile hamburger menu
- Smooth-scroll anchor navigation to all sections
- Six service cards — clicking "Request This Service" preselects the service in the form
- Accessible FAQ accordion with keyboard support
- Quote form with:
  - Required-field and email-format validation (client + server)
  - Honeypot spam protection
  - Inline error messages with focus management
  - Character counter on the description field
  - Disabled submit button during processing (no double submissions)
  - Success state after server confirms Resend accepted the request
  - Clear error state with retry on failure
  - Service preselection via URL hash (`#contact?service=leak-detection-repairs`)
- Reduced-motion support
- No hardcoded API keys or credentials in the repository
