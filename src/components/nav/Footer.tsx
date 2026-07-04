import { useState } from "react";
import { profile } from "@/data/profile";
import { resetMemory } from "@/lib/memory";

export function Footer() {
  const [reset, setReset] = useState(false);

  const onReset = () => {
    resetMemory();
    setReset(true);
    // Brief acknowledgement, then revert.
    setTimeout(() => setReset(false), 1600);
  };

  return (
    <footer className="hairline-b border-t border-border-hairline pt-16 pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-display text-2xl tracking-tight text-fg">{profile.name}</div>
          <p className="mt-2 max-w-sm text-sm text-fg-muted">
            Built with care. Space Grotesk, Inter, JetBrains Mono. No template.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} className="transition-colors hover:text-fg">
              {s.label}
            </a>
          ))}
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-fg">
            Email
          </a>
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-2 text-xs text-fg-subtle sm:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4 font-mono uppercase tracking-widest">
            <button
              type="button"
              onClick={onReset}
              className="transition-colors hover:text-fg focus-visible:text-fg"
              aria-label="Reset saved site preferences"
            >
              {reset ? "Cleared" : "Reset preferences"}
            </button>
            <span aria-hidden>·</span>
            <span>
              v1.0 · updated {new Date().toLocaleDateString(undefined, { month: "short", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
