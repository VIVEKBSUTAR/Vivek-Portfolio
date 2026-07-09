import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { HeroAtmosphere } from "@/components/HeroAtmosphere";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { easeOutSoft } from "@/lib/motion";

const LazyHeroScene = lazy(() =>
  import("@/components/3d/HeroScene").then((m) => ({ default: m.HeroScene }))
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <HeroAtmosphere />
      {inView && (
        <Suspense fallback={null}>
          <LazyHeroScene />
        </Suspense>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutSoft }}
            className="eyebrow mb-8 flex items-center gap-3"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{profile.currently}</span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,7vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.03em] text-fg">
            {profile.name}.
            <br />
            <span className="text-fg-muted">{profile.role}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: easeOutSoft }}
            className="mt-8 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg"
          >
            {profile.positioning}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: easeOutSoft }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton strength={8} radius={80}>
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 overflow-visible rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-fg shadow-elevated transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {/* Idle nudge halo — soft pulse every ~5s to invite interaction */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full group-hover:opacity-0"
                  style={{
                    boxShadow:
                      "0 0 0 6px color-mix(in oklch, var(--accent) 20%, transparent)",
                    animation: "pulse-soft 5s ease-in-out 2.5s infinite",
                    transition: "opacity 240ms ease",
                  }}
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  See selected work
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </span>
              </a>
            </MagneticButton>
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 rounded-full border border-border-hairline px-5 py-3 text-sm text-fg transition-colors hover:bg-surface"
            >
              Resume
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Right column — quiet stat rail */}
        <motion.dl
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: easeOutSoft }}
          className="grid grid-cols-2 gap-6 border-t border-border-hairline pt-8 md:mb-4 md:border-l md:border-t-0 md:pl-8 md:pt-0"
        >
          {[
            { k: "Focus", v: profile.focus[0] },
            { k: "Based", v: profile.location },
            { k: "Since", v: profile.since },
            { k: "Ships", v: profile.ships },
          ].map((s) => (
            <div key={s.k}>
              <dt className="eyebrow">{s.k}</dt>
              <dd className="mt-2 font-display text-lg text-fg">{s.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-fg-subtle">
        <div className="flex flex-col items-center gap-2">
          <span className="eyebrow">Scroll</span>
          <span className="block h-8 w-px animate-pulse bg-fg-subtle/50" />
        </div>
      </div>
    </section>
  );
}
