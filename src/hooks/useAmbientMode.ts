// useAmbientMode — reads three signals (scroll velocity, idle time, route
// depth) and returns one of "active" | "focused" | "resting". Consumers
// mirror the value onto CSS custom properties so the ambient layer can
// cross-fade its intensity without JS keyframes.

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export type AmbientMode = "active" | "focused" | "resting";

const FAST_SCROLL_PX_PER_S = 1400;
const IDLE_MS = 30_000;

// Routes that force "focused" (reading views).
const FOCUSED_ROUTE_PREFIXES = ["/work/", "/research/", "/resume"];

export function useAmbientMode(): AmbientMode {
  const [mode, setMode] = useState<AmbientMode>("active");
  const { pathname } = useLocation();

  // Route-driven mode takes precedence.
  const routeForcedFocus = FOCUSED_ROUTE_PREFIXES.some((p) =>
    pathname.startsWith(p)
  );

  useEffect(() => {
    if (routeForcedFocus) {
      setMode("focused");
      return;
    }

    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let lastScrollT = performance.now();
    let scrollResetTimer: ReturnType<typeof setTimeout> | null = null;

    const resetIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      // If we're not currently in fast-scroll focused, return to active.
      setMode((m) => (m === "resting" ? "active" : m));
      idleTimer = setTimeout(() => setMode("resting"), IDLE_MS);
    };

    const onScroll = () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastScrollY);
      const dt = now - lastScrollT;
      const velocity = (dy / dt) * 1000; // px/s
      lastScrollY = window.scrollY;
      lastScrollT = now;
      if (velocity > FAST_SCROLL_PX_PER_S) {
        setMode("focused");
        if (scrollResetTimer) clearTimeout(scrollResetTimer);
        scrollResetTimer = setTimeout(() => setMode("active"), 900);
      }
      resetIdle();
    };

    resetIdle();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", resetIdle, { passive: true });
    window.addEventListener("keydown", resetIdle);

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (scrollResetTimer) clearTimeout(scrollResetTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", resetIdle);
      window.removeEventListener("keydown", resetIdle);
    };
  }, [routeForcedFocus]);

  return mode;
}
