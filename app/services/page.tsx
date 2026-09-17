import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingTable } from "@/components/services/PricingTable";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";
import { serviceCategories, formatGBP } from "@/lib/services";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Services & Prices",
  description:
    "Full price list for carpet cleaning, upholstery and sofa cleaning, mattress cleaning, and stairs, landings and hallway cleaning. Minimum call-out applies.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-brand-navy py-14 text-white sm:py-20">
        <Container>
          <Reveal className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold sm:text-5xl">
              Services &amp; Prices
            </h1>
            <p className="max-w-2xl text-white/85">
              Clear, published pricing for every service we offer. Prices
              below are per service — a minimum call-out of{" "}
              {formatGBP(business.minimumCallOut)} applies to every visit.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              align="left"
              title="Full Price List"
              description="All prices are in pound sterling and set directly by Spotless Carpet Cleaning."
            />
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {serviceCategories.map((category, index) => (
              <Reveal key={category.id} delay={index * 0.08}>
                <PricingTable category={category} />
              </Reveal>
            ))}
          </div>

          <Reveal className="rounded-2xl border border-brand-navy/10 bg-brand-teal-light/60 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-brand-navy">
              Minimum Call-Out: {formatGBP(business.minimumCallOut)}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              A minimum call-out charge of {formatGBP(business.minimumCallOut)}{" "}
              applies to every visit, regardless of the individual service
              prices listed above. Some single services are priced below this
              minimum on their own and may be combined with other services to
              make up a full visit.
            </p>
          </Reveal>

          <Reveal className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
            <h3 className="text-xl font-bold text-brand-navy">
              Ready to book your clean?
            </h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Request a quote online or message us directly on WhatsApp.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-dark"
              >
                Request a Quote
              </Link>
              <WhatsAppButton />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
