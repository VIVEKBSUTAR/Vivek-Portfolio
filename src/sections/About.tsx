import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { fadeUp } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex items-baseline justify-between">
          <div className="flex items-center gap-4">
            <span className="eyebrow">01 / About</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.2fr]">
          {/* Portrait treatment (placeholder — swap for real photo) */}
          <motion.div {...fadeUp} className="relative">
            <div
              className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border-hairline grain"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.28 0.02 60), oklch(0.18 0.01 60) 60%, oklch(0.35 0.06 55) 120%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(80% 60% at 30% 20%, oklch(0.78 0.13 65 / 0.35), transparent 70%)",
                }}
              />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-fg-subtle">
                portrait · placeholder
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            {profile.bio.map((p, i) => (
              <p
                key={i}
                className="mb-6 text-lg leading-relaxed text-fg-muted last:mb-0"
              >
                {p}
              </p>
            ))}

            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border-hairline pt-8 sm:grid-cols-4">
              {[
                { k: "Location", v: profile.location },
                { k: "Status", v: profile.currently },
                { k: "Focus", v: profile.focus[0] },
                { k: "Also", v: profile.focus[1] },
              ].map((f) => (
                <div key={f.k}>
                  <dt className="eyebrow">{f.k}</dt>
                  <dd className="mt-2 text-sm text-fg">{f.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
