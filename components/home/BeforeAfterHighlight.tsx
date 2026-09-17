import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterCard } from "@/components/gallery/BeforeAfterCard";
import { Reveal } from "@/components/motion/Reveal";
import { getGalleryByCategory } from "@/lib/gallery";

export function BeforeAfterHighlight() {
  const images = getGalleryByCategory("before-after").slice(0, 3);

  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Real Results"
            title="See the Difference"
            description="Genuine photos from real cleaning jobs — no stock photography."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <Reveal key={image.src} delay={index * 0.08}>
              <BeforeAfterCard image={image} />
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-full border-2 border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
          >
            View Full Gallery
          </Link>
        </div>
      </Container>
    </section>
  );
}
