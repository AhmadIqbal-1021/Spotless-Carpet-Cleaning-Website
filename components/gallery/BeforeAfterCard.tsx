import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";
import { HoverImage } from "@/components/motion/HoverImage";

export function BeforeAfterCard({
  image,
  priority = false,
}: {
  image: GalleryImage;
  priority?: boolean;
}) {
  return (
    <figure className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="relative w-full" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
        <HoverImage>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </HoverImage>
        {image.isBeforeAfter ? (
          <span className="absolute left-3 top-3 rounded-full bg-brand-navy px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Before &amp; After
          </span>
        ) : null}
      </div>
      {image.caption ? (
        <figcaption className="px-4 py-3 text-sm font-medium text-brand-navy">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
