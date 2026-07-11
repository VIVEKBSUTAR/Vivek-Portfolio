import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { research } from "@/data/research";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { AmbientEnvironment } from "@/components/motion/AmbientEnvironment";

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

export function ResearchStudy() {
  const { slug } = useParams<{ slug: string }>();
  const entry = research.find((r) => r.slug === slug);

  if (!entry) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg text-fg">
        <div className="text-center">
          <div className="eyebrow mb-4">Not found</div>
          <h1 className="font-display text-3xl">This research entry doesn't exist.</h1>
          <Link to="/#research" className="mt-6 inline-block text-accent underline">Back home</Link>
        </div>
      </div>
    );
  }

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
            to="/#research"
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
          <h1 className="font-display text-4xl tracking-tight text-fg md:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-4 text-sm text-fg-muted">
            Focus: {entry.focus}
          </p>
        </motion.header>

        <motion.section variants={childVariants} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
          <div className="eyebrow">Abstract</div>
          <p className="text-base leading-relaxed text-fg-muted">{entry.abstract}</p>
        </motion.section>

        {entry.keyInsights && (
          <motion.section variants={childVariants} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
            <div className="eyebrow">Key Insights</div>
            <ul className="space-y-4 text-base leading-relaxed text-fg-muted">
              {entry.keyInsights.map((insight, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="font-mono text-accent">0{idx + 1}.</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {entry.experiments && (
          <motion.section variants={childVariants} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
            <div className="eyebrow">Method & Setup</div>
            <div className="space-y-6">
              {entry.experiments.map((exp, idx) => (
                <div key={idx} className="border-l border-border-hairline pl-4">
                  <h3 className="font-display text-lg text-fg">{exp.name}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{exp.setup}</p>
                  {exp.results && (
                    <p className="mt-2 font-mono text-xs text-accent">Result: {exp.results}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {entry.impact && (
          <motion.section variants={childVariants} className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr]">
            <div className="eyebrow">System Impact</div>
            <p className="text-base leading-relaxed text-fg-muted">{entry.impact}</p>
          </motion.section>
        )}
      </motion.article>
      <Footer />
    </div>
  );
}
