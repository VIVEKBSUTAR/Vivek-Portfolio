import { useEffect, useState } from "react";

// Single source of truth for `prefers-reduced-motion`. Ambient systems,
// magnetic pulls, and shared-element morphs all consult this — a `true`
// value collapses them to instant opacity fades.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
