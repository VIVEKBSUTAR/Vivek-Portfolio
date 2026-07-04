// Reveal — a scroll-triggered fade+lift wrapper. Elements begin their entrance
// when their top crosses 85% viewport and complete by 60%, per the motion
// choreography spec. Collapses to instant opacity when reduced-motion is set.

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}

export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{
        duration: reduced ? 0.15 : 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: reduced ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
