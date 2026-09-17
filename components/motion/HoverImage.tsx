"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

const TILT_DEGREES = 10;
const SPRING = { stiffness: 220, damping: 20, mass: 0.5 };

/**
 * Wraps a photo so it responds to the cursor like a physical object:
 * a 3D perspective tilt that follows the pointer, a slight zoom, and
 * a soft diagonal light sweep. Must sit inside a
 * `position: relative; overflow: hidden` container (the existing
 * aspect-ratio box around each `next/image`), which stays a plain
 * server-rendered div — only this leaf needs to be a client
 * component. The tilt only engages for mouse pointers, so touch
 * devices just get the zoom + shine.
 */
export function HoverImage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    rotateY.set((px - 0.5) * TILT_DEGREES * 2);
    rotateX.set((0.5 - py) * TILT_DEGREES * 2);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className={`relative h-full w-full ${className}`}
      style={{ perspective: 700 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        className="h-full w-full"
        style={{ rotateX: springRotateX, rotateY: springRotateY }}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        variants={{
          rest: { x: "-140%", opacity: 0 },
          hover: { x: "340%", opacity: 1 },
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
