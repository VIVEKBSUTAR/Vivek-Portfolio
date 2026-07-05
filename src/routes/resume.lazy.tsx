import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";

export const Route = createLazyFileRoute("/resume")({
  component: Resume,
});

function Resume() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <div className="flex items-center justify-between print:hidden">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-border-hairline px-4 py-2 text-sm text-fg hover:border-accent/40"
          >
            <Download className="h-4 w-4" /> Print / save PDF
          </button>
        </div>

        <header className="mt-12 border-b border-border-hairline pb-8">
          <h1 className="font-display text-4xl tracking-tight">{profile.name}</h1>
          <p className="mt-2 text-fg-muted">{profile.role}</p>
          <p className="mt-4 max-w-xl text-sm text-fg-muted">{profile.positioning}</p>
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-fg-subtle">
            <span>{profile.location}</span>
            <span>·</span>
            <span>{profile.email}</span>
            {profile.socials.slice(0, 2).map((s) => (
              <span key={s.label}>· {s.label}</span>
            ))}
          </div>
        </header>

        <section className="mt-12">
          <div className="eyebrow mb-6">Experience</div>
          {experience.map((r) => (
            <div key={r.company} className="mb-8">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-display text-xl">{r.company}</h3>
                  <p className="text-sm text-fg-muted">{r.title} · {r.location}</p>
                </div>
                <span className="font-mono text-xs text-fg-subtle">{r.period}</span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-fg-muted">
                {r.outcomes.map((o) => <li key={o}>— {o}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <div className="eyebrow mb-4">Skills</div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s.name} className="rounded-full border border-border-hairline px-3 py-1 text-xs text-fg-muted">
                {s.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
