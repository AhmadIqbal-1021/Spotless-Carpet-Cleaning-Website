import { business } from "@/lib/business";
import { formatGBP } from "@/lib/services";

export const faqs = [
  {
    question: "What areas do you cover?",
    answer: `We serve customers across selected areas of Scotland and England, including ${business.serviceAreas.note}. See our full list of areas above.`,
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer professional carpet cleaning, upholstery and sofa cleaning, mattress cleaning, and stairs, landings and hallway cleaning.",
  },
  {
    question: "What is the minimum call-out?",
    answer: `Our minimum call-out is ${formatGBP(
      business.minimumCallOut
    )} per visit. Individual service prices on our Services & Prices page may sit below this on their own.`,
  },
  {
    question: "How can I request a quote?",
    answer:
      "You can request a quote using our contact form, by messaging us on WhatsApp, or by calling us directly.",
  },
  {
    question: "Can I contact you through WhatsApp?",
    answer:
      "Yes — WhatsApp is one of the quickest ways to reach us. Use the WhatsApp button anywhere on the site to start a conversation.",
  },
  {
    question: "Do you clean sofas and mattresses?",
    answer:
      "Yes, we clean 2 seater, 3 seater and L-shape sofas, as well as normal and king-size mattresses. See our Services & Prices page for pricing.",
  },
] as const;
