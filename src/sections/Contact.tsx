import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { fadeUp } from "@/lib/motion";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — wire to Cloud/edge function later.
    const subject = encodeURIComponent(`Portfolio · ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} <${form.email}>`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-14 max-w-3xl">
          <div className="eyebrow mb-3">06 / Contact</div>
          <h2 className="font-display text-4xl tracking-tight text-fg md:text-6xl">
            Let's build something considered.
          </h2>
          <p className="mt-6 text-lg text-fg-muted">
            Open to senior IC roles, applied research collaborations, and thoughtful
            product work. Reply time is usually under 48 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr]">
          <motion.div {...fadeUp} className="space-y-6">
            <button
              onClick={copyEmail}
              className="group flex w-full items-center justify-between rounded-2xl border border-border-hairline bg-surface p-5 text-left transition-colors hover:border-accent/40"
            >
              <div>
                <div className="eyebrow mb-2">Email</div>
                <div className="font-mono text-sm text-fg md:text-base">
                  {profile.email}
                </div>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-border-hairline text-fg-muted group-hover:text-fg">
                {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              </span>
            </button>

            <div className="rounded-2xl border border-border-hairline bg-surface p-5">
              <div className="eyebrow mb-3">Elsewhere</div>
              <ul className="space-y-2">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="flex items-center justify-between py-1 text-sm text-fg transition-colors hover:text-accent"
                    >
                      <span>{s.label}</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-fg-subtle">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-border-hairline bg-surface p-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <span className="text-sm text-fg-muted">{profile.currently}</span>
            </div>
          </motion.div>

          <motion.form
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            onSubmit={submit}
            className="space-y-5 rounded-2xl border border-border-hairline bg-surface p-6 md:p-8"
          >
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              placeholder="Your name"
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              placeholder="you@company.com"
            />
            <div>
              <label className="eyebrow mb-2 block">Message</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="A few lines about what you're working on."
                rows={5}
                className="w-full resize-none rounded-lg border border-border-hairline bg-bg px-4 py-3 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              disabled={sent}
            >
              {sent ? "Opening your mail app…" : "Send message"}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border-hairline bg-bg px-4 py-3 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
      />
    </div>
  );
}
