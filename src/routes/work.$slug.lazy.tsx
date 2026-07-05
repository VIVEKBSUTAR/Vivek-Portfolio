import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, lazy, Suspense } from "react";
import { projects, type Project } from "@/data/projects";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { AmbientEnvironment } from "@/components/motion/AmbientEnvironment";
import { writeMemory, MEMORY_KEYS } from "@/lib/memory";

const LazyProjectBlueprint = lazy(() =>
  import("@/components/ui/ProjectBlueprint").then((m) => ({ default: m.ProjectBlueprint }))
);

const covers: Record<string, string> = {
  atlas: "linear-gradient(140deg, oklch(0.32 0.06 60), oklch(0.22 0.02 60) 55%, oklch(0.5 0.14 55) 130%)",
  compendium: "linear-gradient(140deg, oklch(0.3 0.04 240), oklch(0.2 0.02 60) 60%, oklch(0.6 0.1 55) 130%)",
  evalkit: "linear-gradient(140deg, oklch(0.28 0.03 140), oklch(0.2 0.02 60) 60%, oklch(0.55 0.12 60) 130%)",
  sightline: "linear-gradient(140deg, oklch(0.24 0.02 30), oklch(0.18 0.01 60) 55%, oklch(0.58 0.15 40) 130%)",
  polyphony: "linear-gradient(140deg, oklch(0.28 0.04 290), oklch(0.2 0.02 60) 55%, oklch(0.6 0.12 55) 130%)",
  cadence: "linear-gradient(140deg, oklch(0.3 0.05 180), oklch(0.2 0.02 60) 55%, oklch(0.6 0.13 55) 130%)",
};

export const Route = createLazyFileRoute("/work/$slug")({
  component: CaseView,
});

const parentVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const metricCardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function CaseView() {
  const { project } = Route.useLoaderData() as { project: Project };
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  useEffect(() => {
    writeMemory(MEMORY_KEYS.lastProject, { slug: project.slug, ts: Date.now() });
  }, [project.slug]);

  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <AmbientEnvironment />
      <TopBar />
      <motion.article
        variants={parentVariants}
        initial="hidden"
        animate="show"
        style={{
          viewTransitionName: `project-card-${project.slug}`,
        }}
        className="mx-auto max-w-4xl px-6 pt-32 pb-24"
      >
        <motion.div variants={childVariants}>
          <Link
            to="/"
            hash="work"
            viewTransition
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" /> Back to work
          </Link>
        </motion.div>

        <motion.header variants={childVariants} className="mt-10">
          <div className="eyebrow mb-4 flex gap-4">
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.stack.slice(0, 3).join(" · ")}</span>
          </div>
          <h1
            className="font-display text-5xl tracking-tight text-fg md:text-6xl"
            style={{
              viewTransitionName: `project-title-${project.slug}`,
            }}
          >
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-fg-muted">{project.role}</p>
        </motion.header>

        <motion.div
          variants={childVariants}
          className="mt-12 h-72 overflow-hidden rounded-2xl border border-border-hairline grain md:h-96 relative blueprint-grid shadow-glass"
          style={{
            background: covers[project.cover] ?? covers.atlas,
            viewTransitionName: `project-cover-${project.slug}`,
          }}
        >
          <Suspense fallback={<div className="absolute inset-0 w-full h-full bg-border-hairline/5" />}>
            <LazyProjectBlueprint slug={project.slug} />
          </Suspense>
        </motion.div>

        <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
          <div className="eyebrow">Overview</div>
          <p className="text-lg leading-relaxed text-fg-muted">{project.summary}</p>
        </motion.section>

        {project.problem && (
          <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
            <div className="eyebrow">Problem</div>
            <p className="text-lg leading-relaxed text-fg-muted">{project.problem}</p>
          </motion.section>
        )}

        {project.approach && (
          <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
            <div className="eyebrow">Approach</div>
            <p className="text-lg leading-relaxed text-fg-muted">{project.approach}</p>
          </motion.section>
        )}

        {project.results && (
          <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
            <div className="eyebrow">Results</div>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {project.results.map((r) => (
                <motion.div
                  key={r.label}
                  variants={metricCardVariants}
                  className="rounded-2xl border border-border-hairline bg-surface p-5 shadow-glass"
                >
                  <dt className="eyebrow">{r.label}</dt>
                  <dd className="mt-2 font-display text-3xl text-accent">{r.value}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.section>
        )}

        <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
          <div className="eyebrow">Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border-hairline px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-fg-subtle"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.section>

        {project.links && (
          <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
            <div className="eyebrow">Links</div>
            <div className="flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border-hairline px-4 py-2 text-sm text-fg transition-all hover:border-accent/40 hover:text-accent active-compress"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </motion.section>
        )}

        <motion.div variants={childVariants} className="mt-24 border-t border-border-hairline pt-8">
          <div className="eyebrow mb-3">Next</div>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            viewTransition
            className="group flex items-center justify-between active-compress"
          >
            <span className="font-display text-3xl tracking-tight text-fg transition-colors group-hover:text-accent">
              {next.title}
            </span>
            <ArrowUpRight className="h-6 w-6 text-fg-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.article>
      <Footer />
    </div>
  );
}
