import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { research } from "@/data/research";

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
