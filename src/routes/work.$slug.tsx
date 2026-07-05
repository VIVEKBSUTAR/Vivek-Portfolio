import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects } from "@/data/projects";

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
