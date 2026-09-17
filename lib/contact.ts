import { enquiryServiceOptions, type EnquiryServiceValue } from "@/lib/services";

export type QuoteEnquiry = {
  name: string;
  phone: string;
  postcode: string;
  service: EnquiryServiceValue;
  email?: string;
  rooms?: string;
  preferredDate?: string;
  message?: string;
};

export type FieldErrors = Partial<Record<keyof QuoteEnquiry, string>>;

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  errors?: FieldErrors;
  whatsappLink?: string | null;
  mailtoLink?: string | null;
};

export const initialQuoteFormState: QuoteFormState = { status: "idle" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Loose UK postcode check — accepts partial ("EH1", "G1") and full
// ("EH1 1AA") postcodes so genuine entries aren't rejected.
const POSTCODE_PATTERN = /^[A-Za-z]{1,2}\d[A-Za-z\d]?(\s*\d[A-Za-z]{2})?$/;
const PHONE_PATTERN = /^[0-9+()\s-]{7,20}$/;

export function validateEnquiry(input: Partial<QuoteEnquiry>): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!input.phone || !PHONE_PATTERN.test(input.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!input.postcode || !POSTCODE_PATTERN.test(input.postcode.trim())) {
    errors.postcode = "Please enter a valid UK postcode.";
  }

  const validServiceValues = enquiryServiceOptions.map((option) => option.value);
  if (!input.service || !validServiceValues.includes(input.service as EnquiryServiceValue)) {
    errors.service = "Please select a service.";
  }

  if (input.email && input.email.trim() && !EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (input.message && input.message.length > 1000) {
    errors.message = "Message is too long (maximum 1000 characters).";
  }

  return errors;
}

function serviceLabel(value: EnquiryServiceValue): string {
  return (
    enquiryServiceOptions.find((option) => option.value === value)?.label ||
    value
  );
}

/**
 * Builds a pre-filled WhatsApp message from a validated enquiry so the
 * lead can be sent to the business immediately — this is the real
 * delivery channel until a form/email provider is configured (see
 * README.md and .env.example).
 */
export function buildEnquiryWhatsAppMessage(enquiry: QuoteEnquiry): string {
  const lines = [
    `Hi, I'd like to request a quote for ${serviceLabel(enquiry.service)}.`,
    `Name: ${enquiry.name}`,
    `Phone: ${enquiry.phone}`,
    `Postcode: ${enquiry.postcode}`,
  ];

  if (enquiry.rooms) lines.push(`Rooms: ${enquiry.rooms}`);
  if (enquiry.preferredDate) lines.push(`Preferred date: ${enquiry.preferredDate}`);
  if (enquiry.email) lines.push(`Email: ${enquiry.email}`);
  if (enquiry.message) lines.push(`Message: ${enquiry.message}`);

  return lines.join("\n");
}

export function buildEnquiryEmailBody(enquiry: QuoteEnquiry): string {
  return buildEnquiryWhatsAppMessage(enquiry);
}
