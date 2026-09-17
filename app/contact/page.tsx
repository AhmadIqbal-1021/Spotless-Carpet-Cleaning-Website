import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { PhoneButton } from "@/components/shared/PhoneButton";
import { Reveal } from "@/components/motion/Reveal";
import { business } from "@/lib/business";
import { formatGBP } from "@/lib/services";

export const metadata: Metadata = {
  title: "Contact & Get a Quote",
  description:
    "Request a quote for carpet, upholstery, sofa or mattress cleaning. Contact Spotless Carpet Cleaning by WhatsApp, phone, or our online form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-navy py-14 text-white sm:py-20">
        <Container>
          <Reveal className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold sm:text-5xl">
              Get a Quote
            </h1>
            <p className="max-w-2xl text-white/85">
              Tell us what needs cleaning and we&apos;ll get back to you.
              Minimum call-out: {formatGBP(business.minimumCallOut)}.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <QuoteForm />
          </Reveal>

          <Reveal as="div" delay={0.1}>
            <aside className="flex flex-col gap-6">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <h2 className="text-lg font-bold text-brand-navy">
                  Prefer to talk directly?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Reach us on WhatsApp for the fastest response, or call us
                  directly.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <WhatsAppButton className="w-full" />
                  <PhoneButton className="w-full" />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-brand-teal-light/60 p-6">
                <h2 className="text-lg font-bold text-brand-navy">
                  Where We Work
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Serving customers across selected areas of Scotland and
                  England, {business.serviceAreas.note}.
                </p>
              </div>
            </aside>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
