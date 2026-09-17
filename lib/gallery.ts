/**
 * Metadata for the real client-supplied photography used across the
 * site. Every entry maps to an actual image supplied by the client —
 * nothing here is stock photography.
 *
 * Note: two supplied before/after photos of sofas were excluded from
 * the site because they contain another company's logo/watermark
 * baked into the image ("Clean For U"). Displaying them would
 * misattribute that work and branding to Spotless Carpet Cleaning.
 * See README.md for details — replacement photos should be supplied
 * by the client without a third-party watermark.
 */

export type GalleryCategory = "before-after" | "carpet" | "upholstery" | "equipment";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Every category this image belongs to; an image can appear in more than one. */
  tags: GalleryCategory[];
  /** Set for images that already show a composited before/after result. */
  isBeforeAfter?: boolean;
  caption?: string;
};

export const galleryImages: GalleryImage[] = [
  // Before & After — the most important section
  {
    src: "/images/before-after/bedroom-carpet-before-after.jpg",
    alt: "Bedroom carpet before and after professional carpet cleaning, showing dirt and marks removed",
    width: 1071,
    height: 998,
    tags: ["before-after", "carpet"],
    isBeforeAfter: true,
    caption: "Bedroom carpet cleaning",
  },
  {
    src: "/images/before-after/upholstery-cushion-before-after.jpg",
    alt: "Upholstered cushion before and after professional upholstery cleaning, showing stains removed",
    width: 720,
    height: 960,
    tags: ["before-after", "upholstery"],
    isBeforeAfter: true,
    caption: "Upholstery cushion cleaning",
  },
  {
    src: "/images/service/carpet-cleaning-dramatic-contrast.jpg",
    alt: "Carpet cleaning in progress showing a clear contrast between cleaned and uncleaned carpet in the same room",
    width: 1018,
    height: 1266,
    tags: ["before-after", "carpet"],
    caption: "Cleaning in progress — the difference is immediate",
  },
  {
    src: "/images/service/carpet-cleaning-in-progress-contrast.jpg",
    alt: "Carpet cleaning wand mid-clean showing the transition from dirty to freshly cleaned carpet",
    width: 977,
    height: 989,
    tags: ["before-after", "carpet"],
    caption: "Mid-clean contrast",
  },
  {
    src: "/images/service/carpet-cleaning-wand-contrast.jpg",
    alt: "Carpet cleaning wand on carpet showing cleaned carpet next to still-dirty carpet",
    width: 1023,
    height: 1294,
    tags: ["before-after", "carpet"],
    caption: "Cleaning wand in action",
  },

  // Carpet cleaning results
  {
    src: "/images/carpet/clean-carpet-herringbone-pattern.jpg",
    alt: "Freshly cleaned carpet with a herringbone vacuum pattern",
    width: 1080,
    height: 1310,
    tags: ["carpet"],
  },
  {
    src: "/images/carpet/clean-carpet-living-room.jpg",
    alt: "Bright living room with freshly cleaned carpet showing even cleaning pattern",
    width: 1080,
    height: 900,
    tags: ["carpet"],
  },
  {
    src: "/images/carpet/clean-carpet-pattern-closeup.jpg",
    alt: "Close-up of freshly cleaned carpet fibres with a crisp diamond vacuum pattern",
    width: 960,
    height: 1239,
    tags: ["carpet"],
  },
  {
    src: "/images/carpet/clean-hallway-carpet.jpg",
    alt: "Long hallway with freshly cleaned carpet running the length of the corridor",
    width: 1080,
    height: 1440,
    tags: ["carpet"],
  },
  {
    src: "/images/service/carpet-cleaning-wand-air-mover.jpg",
    alt: "Carpet cleaning wand in use with an air mover fan drying the carpet nearby",
    width: 990,
    height: 1063,
    tags: ["carpet", "equipment"],
  },
  {
    src: "/images/service/carpet-cleaning-wand-closeup.jpg",
    alt: "Close-up of a carpet cleaning wand extracting dirt from carpet fibres",
    width: 728,
    height: 1600,
    tags: ["carpet"],
  },
  {
    src: "/images/service/carpet-cleaning-hoses-equipment.jpg",
    alt: "Carpet cleaning hoses and wand laid out on carpet during a cleaning job",
    width: 1078,
    height: 1075,
    tags: ["carpet", "equipment"],
  },

  // Equipment & professional work
  {
    src: "/images/equipment/carpet-extraction-machine-outdoor.jpg",
    alt: "Professional portable carpet extraction machine with wand attachment",
    width: 720,
    height: 960,
    tags: ["equipment"],
  },
  {
    src: "/images/equipment/professional-cleaning-equipment-set.jpg",
    alt: "Full set of professional carpet cleaning equipment including extraction machine, wands, hoses and cleaning solution",
    width: 720,
    height: 960,
    tags: ["equipment"],
  },
  {
    src: "/images/equipment/carpet-cleaning-machine-closeup.jpg",
    alt: "Close-up of a professional carpet cleaning extraction machine",
    width: 720,
    height: 960,
    tags: ["equipment"],
  },
];

export function getGalleryByCategory(category: GalleryCategory) {
  return galleryImages.filter((image) => image.tags.includes(category));
}

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  "before-after": "Before & After",
  carpet: "Carpet Cleaning",
  upholstery: "Upholstery / Sofa Cleaning",
  equipment: "Equipment & Professional Work",
};
