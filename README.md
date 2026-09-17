# Spotless Carpet Cleaning — Website

Production website for Spotless Carpet Cleaning, a carpet and upholstery
cleaning business serving selected areas of Scotland and England.
Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other useful commands:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
npx tsc --noEmit  # TypeScript check
```

## Configuration

Copy `.env.example` to `.env.local` and fill in real values:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International-format number (digits only) used to build `wa.me` links. Until set, WhatsApp buttons render disabled rather than linking anywhere. |
| `NEXT_PUBLIC_BUSINESS_PHONE` | Number used for `tel:` links and displayed on the site. |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | Used for `mailto:` links. |
| `NEXT_PUBLIC_SITE_URL` | Production domain, used for metadata, sitemap and canonical URLs. |

None of these values are invented anywhere in the codebase — components
check `business.whatsapp.isConfigured` / `business.phone.isConfigured`
etc. and render an honest placeholder state until real values are
supplied.

## Business data — single source of truth

- `lib/business.ts` — company name, contact channels, service areas.
- `lib/services.ts` — every service and its price (client-supplied,
  unmodified). Every page that shows pricing reads from here.
- `lib/gallery.ts` — metadata for the real client-supplied photography.
- `lib/faq.ts` — FAQ content.
- `lib/contact.ts` — quote-form validation and enquiry message building.

Update prices, areas, or contact details in these files — never hard-code
them in components.

## Contact form — current behaviour and next step

There is no email/form provider wired up yet (no backend, database, or
CMS was added for this V1 by design). The quote form at `/contact`:

1. Validates input on both the client and the server
   (`app/contact/actions.ts`, a Next.js Server Action).
2. On success, builds a pre-filled WhatsApp message (and a mailto link)
   from the enquiry and shows it to the visitor to send immediately —
   this is the real, working delivery channel today.

**To add a proper form/email provider** (e.g. Formspree, Resend,
Web3Forms): choose one, add its API key to `.env.local`, and forward
the validated `enquiry` object to it inside `submitQuoteEnquiry` in
`app/contact/actions.ts`, returning a definitive "message sent" status
instead of (or alongside) the WhatsApp hand-off.

## Image assets

All photography under `public/images/` was supplied by the client —
none of it is stock photography. See `Source_Images/` for the original
files and `lib/gallery.ts` for how each image is used and captioned.

**Two supplied photos were excluded from the site:** the original
`Ba1.jpeg` and `Ba2.jpeg` (sofa before/after photos) contain another
company's logo/watermark ("Clean For U") baked into the image itself.
Publishing them would misattribute that company's branding and work to
Spotless Carpet Cleaning, so they were left out. Ask the client for
replacement sofa before/after photos without a third-party watermark —
the upholstery gallery is currently thin (one photo) as a result.

## What still needs client input

See the "Client information still required" list provided in the
project handoff summary — in short: WhatsApp number, phone number,
email, any real testimonials, opening hours, social links, and a
reviewed privacy policy. Everything else is built and ready.
