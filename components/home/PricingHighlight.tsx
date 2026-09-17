import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";
import {
  business,
} from "@/lib/business";
import {
  serviceCategories,
  formatGBP,
  getCategoryStartingPrice,
} from "@/lib/services";

export function PricingHighlight() {
  return (
    <section className="bg-brand-teal-light/60 py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, Published Pricing"
            description="No hidden fees — see exactly what each service costs before you get in touch."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category, index) => (
            <Reveal
              key={category.id}
              delay={index * 0.08}
              className="flex flex-col gap-1 rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <div id={category.id} className="scroll-mt-24">
                <h3 className="text-base font-semibold text-brand-navy">
                  {category.title}
                </h3>
                <p className="text-2xl font-bold text-brand-teal-dark">
                  From {formatGBP(getCategoryStartingPrice(category))}
                </p>
                <p className="text-sm text-muted-foreground">
                  {category.services.length} options available
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-col items-center gap-4 rounded-2xl border border-brand-navy/10 bg-surface p-6 text-center shadow-sm">
          <p className="text-base font-semibold text-brand-navy">
            Minimum call-out: {formatGBP(business.minimumCallOut)}
          </p>
          <p className="max-w-xl text-sm text-muted-foreground">
            A minimum call-out charge of {formatGBP(business.minimumCallOut)}{" "}
            applies to every visit. Individual service prices above may sit
            below this minimum on their own.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-dark"
            >
              See Full Price List
            </Link>
            <WhatsAppButton />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
