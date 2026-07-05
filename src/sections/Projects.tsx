import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { fadeUp } from "@/lib/motion";
import { readMemory, MEMORY_KEYS } from "@/lib/memory";

const covers: Record<string, string> = {
  atlas: "linear-gradient(140deg, oklch(0.32 0.06 60), oklch(0.22 0.02 60) 55%, oklch(0.5 0.14 55) 130%)",
  compendium: "linear-gradient(140deg, oklch(0.3 0.04 240), oklch(0.2 0.02 60) 60%, oklch(0.6 0.1 55) 130%)",
  evalkit: "linear-gradient(140deg, oklch(0.28 0.03 140), oklch(0.2 0.02 60) 60%, oklch(0.55 0.12 60) 130%)",
  sightline: "linear-gradient(140deg, oklch(0.24 0.02 30), oklch(0.18 0.01 60) 55%, oklch(0.58 0.15 40) 130%)",
  polyphony: "linear-gradient(140deg, oklch(0.28 0.04 290), oklch(0.2 0.02 60) 55%, oklch(0.6 0.12 55) 130%)",
  cadence: "linear-gradient(140deg, oklch(0.3 0.05 180), oklch(0.2 0.02 60) 55%, oklch(0.6 0.13 55) 130%)",
};

export function Projects() {
  // Welcome-back rim glow on the previously opened project card.
  const [lastSlug, setLastSlug] = useState<string | null>(null);
  useEffect(() => {
    const stored = readMemory<{ slug: string; ts: number } | null>(
      MEMORY_KEYS.lastProject,
      null
    );
    // Only glow if the last-open was within the last 30 days.
    if (stored && Date.now() - stored.ts < 30 * 24 * 60 * 60 * 1000) {
      setLastSlug(stored.slug);
    }
  }, []);

  return (
    <section id="work" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-16 flex items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-3">02 / Selected work</div>
            <h2 className="font-display text-4xl tracking-tight text-fg md:text-5xl">
              Systems that ship.
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-fg-muted md:block">
            Six projects across research, product, and infrastructure. Every case
            includes architecture, decisions, and results.
          </p>
        </motion.div>

        <div
          data-dim-siblings
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className={i % 3 === 0 ? "md:col-span-2" : ""}
            >
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                viewTransition
                data-hover-light
                data-tilt-card
                data-dim-item
                data-last-project={lastSlug === p.slug ? "" : undefined}
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - r.left) / r.width;
                  const y = (e.clientY - r.top) / r.height;
                  const rx = (y - 0.5) * -12;
                  const ry = (x - 0.5) * 12;
                  
                  e.currentTarget.style.setProperty("--rx", `${rx}deg`);
                  e.currentTarget.style.setProperty("--ry", `${ry}deg`);
                  e.currentTarget.style.setProperty("--hx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--hy", `${e.clientY - r.top}px`);
                }}
                onPointerLeave={(e) => {
                  e.currentTarget.style.setProperty("--rx", "0deg");
                  e.currentTarget.style.setProperty("--ry", "0deg");
                }}
                style={{
                  viewTransitionName: `project-card-${p.slug}`,
                }}
                className="group relative block overflow-hidden rounded-2xl border border-border-hairline bg-surface transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-accent/40 hover:shadow-elevated"
              >
                <div
                  className="relative h-56 overflow-hidden md:h-72"
                  style={{
                    background: covers[p.cover] ?? covers.atlas,
                    viewTransitionName: `project-cover-${p.slug}`,
                  }}
                >
                  <div className="grain absolute inset-0" />
                  {/* Image-only scale: sits on the cover layer, clipped by parent */}
                  <div
                    className="absolute inset-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    style={{ background: covers[p.cover] ?? covers.atlas }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-black/25 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">
                    {p.year}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-white/70">
                        {p.stack.slice(0, 3).join(" · ")}
                      </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-white/80 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </div>
                <div className="relative z-[2] p-6" data-tilt-depth>
                  <h3
                    className="font-display text-2xl tracking-tight text-fg"
                    style={{
                      viewTransitionName: `project-title-${p.slug}`,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-fg-subtle">{p.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                    {p.summary}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
