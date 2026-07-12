// useAmbientMode — reads three signals (scroll velocity, idle time, route
// depth) and returns one of "active" | "focused" | "resting". Consumers
// mirror the value onto CSS custom properties so the ambient layer can
// cross-fade its intensity without JS keyframes.

import { useEffect, useState } from "react";

export type AmbientMode = "active" | "focused" | "resting";

const FAST_SCROLL_PX_PER_S = 1400;
const IDLE_MS = 30_000;

// Routes that force "focused" (reading views).
const FOCUSED_ROUTE_PREFIXES = ["#work/", "#research/", "#resume"];

export function useAmbientMode(): AmbientMode {
  const [mode, setMode] = useState<AmbientMode>("active");
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Route-driven mode takes precedence.
  const routeForcedFocus = FOCUSED_ROUTE_PREFIXES.some((p) =>
    hash.startsWith(p)
  );

  useEffect(() => {
    if (routeForcedFocus) {
      setMode("focused");
      return;
    }

    // Skip all dynamic activity tracking on mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setMode("active");
      return;
    }

    let lastY = window.scrollY;
    let lastTime = performance.now();
    let idleTimer: any = null;

    const resetIdle = () => {
      setMode("active");
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setMode("resting");
      }, IDLE_MS);
    };

    const handleScroll = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      const dy = Math.abs(window.scrollY - lastY);

      if (dt > 0.05) {
        const vel = dy / dt;
        if (vel > FAST_SCROLL_PX_PER_S) {
          resetIdle();
        }
        lastY = window.scrollY;
        lastTime = now;
      }
    };

    const handleMove = () => {
      resetIdle();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchstart", handleMove, { passive: true });

    // Initial trigger
    resetIdle();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchstart", handleMove);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [routeForcedFocus]);

  return mode;
}
