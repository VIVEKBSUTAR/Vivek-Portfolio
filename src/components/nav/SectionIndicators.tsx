import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function SectionIndicators() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-hidden
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group relative flex items-center justify-end gap-2"
          >
            <span
              className={`pointer-events-none rounded-full bg-surface-raised px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-fg-muted opacity-0 transition-opacity group-hover:opacity-100 ${
                isActive ? "opacity-100 text-fg" : ""
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block h-[6px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? "w-6 bg-accent"
                  : "w-[6px] bg-fg-subtle/50 group-hover:bg-fg"
              }`}
            />
          </a>
        );
      })}
    </aside>
  );
}
