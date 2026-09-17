import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { HoverImage } from "@/components/motion/HoverImage";
import { getGalleryByCategory } from "@/lib/gallery";

export function EquipmentShowcase() {
  const images = getGalleryByCategory("equipment");

  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Our Equipment"
            title="Professional-Grade Cleaning Equipment"
            description="We carry out every job with dedicated carpet and upholstery extraction equipment."
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {images.map((image, index) => (
            <Reveal
              key={image.src}
              delay={index * 0.08}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
            >
              <HoverImage>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </HoverImage>
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/gallery"
            className="text-sm font-semibold text-brand-teal-dark hover:text-brand-teal"
          >
            See more in our gallery →
          </Link>
        </div>
      </Container>
    </section>
  );
}
