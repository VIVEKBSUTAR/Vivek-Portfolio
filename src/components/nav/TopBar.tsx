import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
];

export function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? "w-[min(680px,calc(100vw-2rem))]" : "w-[min(880px,calc(100vw-2rem))]"
      }`}
    >
      <nav className="glass flex items-center justify-between rounded-full px-3 py-2 shadow-glass">
        <a
          href="#"
          className="ml-2 flex items-center gap-2 font-display text-sm font-semibold tracking-tight text-fg active-compress"
        >
          <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-accent-fg font-bold text-[11px]">
            V
          </span>
          <span className="hidden sm:inline">Vivek</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:text-fg active-compress"
              >
                <span>{l.label}</span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-accent/70 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-fg transition-all hover:scale-[1.02] active-compress"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
