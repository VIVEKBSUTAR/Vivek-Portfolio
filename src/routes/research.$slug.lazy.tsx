import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { research, type ResearchEntry } from "@/data/research";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { AmbientEnvironment } from "@/components/motion/AmbientEnvironment";

export const Route = createLazyFileRoute("/research/$slug")({
  component: ResearchView,
});

const parentVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function ResearchView() {
  const { entry } = Route.useLoaderData() as { entry: ResearchEntry };

  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <AmbientEnvironment />
      <TopBar />
      <motion.article
        variants={parentVariants}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-4xl px-6 pt-32 pb-24"
      >
        <motion.div variants={childVariants}>
          <Link
            to="/"
            hash="research"
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" /> Back to research
          </Link>
        </motion.div>

        <motion.header variants={childVariants} className="mt-10 border-b border-border-hairline pb-10">
          <div className="eyebrow mb-4 flex gap-4">
            <span>{entry.year}</span>
            <span>·</span>
            <span>{entry.venue}</span>
          </div>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-fg md:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-fg font-normal">
            {entry.abstract}
          </p>
        </motion.header>

        {/* Overview */}
        <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
          <div className="eyebrow">Overview</div>
          <p className="text-lg leading-relaxed text-fg-muted">{entry.overview}</p>
        </motion.section>

        {/* Objectives */}
        <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
          <div className="eyebrow">Objectives</div>
          <ul className="space-y-4 text-lg leading-relaxed text-fg-muted">
            {entry.objectives.map((o) => (
              <li key={o} className="flex gap-3">
                <span className="text-accent/60 font-mono select-none">—</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Technical Challenges */}
        <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
          <div className="eyebrow">Challenges</div>
          <ul className="space-y-4 text-lg leading-relaxed text-fg-muted">
            {entry.challenges.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="text-accent/60 font-mono select-none">—</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Architecture / Methodology */}
        <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
          <div className="eyebrow">Methodology</div>
          <p className="text-lg leading-relaxed text-fg-muted">{entry.methodology}</p>
        </motion.section>

        {/* Technologies Explored */}
        <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
          <div className="eyebrow">Technologies</div>
          <div className="flex flex-wrap gap-2">
            {entry.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border-hairline px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-fg-subtle"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Key Learnings */}
        <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
          <div className="eyebrow">Key Learnings</div>
          <ul className="space-y-4 text-lg leading-relaxed text-fg-muted">
            {entry.learnings.map((l) => (
              <li key={l} className="flex gap-3">
                <span className="text-accent/60 font-mono select-none">—</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Future Improvements */}
        <motion.section variants={childVariants} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
          <div className="eyebrow">Future Scope</div>
          <ul className="space-y-4 text-lg leading-relaxed text-fg-muted">
            {entry.improvements.map((imp) => (
              <li key={imp} className="flex gap-3">
                <span className="text-accent/60 font-mono select-none">—</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </motion.article>
      <Footer />
    </div>
  );
}
