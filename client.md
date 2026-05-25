# Client Intake Checklist for Auxano Website

Use this document to collect everything needed from your client before launch.

## 1) Decision Makers and Access

- Primary business owner (name, email, phone, WhatsApp)
- Primary technical contact (name, email, phone)
- Backup approver (name, email)
- Who will approve copy, design, legal pages, and launch
- Who will own each platform account after handoff

## 2) Domain, Hosting, and DNS

- Production domain and any staging domain
- DNS provider login access (or point of contact who can add records)
- Hosting owner account (Vercel/project owner)
- SSL and redirect preferences:
- Canonical domain (www or non-www)
- Any extra domains to redirect

## 3) Email and Account Setup (Important)

Collect these emails from client so you can register and configure services:

- Main business email for tools and billing (example: admin@company.com)
- Marketing/CRM owner email
- Technical/admin email for DNS and integrations
- Fallback lead destination email (where missed submissions should be sent)
- Sender email identity for outbound lead notifications (example: leads@company.com)

Also request:

- Permission to create platform accounts on client behalf, or invite you as admin
- 2FA phone/authenticator owner for each platform
- Billing contact email for paid tools

## 4) Environment Variables and Credentials

These are directly required by your current codebase.

### Required for core integrations

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN` (for preview/drafts)
- `SANITY_REVALIDATE_SECRET`
- `HUBSPOT_PORTAL_ID`
- `HUBSPOT_FORM_ID`
- `HUBSPOT_ESTIMATE_FORM_ID` (if estimate form uses different HubSpot form)
- `RESEND_API_KEY`
- `LEAD_FALLBACK_EMAIL`
- `RESEND_FROM_EMAIL`

### Recommended/optional

- `TURNSTILE_SECRET_KEY` (enables bot protection; if missing, verification is bypassed)
- `NEXT_PUBLIC_SITE_URL`
- `HUBSPOT_MEETINGS_URL`
- `NEXT_PUBLIC_SALES_WHATSAPP`
- `NEXT_PUBLIC_SUPPORT_WHATSAPP`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_CLARITY_ID`
- `NEXT_PUBLIC_HUBSPOT_TRACKING_ID`

## 5) HubSpot Setup Details (Ask Explicitly)

- HubSpot admin access or invitation
- Final forms to use:
- Contact/consultation form ID
- Estimate form ID
- Confirm custom properties exist and exact internal names:
- `service_interest`
- `lead_source`
- `estimate_range`
- `message`
- Routing rules: who gets notified for new leads
- Lifecycle stage and pipeline mapping for website leads
- Meetings link URL for consultation CTA

## 6) Resend / Email Deliverability Setup

- Resend account access (or invite)
- Verified sending domain (DNS records added)
- Approved sender address (for `RESEND_FROM_EMAIL`)
- Destination inbox for fallback lead alerts (`LEAD_FALLBACK_EMAIL`)
- Reply-to preference (sales, support, or no-reply)

## 7) CMS (Sanity) Content Ownership

- Sanity project ownership and editor list
- Who will maintain content after launch
- Draft/preview workflow approvers
- Revalidation webhook secret coordination (`SANITY_REVALIDATE_SECRET`)

## 8) Content to Collect by Section

### Company and contact basics

- Official company legal name
- Short brand name
- Company description
- Phone, email, address, city, country
- WhatsApp sales and support numbers

### Navigation/footer

- Final menu labels and URLs
- Footer columns and links

### Core pages and modules

- Home page hero copy (eyebrow, headline, description, CTA labels/URLs)
- Service pages (summary, positioning, highlights, deliverables)
- Case studies (client/industry/location/challenge/solution/result/metrics)
- Blog posts (title, excerpt, takeaways, body, publish date)
- FAQs (ID, question, answer, order)
- Testimonials (quote, name, role, company)

### SEO

- Meta title and description per key page
- Canonical path rules
- Open Graph sharing preferences

## 9) Video Assets (Wistia + Testimonials)

Your hero uses Wistia media IDs, so ask for:

- Wistia account access or collaborator invite
- Final Wistia media IDs for homepage carousel
- Video ownership and publishing rights confirmation
- Thumbnail preference and title text

For video testimonials (new requirement):

- Testimonial list with speaker name, role, company
- Raw video files and edited versions
- Consent/release approval for each person featured
- Preferred format and platform:
- Wistia-hosted clips (preferred to match current stack)
- Or MP4/WebM files for direct hosting
- Target length per clip (for example 20-60 seconds)
- Captions/transcripts (SRT or text)
- Priority order of testimonials to publish first

## 10) Animation Video and Motion Assets

Your project already includes Framer Motion and Lottie support. Ask the client:

- Which animation style they want (clean enterprise, cinematic, product-demo)
- Final animation deliverables:
- Lottie JSON files
- MP4/WebM loops
- AE source files (optional but useful)
- Color background variants (light/dark)
- Loop behavior and duration rules
- Sound on/off policy (site currently favors muted background video)
- Performance constraints for mobile (max file sizes)

## 11) Verkada-Inspired Direction (Very Important)

Since you are taking inspiration from Verkada, collect alignment details first:

- Exact reference pages on verkada.com (send links)
- What they like most:
- Hero style
- Section pacing
- Product storytelling
- Motion style
- What to avoid copying directly
- Brand differentiation goals (how they should look unique)
- Preferred tone:
- Security-first
- Infrastructure-first
- Premium enterprise
- Technical/developer-heavy

## 12) Legal and Compliance

- Approved Privacy Policy text
- Approved Terms text
- Cookie/analytics consent requirement by region
- Permission to publish client names/logos/case study outcomes
- Any regulated-industry language constraints

## 13) Launch and Operations

- Go-live date and blackout dates
- UAT approvers and sign-off process
- Lead response SLA owner (who responds to web leads and how fast)
- Post-launch support owner and escalation path
- Reporting cadence (weekly/monthly traffic and lead reports)

## 14) Quick Priority List (Collect First)

If client is slow, collect these first so build can proceed:

1. Platform access: Sanity, HubSpot, Wistia, Resend, hosting, DNS
2. Env credentials and IDs listed above
3. Contact details and CTA links (phone, email, WhatsApp, meetings URL)
4. Homepage hero copy + Wistia media IDs
5. At least 3 testimonials (text now, video if ready)
6. Brand direction references from Verkada + what to emulate/avoid

## 15) Suggested Message You Can Send the Client

Please share admin or collaborator access (or credentials) for Sanity, HubSpot, Wistia, Resend, hosting, and DNS, plus the required IDs/secrets listed in our intake checklist. We also need final homepage hero copy, CTA links, contact details, at least 3 testimonials, and your preferred Verkada reference pages with notes on what to emulate and what to avoid. For media, please send final hero video IDs, video testimonial assets with permission, and any animation files (Lottie JSON or MP4/WebM) for the homepage and section transitions.
