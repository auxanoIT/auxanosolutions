# Cloudflare Workers Deployment

This project is configured for Next.js on Cloudflare Workers through `@opennextjs/cloudflare`.

## One-Time Cloudflare Setup

Create the R2 bucket used by the Next.js incremental cache:

```bash
npx wrangler r2 bucket create auxo-incremental-cache
```

Set the production secrets in Cloudflare Workers & Pages > auxo > Settings > Variables and Secrets:

```txt
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN
SANITY_REVALIDATE_SECRET
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_CLARITY_ID
NEXT_PUBLIC_HUBSPOT_TRACKING_ID
HUBSPOT_PORTAL_ID
HUBSPOT_FORM_ID
HUBSPOT_ESTIMATE_FORM_ID
HUBSPOT_MEETINGS_URL
TURNSTILE_SECRET_KEY
NEXT_PUBLIC_TURNSTILE_SITE_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
LEAD_FALLBACK_EMAIL
NEXT_PUBLIC_SALES_WHATSAPP
NEXT_PUBLIC_SUPPORT_WHATSAPP
```

Only set values you actually use. Keep private keys as secrets, not plain text variables.

## Local Checks

```bash
npm run build
npm run cf:build
```

For local Cloudflare runtime preview:

```bash
npm run cf:preview
```

## Deploy

```bash
npm run cf:deploy
```

If deploying from the Cloudflare dashboard/Git integration, use:

```bash
npm run cf:deploy
```

The config expects:

- Worker name: `auxo`
- R2 bucket: `auxo-incremental-cache`
- Main worker output: `.open-next/worker.js`
- Static assets output: `.open-next/assets`
- Compatibility flag: `nodejs_compat`

## Notes

`open-next.config.ts` uses R2 for the Next.js incremental cache and Durable Objects for time-based/on-demand revalidation. This avoids the static-only limitation where CMS updates would require a full redeploy before changed pages appear.
