import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { research } from "@/data/research";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { AmbientEnvironment } from "@/components/motion/AmbientEnvironment";

export const Route = createFileRoute("/research/$slug")({
  loader: ({ params }) => {
    const entry = research.find((r) => r.slug === params.slug);
    if (!entry) throw notFound();
    return { entry };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.entry.title} — Vivek` },
          { name: "description", content: loaderData.entry.abstract },
        ]
      : [{ title: "Unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: ResearchView,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-bg text-fg">
      <div className="text-center">
        <div className="eyebrow mb-4">Not found</div>
        <h1 className="font-display text-3xl">This entry doesn't exist.</h1>
        <Link to="/" className="mt-6 inline-block text-accent underline">Back home</Link>
      </div>
    </div>
  ),
});

function ResearchView() {
  const { entry } = Route.useLoaderData();
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
