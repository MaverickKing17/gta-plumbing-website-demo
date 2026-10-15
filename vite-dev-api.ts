import type { Plugin } from 'vite';

/**
 * Vite dev-server middleware that intercepts POST /api/submit-quote
 * and returns a demo-mode JSON response.
 *
 * The real endpoint is a Vercel serverless function (api/submit-quote.ts)
 * that only runs in a Vercel deployment. In the Bolt preview (Vite dev
 * server) there is no backend, so without this middleware the fetch hits
 * a 404 HTML page and the frontend can't parse the response.
 *
 * This plugin only runs during `vite dev` / preview — it is excluded
 * from the production build that gets deployed to Vercel.
 */
export function devApiPlugin(): Plugin {
  return {
    name: 'dev-api-submit-quote',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/submit-quote', async (req, res) => {
        if (req.method !== 'POST') {
          res.setHeader('Allow', 'POST');
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed.' }));
          return;
        }

        let payload: { website?: string };
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(chunk as Buffer);
          }
          payload = JSON.parse(Buffer.concat(chunks).toString());
        } catch {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid JSON.' }));
          return;
        }

        // Honeypot — silently return fake success
        if (payload.website && payload.website.trim() !== '') {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, message: 'Request received.' }));
          return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(
          JSON.stringify({
            success: true,
            demoMode: true,
            message:
              'Demo mode: This form is running in a preview environment without a backend. No email was sent. Deploy to Vercel with RESEND_API_KEY, QUOTE_RECIPIENT_EMAIL, and RESEND_FROM_EMAIL configured to enable email delivery.',
          })
        );
      });
    },
  };
}
