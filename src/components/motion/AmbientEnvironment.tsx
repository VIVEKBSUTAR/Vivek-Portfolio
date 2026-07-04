// AmbientEnvironment — a single fixed-position layer that lives behind all
// content. Three concerns:
//   1. Cursor-light: soft radial that lags the pointer (spring, no overshoot).
//   2. Section tint: a slow color wash driven by whichever <section id="…"> is
//      centered in the viewport. Tints the ambient wash only — no text recolor.
//   3. Particulate: ~40 low-alpha motes drifting on CSS keyframes.
// Everything is skipped when `prefers-reduced-motion` is set.

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAmbientMode } from "@/hooks/useAmbientMode";

type Tint = { hue: number; chroma: number; label: string };

// Per-section signature tints (see plan §11). Neutrals only for hero.
const SECTION_TINTS: Record<string, Tint> = {
  hero: { hue: 65, chroma: 0.115, label: "amber" },
  about: { hue: 70, chroma: 0.10, label: "amber-soft" },
  work: { hue: 55, chroma: 0.14, label: "amber-deep" },
  research: { hue: 300, chroma: 0.09, label: "violet" },
  skills: { hue: 145, chroma: 0.07, label: "sage" },
  experience: { hue: 235, chroma: 0.07, label: "muted-blue" },
  contact: { hue: 40, chroma: 0.12, label: "copper" },
};

const DEFAULT_TINT = SECTION_TINTS.hero;

export function AmbientEnvironment() {
  const reduced = useReducedMotion();
  const mode = useAmbientMode();
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0.5, y: 0.4 });
  const currentPos = useRef({ x: 0.5, y: 0.4 });
  const rafRef = useRef<number | null>(null);
  const [tint, setTint] = useState<Tint>(DEFAULT_TINT);
  const [touch, setTouch] = useState(false);

  // Detect touch — cursor-light off entirely on touch devices.
  useEffect(() => {
    if (typeof window === "undefined") return;
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // Cursor-light: lerp toward mouse position at ~60% lag.
  useEffect(() => {
    if (reduced || touch) return;
    const onMove = (e: MouseEvent) => {
      targetPos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.08;
      if (cursorRef.current) {
        cursorRef.current.style.setProperty("--cx", `${currentPos.current.x * 100}%`);
        cursorRef.current.style.setProperty("--cy", `${currentPos.current.y * 100}%`);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, touch]);

  // Section tint: watch which section id crosses viewport center.
  useEffect(() => {
    const ids = Object.keys(SECTION_TINTS);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const next = SECTION_TINTS[visible.target.id];
          if (next) setTint(next);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-25% 0px -25% 0px" }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Static particulate positions — memoized so React never re-lays them out.
  const particles = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        left: `${(i * 137.5) % 100}%`,
        top: `${(i * 91.7) % 100}%`,
        size: 1 + ((i * 13) % 3),
        delay: `${(i % 12) * -1.8}s`,
        duration: `${22 + ((i * 7) % 16)}s`,
        opacity: 0.04 + ((i % 5) * 0.012),
      })),
    []
  );

  const tintColor = `oklch(0.78 ${tint.chroma} ${tint.hue})`;

  // Intensity multiplier per mode — the whole layer's opacity fades against it.
  const intensity = mode === "resting" ? 0.15 : mode === "focused" ? 0.4 : 1;

  return (
    <div
      aria-hidden
      data-ambient-mode={mode}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        // @ts-expect-error custom prop
        "--ambient-tint": tintColor,
        opacity: intensity,
        transition:
          "opacity 700ms cubic-bezier(0.65,0,0.35,1), background 900ms cubic-bezier(0.65,0,0.35,1)",
      }}
    >
      {/* Ambient key light — top-right, slow breathing, tinted by section */}
      <div
        className="absolute right-[-15%] top-[-10%] h-[75vh] w-[75vh] rounded-full"
        style={{
          background: `radial-gradient(closest-side, ${tintColor}, transparent 70%)`,
          opacity: 0.35,
          filter: "blur(40px)",
          animation: reduced ? undefined : "drift 18s ease-in-out infinite",
          transition: "background 900ms cubic-bezier(0.65,0,0.35,1)",
        }}
      />

      {/* Depth-glow — bottom-left, offset loop */}
      <div
        className="absolute bottom-[-20%] left-[-15%] h-[80vh] w-[80vh] rounded-full"
        style={{
          background: `radial-gradient(closest-side, ${tintColor}, transparent 70%)`,
          opacity: 0.22,
          filter: "blur(50px)",
          animation: reduced ? undefined : "drift-slow 26s ease-in-out infinite",
          transition: "background 900ms cubic-bezier(0.65,0,0.35,1)",
        }}
      />

      {/* Particulate motes */}
      {!reduced && (
        <div className="absolute inset-0">
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full bg-fg"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                filter: "blur(0.5px)",
                animation: `mote ${p.duration} ease-in-out ${p.delay} infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Volumetric fog — soft displaced plane, breathes independently */}
      {!reduced && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 30% 70%, color-mix(in oklch, var(--fg) 4%, transparent), transparent 70%), radial-gradient(50% 40% at 75% 30%, color-mix(in oklch, var(--fg) 3%, transparent), transparent 70%)",
            filter: "blur(60px)",
            animation: "drift-slow 22s ease-in-out infinite",
            mixBlendMode: "screen",
          }}
        />
      )}


      {/* Cursor-light — soft radial that lags the pointer */}
      {!reduced && !touch && (
        <div
          ref={cursorRef}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(320px circle at var(--cx, 50%) var(--cy, 40%), color-mix(in oklch, ${tintColor} 9%, transparent), transparent 60%)`,
            transition: "background 900ms cubic-bezier(0.65,0,0.35,1)",
          }}
        />
      )}

      {/* Vignette to protect text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 45%, transparent 0%, color-mix(in oklch, var(--bg) 88%, transparent) 100%)",
        }}
      />
    </div>
  );
}
