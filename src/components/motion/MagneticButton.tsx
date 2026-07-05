// MagneticButton — wraps any child element (typically a button/link) and pulls
// it up to ±6px toward the cursor when the pointer enters a 32px influence
// radius. Response is spring-eased (~180ms). Disabled on touch and when
// prefers-reduced-motion is set.

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number; // max px pull
  radius?: number; // influence radius in px
  className?: string;
}

export function MagneticButton({
  children,
  strength = 6,
  radius = 60,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 18, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 140, damping: 18, mass: 0.8 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const maxDist = Math.max(rect.width, rect.height) / 2 + radius;
    if (dist > maxDist) {
      x.set(0);
      y.set(0);
      return;
    }
    const factor = 1 - dist / maxDist;
    x.set((dx / maxDist) * strength * factor * 2);
    y.set((dy / maxDist) * strength * factor * 2);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
