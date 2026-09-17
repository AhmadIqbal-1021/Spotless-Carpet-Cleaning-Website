/**
 * Central business configuration for Spotless Carpet Cleaning.
 *
 * This is the single source of truth for company details, contact
 * channels, and service areas. Update values here rather than hard
 * coding them in components.
 *
 * Values marked "not yet configured" are placeholders — the business
 * has not supplied this information yet. Do not invent real values.
 * Once the client provides them, set the corresponding environment
 * variable (see .env.example) and the site will pick it up
 * automatically.
 */

const rawWhatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
const rawPhoneNumber = process.env.NEXT_PUBLIC_BUSINESS_PHONE?.trim();
const rawEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim();

export const business = {
  name: "Spotless Carpet Cleaning",
  tagline: "Professional Carpet & Upholstery Cleaning",
  shortDescription:
    "Professional carpet, upholstery, sofa and mattress cleaning serving selected areas across Scotland and England.",
  minimumCallOut: 70,

  /** WhatsApp number in international format, e.g. "447123456789" (no + or spaces). */
  whatsapp: {
    number: rawWhatsAppNumber || null,
    isConfigured: Boolean(rawWhatsAppNumber),
    defaultMessage:
      "Hi, I'd like to get a quote for carpet/upholstery cleaning.",
  },

  phone: {
    number: rawPhoneNumber || null,
    isConfigured: Boolean(rawPhoneNumber),
  },

  email: {
    address: rawEmail || null,
    isConfigured: Boolean(rawEmail),
  },

  social: {
    // No social media accounts have been supplied by the client yet.
    facebook: null as string | null,
    instagram: null as string | null,
  },

  /** Serving selected areas — do not present as nationwide coverage. */
  serviceAreas: {
    scotland: [
      "Glasgow",
      "Edinburgh",
      "Perth",
      "Dundee",
      "Aberdeen",
      "Fife",
      "Inverness",
    ],
    england: [
      "Newcastle upon Tyne",
      "Northampton",
      "Nottingham",
      "Liverpool",
      "Manchester",
      "Birmingham",
      "London",
      "Plymouth",
      "Norwich",
    ],
    note: "and surrounding areas",
  },
} as const;

/** Builds a wa.me link with an optional pre-filled message. */
export function buildWhatsAppLink(message?: string): string | null {
  if (!business.whatsapp.number) return null;
  const text = encodeURIComponent(message || business.whatsapp.defaultMessage);
  return `https://wa.me/${business.whatsapp.number}?text=${text}`;
}

/** Builds a tel: link for the configured business phone number. */
export function buildTelLink(): string | null {
  if (!business.phone.number) return null;
  return `tel:${business.phone.number.replace(/\s+/g, "")}`;
}

export function buildMailtoLink(): string | null {
  if (!business.email.address) return null;
  return `mailto:${business.email.address}`;
}
