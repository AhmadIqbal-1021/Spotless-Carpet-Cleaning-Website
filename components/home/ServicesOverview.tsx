import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { HoverImage } from "@/components/motion/HoverImage";

const overviewCards = [
  {
    title: "Carpet Cleaning",
    description:
      "Professional carpet cleaning for one room up to four rooms, using dedicated extraction equipment.",
    image: "/images/carpet/clean-carpet-pattern-closeup.jpg",
    alt: "Close-up of a freshly cleaned carpet with a crisp vacuum pattern",
    href: "/services#carpet",
  },
  {
    title: "Upholstery & Sofa Cleaning",
    description:
      "Cleaning for 2 seater, 3 seater and L-shape sofas, restoring fabric and removing everyday marks.",
    image: "/images/before-after/upholstery-cushion-before-after.jpg",
    alt: "Upholstered cushion shown before and after professional cleaning",
    href: "/services#upholstery",
  },
  {
    title: "Stairs, Landings & Hallways",
    description:
      "Cleaning for hallways, stairs and landings alongside your carpet or room cleaning.",
    image: "/images/carpet/clean-hallway-carpet.jpg",
    alt: "Long hallway with freshly cleaned carpet",
    href: "/services#rooms",
  },
] as const;

export function ServicesOverview() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            description="Professional cleaning for carpets, upholstery, sofas and mattresses — priced clearly, explained simply."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {overviewCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08}>
              <Link
                href={card.href}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-teal-light">
                  <HoverImage>
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </HoverImage>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="text-lg font-semibold text-brand-navy">
                    {card.title}
                  </h3>
                  <p className="flex-1 text-sm text-muted-foreground">
                    {card.description}
                  </p>
                  <span className="text-sm font-semibold text-brand-teal-dark">
                    View prices →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
