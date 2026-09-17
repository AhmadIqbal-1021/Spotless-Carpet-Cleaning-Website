"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

/**
 * Subtle "magnetic" hover — the button drifts a few pixels toward the
 * cursor, then springs back on leave. Kept small (±8px) so it reads
 * as tactile polish rather than a gimmick, and it only engages on
 * devices with a precise pointer (fine hover), so touch/mobile is
 * untouched.
 */
export function MagneticButton({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);
    x.set(offsetX * 0.25);
    y.set(offsetY * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}
