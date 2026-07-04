import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { experience } from "@/data/experience";
import { fadeUp } from "@/lib/motion";

export function Experience() {
  const [open, setOpen] = useState<string | null>(experience[0]?.company ?? null);

  return (
    <section id="experience" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-16">
          <div className="eyebrow mb-3">05 / Experience</div>
          <h2 className="font-display text-4xl tracking-tight text-fg md:text-5xl">
            The path so far.
          </h2>
        </motion.div>

        <div className="border-t border-border-hairline">
          {experience.map((role, i) => {
            const isOpen = open === role.company;
            return (
              <motion.div
                key={role.company}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-border-hairline"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : role.company)}
                  className="grid w-full grid-cols-[80px_1fr_auto] items-center gap-4 py-8 text-left md:grid-cols-[120px_1fr_1fr_auto]"
                >
                  <span className="font-mono text-xs text-fg-subtle">{role.period}</span>
                  <div>
                    <div className="font-display text-xl text-fg md:text-2xl">
                      {role.company}
                    </div>
                    <div className="mt-1 text-sm text-fg-muted">{role.title}</div>
                  </div>
                  <span className="hidden text-sm text-fg-subtle md:block">
                    {role.location}
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-border-hairline text-fg-muted">
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-[120px_1fr_1fr] md:pl-0">
                        <div />
                        <ul className="space-y-2 text-sm text-fg-muted md:col-span-2">
                          {role.outcomes.map((o) => (
                            <li key={o} className="flex gap-3">
                              <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
                              <span>{o}</span>
                            </li>
                          ))}
                        </ul>
                        {role.stack && (
                          <>
                            <div className="hidden md:block" />
                            <div className="flex flex-wrap gap-2 md:col-span-2">
                              {role.stack.map((s) => (
                                <span
                                  key={s}
                                  className="rounded-full border border-border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-fg-subtle"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
