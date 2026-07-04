// A CSS-only atmospheric layer: a slow-drifting warm-amber glow disc, a second
// cool-cyan disc for tension, plus a soft radial vignette. Fills the "3D
// atmosphere" role at zero JS cost; the real Three.js scene can replace it
// later without touching layout.

export function HeroAtmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Warm anchor light — off-center right, slow breathing */}
      <div
        className="absolute right-[-8%] top-[8%] h-[62vh] w-[62vh] rounded-full opacity-[0.55]"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.78 0.15 65 / 0.55), oklch(0.78 0.15 65 / 0) 70%)",
          filter: "blur(20px)",
          animation: "drift 18s ease-in-out infinite",
        }}
      />
      {/* Cool depth disc — bottom-left */}
      <div
        className="absolute bottom-[-15%] left-[-10%] h-[70vh] w-[70vh] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.65 0.08 210 / 0.35), oklch(0.65 0.08 210 / 0) 70%)",
          filter: "blur(24px)",
          animation: "drift-slow 26s ease-in-out infinite",
        }}
      />
      {/* Fine hairline horizon */}
      <div className="absolute inset-x-0 top-[68%] h-px bg-gradient-to-r from-transparent via-border-hairline to-transparent" />
      {/* Vignette to protect text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 40%, transparent 0%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}
