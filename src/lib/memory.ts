// Namespaced localStorage helpers for the Phase 4 "Living Memory" system.
// All keys live under `vivek.portfolio.*` and are cleared by resetMemory().
// SSR-safe: every function is a no-op when `window` is undefined.

const NS = "vivek.portfolio.";

const isBrowser = () => typeof window !== "undefined" && !!window.localStorage;

export function readMemory<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(NS + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeMemory<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(NS + key, JSON.stringify(value));
  } catch {
    /* quota / private-mode — ignore */
  }
}

export function resetMemory(): void {
  if (!isBrowser()) return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(NS)) keys.push(k);
    }
    keys.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}

export const MEMORY_KEYS = {
  visitCount: "visitCount",
  lastProject: "lastProject",
  readingProgress: "readingProgress",
  motionPreference: "motionPreference",
} as const;
