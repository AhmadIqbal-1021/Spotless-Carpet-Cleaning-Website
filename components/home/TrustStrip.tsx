import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { business } from "@/lib/business";

const points = [
  {
    title: "Transparent Pricing",
    description: `Clear, published prices with a minimum call-out of £${business.minimumCallOut} — no surprises.`,
  },
  {
    title: "Professional Equipment",
    description:
      "Cleaning carried out with dedicated carpet and upholstery extraction equipment.",
  },
  {
    title: "Real Results",
    description:
      "See genuine before-and-after photos from real cleaning jobs in our gallery.",
  },
  {
    title: "Selected UK Coverage",
    description:
      "Serving selected areas across Scotland and England, including surrounding areas.",
  },
];

export function TrustStrip() {
  return (
    <section className="relative border-b border-border bg-surface">
      <Container className="grid gap-8 pb-12 pt-32 sm:grid-cols-2 sm:pt-40 lg:grid-cols-4">
        {points.map((point, index) => (
          <Reveal key={point.title} delay={index * 0.08} className="flex flex-col gap-2">
            <h3 className="text-base font-semibold text-brand-navy">
              {point.title}
            </h3>
            <p className="text-sm text-muted-foreground">{point.description}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
