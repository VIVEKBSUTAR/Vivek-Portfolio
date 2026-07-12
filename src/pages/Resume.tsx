import { ArrowLeft, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";

export function Resume() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <div className="flex items-center justify-between print:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg">
            <ArrowLeft className="h-4 w-4" /> Back
          </a>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-border-hairline px-4 py-2 text-sm text-fg-muted hover:text-fg hover:border-accent/40 transition-colors"
            >
              Print Page
            </button>
            <a
              href="Vivek_Sutar_Resume.pdf"
              download="Vivek_Sutar_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:bg-accent/90 transition-colors"
            >
              <Download className="h-4 w-4" /> Download PDF
            </a>
          </div>
        </div>

        <header className="mt-12 border-b border-border-hairline pb-8">
          <h1 className="font-display text-4xl tracking-tight">{profile.name}</h1>
          <p className="mt-2 text-fg-muted">{profile.role}</p>
          <p className="mt-4 max-w-xl text-sm text-fg-muted">{profile.positioning}</p>
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-fg-subtle">
            <span>{profile.location}</span>
            <span>·</span>
            <span>{profile.email}</span>
            {profile.socials.map((s) => (
              <span key={s.label}>
                · <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent underline decoration-border-hairline underline-offset-4">{s.label}</a>
              </span>
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
