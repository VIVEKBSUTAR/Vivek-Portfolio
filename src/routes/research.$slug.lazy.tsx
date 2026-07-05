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

function ResearchView() {
  const { entry } = Route.useLoaderData() as { entry: ResearchEntry };
  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <AmbientEnvironment />
      <TopBar />
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl px-6 pt-32 pb-24"
      >
        <Link
          to="/"
          hash="research"
          className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" /> Back to research
        </Link>

        <header className="mt-10">
          <div className="eyebrow mb-4 flex gap-4">
            <span>{entry.year}</span>
            <span>·</span>
            <span>{entry.venue}</span>
          </div>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-fg md:text-5xl">
            {entry.title}
          </h1>
        </header>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-fg-muted">
          <p className="text-xl text-fg">{entry.abstract}</p>
          <p>
            Full write-up coming soon. This surface is designed for long-form
            research notes, methodology, figures, and references. Content will be
            added as work is published.
          </p>
        </div>
      </motion.article>
      <Footer />
    </div>
  );
}
