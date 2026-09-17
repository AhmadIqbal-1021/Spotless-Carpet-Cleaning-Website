"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { BeforeAfterCard } from "@/components/gallery/BeforeAfterCard";
import { Reveal } from "@/components/motion/Reveal";
import { HoverImage } from "@/components/motion/HoverImage";
import {
  galleryImages,
  galleryCategoryLabels,
  type GalleryCategory,
} from "@/lib/gallery";

const filters: Array<{ value: GalleryCategory | "all"; label: string }> = [
  { value: "all", label: "All Photos" },
  { value: "before-after", label: galleryCategoryLabels["before-after"] },
  { value: "carpet", label: galleryCategoryLabels.carpet },
  { value: "upholstery", label: galleryCategoryLabels.upholstery },
  { value: "equipment", label: galleryCategoryLabels.equipment },
];

export function GalleryGrid() {
  const [active, setActive] = useState<GalleryCategory | "all">("all");

  const visibleImages = useMemo(() => {
    if (active === "all") return galleryImages;
    return galleryImages.filter((image) => image.tags.includes(active));
  }, [active]);

  return (
    <div className="flex flex-col gap-8">
      <div
        role="tablist"
        aria-label="Filter gallery by category"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const isActive = filter.value === active;
          return (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(filter.value)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal ${
                isActive
                  ? "border-brand-navy bg-brand-navy text-white"
                  : "border-border bg-surface text-brand-navy hover:bg-brand-teal-light"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleImages.map((image, index) =>
          image.isBeforeAfter || image.caption ? (
            <Reveal key={image.src} delay={(index % 6) * 0.06}>
              <BeforeAfterCard image={image} priority={index < 3} />
            </Reveal>
          ) : (
            <Reveal
              key={image.src}
              delay={(index % 6) * 0.06}
              className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
              style={{ aspectRatio: `${image.width} / ${image.height}` }}
            >
              <HoverImage>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index < 3}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </HoverImage>
            </Reveal>
          )
        )}
      </div>

      {visibleImages.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          No photos in this category yet.
        </p>
      ) : null}
    </div>
  );
}
