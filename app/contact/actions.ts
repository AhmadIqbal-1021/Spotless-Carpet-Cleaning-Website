"use server";

import {
  validateEnquiry,
  buildEnquiryWhatsAppMessage,
  type QuoteEnquiry,
  type QuoteFormState,
} from "@/lib/contact";
import { buildWhatsAppLink, buildMailtoLink } from "@/lib/business";

/**
 * Server action for the quote form.
 *
 * IMPORTANT: no email/form provider is configured yet (see
 * .env.example). This action validates the enquiry server-side (never
 * trusting client-only validation) and, once valid, prepares a
 * pre-filled WhatsApp message and mailto link so the lead can be sent
 * to the business immediately through a channel that is already
 * configured. It does not silently email or store the enquiry
 * anywhere — once a provider (e.g. Formspree, Resend, Web3Forms) is
 * chosen, forward `enquiry` to it here and return a definitive
 * "message sent" success state instead.
 */
export async function submitQuoteEnquiry(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  const enquiry: Partial<QuoteEnquiry> = {
    name: String(formData.get("name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    postcode: String(formData.get("postcode") || "").trim(),
    service: String(formData.get("service") || "") as QuoteEnquiry["service"],
    email: String(formData.get("email") || "").trim() || undefined,
    rooms: String(formData.get("rooms") || "").trim() || undefined,
    preferredDate: String(formData.get("preferredDate") || "").trim() || undefined,
    message: String(formData.get("message") || "").trim() || undefined,
  };

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const validEnquiry = enquiry as QuoteEnquiry;
  const message = buildEnquiryWhatsAppMessage(validEnquiry);

  return {
    status: "success",
    whatsappLink: buildWhatsAppLink(message),
    mailtoLink: buildMailtoLink(),
  };
}
