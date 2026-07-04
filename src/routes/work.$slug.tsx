import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { projects, type Project } from "@/data/projects";
import { TopBar } from "@/components/nav/TopBar";
import { Footer } from "@/components/nav/Footer";
import { AmbientEnvironment } from "@/components/motion/AmbientEnvironment";
import { writeMemory, MEMORY_KEYS } from "@/lib/memory";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Vivek` },
          { name: "description", content: loaderData.project.summary },
          { property: "og:title", content: `${loaderData.project.title} — Vivek` },
          { property: "og:description", content: loaderData.project.summary },
        ]
      : [{ title: "Unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: CaseView,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-bg text-fg">
      <div className="text-center">
        <div className="eyebrow mb-4">Not found</div>
        <h1 className="font-display text-3xl">This project doesn't exist.</h1>
        <Link to="/" className="mt-6 inline-block text-accent underline">Back home</Link>
      </div>
    </div>
  ),
});

function CaseView() {
  const { project } = Route.useLoaderData() as { project: Project };
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  // Living Memory — remember the last opened project so the grid greets it back.
  useEffect(() => {
    writeMemory(MEMORY_KEYS.lastProject, { slug: project.slug, ts: Date.now() });
  }, [project.slug]);



  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <AmbientEnvironment />
      <TopBar />
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl px-6 pt-32 pb-24"
      >
        <Link
          to="/"
          hash="work"
          className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" /> Back to work
        </Link>

        <header className="mt-10">
          <div className="eyebrow mb-4 flex gap-4">
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.stack.slice(0, 3).join(" · ")}</span>
          </div>
          <h1 className="font-display text-5xl tracking-tight text-fg md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-fg-muted">{project.role}</p>
        </header>

        <div
          className="mt-12 h-72 overflow-hidden rounded-2xl border border-border-hairline grain md:h-96"
          style={{
            background:
              "linear-gradient(140deg, oklch(0.32 0.06 60), oklch(0.22 0.02 60) 55%, oklch(0.55 0.14 55) 130%)",
          }}
        />

        <section className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
          <div className="eyebrow">Overview</div>
          <p className="text-lg leading-relaxed text-fg-muted">{project.summary}</p>
        </section>

        {project.problem && (
          <section className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
            <div className="eyebrow">Problem</div>
            <p className="text-lg leading-relaxed text-fg-muted">{project.problem}</p>
          </section>
        )}

        {project.approach && (
          <section className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
            <div className="eyebrow">Approach</div>
            <p className="text-lg leading-relaxed text-fg-muted">{project.approach}</p>
          </section>
        )}

        {project.results && (
          <section className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
            <div className="eyebrow">Results</div>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {project.results.map((r) => (
                <div key={r.label} className="rounded-2xl border border-border-hairline bg-surface p-5">
                  <dt className="eyebrow">{r.label}</dt>
                  <dd className="mt-2 font-display text-3xl text-accent">{r.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
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
        </section>

        {project.links && (
          <section className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[180px_1fr]">
            <div className="eyebrow">Links</div>
            <div className="flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border-hairline px-4 py-2 text-sm text-fg transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </section>
        )}

        <div className="mt-24 border-t border-border-hairline pt-8">
          <div className="eyebrow mb-3">Next</div>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group flex items-center justify-between"
          >
            <span className="font-display text-3xl tracking-tight text-fg transition-colors group-hover:text-accent">
              {next.title}
            </span>
            <ArrowUpRight className="h-6 w-6 text-fg-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.article>
      <Footer />
    </div>
  );
}
