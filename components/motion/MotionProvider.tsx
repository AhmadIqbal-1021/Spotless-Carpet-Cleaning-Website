"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-wide Framer Motion configuration. `reducedMotion="user"` makes
 * every animation in the tree automatically respect the visitor's OS
 * `prefers-reduced-motion` setting (durations collapse to ~0) without
 * having to guard each animation individually.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
