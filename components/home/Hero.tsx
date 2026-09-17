"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { business } from "@/lib/business";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Subtle parallax + zoom + fade on the background image as the hero
  // scrolls out of view — never more than a gentle drift.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={sectionRef} className="relative bg-brand-navy-dark">
      {/* Background layer gets its own overflow-hidden clip so the
          breakout photo card below can overlap the next section
          without being cut off by this section's own bounds. */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0"
        >
          <Image
            src="/images/carpet/clean-carpet-herringbone-pattern.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-dark/95 via-brand-navy-dark/85 to-brand-navy-dark" />
      </div>

      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ opacity: contentOpacity }}
          className="relative flex flex-col items-center gap-6 pt-20 text-center sm:pt-28"
        >
          <motion.p
            variants={item}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white"
          >
            {business.name}
          </motion.p>
          <motion.h1
            variants={item}
            className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Professional Carpet &amp; Upholstery Cleaning
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-xl text-lg text-white/85 sm:text-xl"
          >
            Serving customers across selected areas of Scotland and England,
            including surrounding areas.
          </motion.p>
          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-teal/20 transition-colors hover:bg-brand-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get a Quote
              </Link>
            </MagneticButton>
            <MagneticButton>
              <WhatsAppButton size="lg" />
            </MagneticButton>
          </motion.div>
          <motion.p variants={item} className="text-sm text-white/70">
            Minimum call-out: £{business.minimumCallOut}
          </motion.p>
        </motion.div>

        {/* Breakout photo card — deliberately overlaps into the next
            section for depth, rather than sitting flush inside the
            hero like a flat banner. */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto mt-12 w-full max-w-4xl -mb-24 sm:-mb-32"
        >
          <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/images/carpet/clean-carpet-living-room.jpg"
                alt="Bright living room with a freshly cleaned carpet"
                fill
                priority
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
