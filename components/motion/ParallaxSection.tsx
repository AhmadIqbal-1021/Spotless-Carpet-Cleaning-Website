"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * A section with a real photo as a full-bleed background that drifts
 * (parallax) and fades in/out as it scrolls through the viewport,
 * with a colour overlay on top for text contrast. Used for the
 * higher-impact, editorial sections (service areas, final CTA) —
 * kept out of content-dense sections like pricing/FAQ where a photo
 * behind text would hurt scannability.
 */
export function ParallaxSection({
  image,
  overlayClassName = "bg-brand-navy/80",
  className = "",
  id,
  children,
}: {
  image: string;
  overlayClassName?: string;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Fades in as the section enters the viewport, holds, then fades
  // back out as it leaves — the "fade in / fade out" scroll effect.
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative isolate overflow-hidden ${className}`}
    >
      <motion.div style={{ opacity, y }} className="absolute inset-0 z-0">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className={`absolute inset-0 z-0 ${overlayClassName}`} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
