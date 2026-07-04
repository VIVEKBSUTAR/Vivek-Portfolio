import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { fadeUp } from "@/lib/motion";

// Skill constellation: skills arranged on an outer ring, projects on an inner
// ring. Hovering a skill highlights the projects it powers; hovering a project
// highlights the skills behind it.

export function Skills() {
  const [hover, setHover] = useState<
    { type: "skill"; name: string } | { type: "project"; slug: string } | null
  >(null);

  const size = 640;
  const cx = size / 2;
  const cy = size / 2;
  const rSkills = 280;
  const rProjects = 130;

  const skillPos = useMemo(
    () =>
      skills.map((s, i) => {
        const t = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
        return { ...s, x: cx + Math.cos(t) * rSkills, y: cy + Math.sin(t) * rSkills };
      }),
    []
  );

  const projPos = useMemo(
    () =>
      projects.map((p, i) => {
        const t = (i / projects.length) * Math.PI * 2 - Math.PI / 2;
        return { ...p, x: cx + Math.cos(t) * rProjects, y: cy + Math.sin(t) * rProjects };
      }),
    []
  );

  const isEdgeActive = (skillName: string, projectSlug: string) => {
    if (!hover) return false;
    if (hover.type === "skill") return hover.name === skillName;
    return hover.slug === projectSlug;
  };

  const isSkillActive = (name: string) => {
    if (!hover) return true;
    if (hover.type === "skill") return hover.name === name;
    const proj = skills.find((s) => s.name === name)?.projects ?? [];
    return proj.includes(hover.slug);
  };

  const isProjectActive = (slug: string) => {
    if (!hover) return true;
    if (hover.type === "project") return hover.slug === slug;
    const s = skills.find((sk) => sk.name === hover.name);
    return s?.projects.includes(slug) ?? false;
  };

  return (
    <section id="skills" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-16 flex items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-3">04 / Skills</div>
            <h2 className="font-display text-4xl tracking-tight text-fg md:text-5xl">
              Connected to the work.
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-fg-muted md:block">
            Hover a skill to see which projects prove it. Hover a project to see
            the skills behind it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
          <motion.div {...fadeUp} className="relative aspect-square w-full max-w-[640px] mx-auto">
            <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
              {/* rings */}
              <circle cx={cx} cy={cy} r={rSkills} fill="none" stroke="var(--border-hairline)" strokeDasharray="2 4" />
              <circle cx={cx} cy={cy} r={rProjects} fill="none" stroke="var(--border-hairline)" strokeDasharray="2 4" />

              {/* edges */}
              {skillPos.map((s) =>
                s.projects.map((slug) => {
                  const p = projPos.find((x) => x.slug === slug);
                  if (!p) return null;
                  const active = isEdgeActive(s.name, slug);
                  return (
                    <line
                      key={`${s.name}-${slug}`}
                      x1={s.x}
                      y1={s.y}
                      x2={p.x}
                      y2={p.y}
                      stroke={active ? "var(--accent)" : "var(--border-hairline)"}
                      strokeWidth={active ? 1.2 : 0.6}
                      opacity={hover && !active ? 0.15 : 1}
                      style={{ transition: "all 300ms" }}
                    />
                  );
                })
              )}

              {/* project nodes */}
              {projPos.map((p) => {
                const active = isProjectActive(p.slug);
                return (
                  <g
                    key={p.slug}
                    onMouseEnter={() => setHover({ type: "project", slug: p.slug })}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer", transition: "opacity 300ms", opacity: active ? 1 : 0.3 }}
                  >
                    <circle cx={p.x} cy={p.y} r={6} fill="var(--accent)" />
                    <circle cx={p.x} cy={p.y} r={12} fill="var(--accent)" opacity={0.15} />
                  </g>
                );
              })}

              {/* skill labels */}
              {skillPos.map((s) => {
                const active = isSkillActive(s.name);
                const anchor = s.x < cx - 20 ? "end" : s.x > cx + 20 ? "start" : "middle";
                return (
                  <g
                    key={s.name}
                    onMouseEnter={() => setHover({ type: "skill", name: s.name })}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer", transition: "opacity 300ms", opacity: active ? 1 : 0.25 }}
                  >
                    <circle cx={s.x} cy={s.y} r={3} fill="var(--fg)" />
                    <text
                      x={s.x + (anchor === "end" ? -10 : anchor === "start" ? 10 : 0)}
                      y={s.y + 4}
                      textAnchor={anchor}
                      fill="var(--fg)"
                      style={{ font: "500 12px var(--font-sans)" }}
                    >
                      {s.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>

          <motion.div {...fadeUp} className="space-y-6">
            {(["modeling", "systems", "product", "research"] as const).map((g) => (
              <div key={g}>
                <div className="eyebrow mb-2">{g}</div>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.group === g)
                    .map((s) => (
                      <button
                        key={s.name}
                        onMouseEnter={() => setHover({ type: "skill", name: s.name })}
                        onMouseLeave={() => setHover(null)}
                        className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                          isSkillActive(s.name)
                            ? "border-accent/40 bg-accent/10 text-fg"
                            : "border-border-hairline text-fg-subtle"
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
