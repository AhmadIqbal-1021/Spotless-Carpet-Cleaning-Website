"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Stagger delay in seconds — pass `index * 0.08` for grids of cards. */
  delay?: number;
  /** Starting vertical offset in pixels. */
  y?: number;
  as?: "div" | "li";
};

/**
 * Fades + slides content in once it scrolls into view. A thin wrapper
 * around Framer Motion's `whileInView` so section components can stay
 * server components and only this leaf is a client component.
 */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  y = 20,
  as = "div",
}: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
