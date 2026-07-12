import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { research } from "@/data/research";
import { fadeUp } from "@/lib/motion";

export function Research() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  return (
    <section id="research" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-16">
          <div className="eyebrow mb-3">03 / Research</div>
          <h2 className="font-display text-4xl tracking-tight text-fg md:text-5xl">
            Engineering explorations behind the products.
          </h2>
        </motion.div>

        <ul data-dim-siblings className="border-t border-border-hairline">
          {research.map((r, i) => (
            <motion.li
              key={r.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              data-dim-item
              className="group border-b border-border-hairline"
            >
              <a
                href={`#research/${r.slug}`}
                data-hover-light
                onPointerMove={(e) => {
                  if (isTouchDevice) return;
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--hx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--hy", `${e.clientY - r.top}px`);
                }}
                className="relative grid grid-cols-[auto_1fr_auto] items-baseline gap-4 rounded-lg px-3 py-8 transition-colors md:grid-cols-[80px_1fr_120px_auto]"
              >
                <span className="relative z-[2] font-mono text-xs text-fg-subtle">{r.year}</span>
                <div className="relative z-[2]">
                  <h3 className="font-display text-xl text-fg transition-colors group-hover:text-accent md:text-2xl">
                    {r.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-32 md:mt-3">
                    {r.abstract}
                  </p>
                </div>
                <span className="relative z-[2] hidden text-sm text-fg-subtle md:block">{r.venue}</span>
                <ArrowUpRight className="relative z-[2] h-4 w-4 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
