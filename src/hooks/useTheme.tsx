import { useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    if (typeof document === "undefined") return;
    const initial = (localStorage.getItem("theme") as Theme | null) ?? "dark";
    apply(initial);
    setTheme(initial);
  }, []);

  const apply = (t: Theme) => {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(t);
  };

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem("theme", next); } catch {}
      return next;
    });
  }, []);

  return { theme, toggle };
}
