import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery — Before & After Results",
  description:
    "Real before and after photos from carpet and upholstery cleaning jobs, plus our professional cleaning equipment.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-brand-navy py-14 text-white sm:py-20">
        <Container>
          <Reveal className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold sm:text-5xl">Gallery</h1>
            <p className="max-w-2xl text-white/85">
              Real photos from real jobs — before and after results, carpets,
              and the equipment we use. No stock photography.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <GalleryGrid />

          <Reveal className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-brand-navy">
              Like what you see?
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Get your own carpets and upholstery looking this fresh.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-dark"
              >
                Get a Quote
              </Link>
              <WhatsAppButton />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
