# Northstar Plumbing Co. — Portfolio Demo Website

A complete, responsive, single-page website for a fictional Toronto-area plumbing company. Built as a portfolio demonstration for a freelance service that creates professional websites and lead-capture systems for small home-service businesses.

> **Disclaimer:** Northstar Plumbing Co. is a fictional business. All contact details, service descriptions, and service-area references are for demonstration purposes only.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** (build tool and dev server)
- **Tailwind CSS 3** (utility-first styling)
- **Lucide React** (icons)

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

1. **Push to GitHub:** Create a repository and push this project to it.
2. **Import in Vercel:** Go to [vercel.com](https://vercel.com), click "New Project," and import the GitHub repository.
3. **Settings:** Vercel auto-detects Vite. No special configuration is needed:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. **Deploy:** Click Deploy. The site goes live on a Vercel subdomain. You can connect a custom domain in the Vercel dashboard.

No environment variables are required for the static demo.

## Form Submission — Demo Mode

The quote form runs in **demo mode** by default. It validates all input client-side, shows success/error states, but does **not** transmit or store any data. The submission handler is isolated in `src/lib/submitQuote.ts`.

### Connecting a Real Backend

Replace the body of `submitQuote()` in `src/lib/submitQuote.ts` with a `fetch()` call to a secure server-side endpoint. Options include:

- **Make.com webhook** — Create a scenario that receives the form payload and routes it to Google Sheets, email notifications, etc.
- **Custom API** — Build a small serverless function (Vercel API route, Supabase Edge Function) that accepts the form data, validates it server-side, and forwards it. Keep all API keys and credentials on the server side — never in client-side code.

> **Security note:** Do not expose webhook URLs, API keys, or service credentials in client-side code. Use a server-side proxy for any integration that requires secrets.

## Project Structure

```
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
│   ├── QuoteForm.tsx        # Validated form with success/error states
│   ├── QuoteSection.tsx     # Form wrapper with context panel
│   └── Footer.tsx           # Links, service area, demo notice
└── lib/
    ├── constants.ts         # Business info, services, FAQs, images
    └── submitQuote.ts       # Demo submission handler (replaceable)
```

## Features

- Fully responsive (mobile, tablet, desktop)
- Sticky header with functional mobile hamburger menu
- Smooth-scroll anchor navigation to all sections
- Six service cards — clicking "Request This Service" preselects the service in the form
- Accessible FAQ accordion with keyboard support
- Quote form with:
  - Required-field and email-format validation
  - Inline error messages with focus management
  - Character counter on the description field
  - Disabled submit button during processing (no double submissions)
  - Polished success state (demo mode) and error state
  - Service preselection via URL hash (`#contact?service=leak-detection-repairs`)
- Reduced-motion support
- No backend, API keys, or credentials required for the demo
