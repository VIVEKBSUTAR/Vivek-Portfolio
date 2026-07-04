# Vivek's Portfolio — Phase 4: Dynamic Experience & Immersive Interaction

Planning only. Builds on the Phase 2 motion primitives (`AmbientEnvironment`, `MagneticButton`, `Reveal`, `useReducedMotion`) and the Phase 3 blueprint. This phase turns the site from *reactive* to *contextually intelligent*: it adapts to how the visitor is using it, remembers them, and commits to **one** signature moment.

Guiding line: **the site should feel like it knows what the visitor needs — even when they haven't asked.**

---

## 1. What's new vs. Phase 2/3

Phase 4 does not re-spec ambient systems, camera language, or micro-interactions — those are locked. It adds four layers that were missing:

1. **Environmental Intelligence** — the ambient system reads scroll velocity, idle time, and section to modulate its own intensity.
2. **Living Memory** — small localStorage-scoped preferences make the site feel personal on return visits.
3. **Moments of Silence** — reading views deliberately quiet the environment.
4. **The Signature Interaction** — we commit to ONE unforgettable moment (the shared-element project morph) and cut anything that would compete with it.

Everything else in Phase 4 is a refinement pass on the existing primitives.

---

## 2. Refined Environmental System

Same eight ambient systems from Phase 3 (§2), but each now has three intensity modes:

| Mode      | Trigger                                | Effect                                                |
| --------- | -------------------------------------- | ----------------------------------------------------- |
| `active`  | Default; user browsing normally        | 100% intensity as spec'd                              |
| `focused` | Fast scroll (> 1000 px/s) or reading   | 40% intensity, particulate paused, cursor-light dimmed |
| `resting` | Idle > 30s or reduced-motion           | 15% intensity or off entirely                         |

Transitions between modes take 700ms cross-fade. Mode is exposed as a `data-ambient-mode` attribute on the ambient root, so any layer can subscribe.

Rules:
- No mode change is triggered by cursor movement (too jittery).
- Reading views (case view, research entries) enter `focused` on route change and stay there.
- Returning to the landing page restores `active` after 400ms.

---

## 3. Unified Motion Language

One easing family. One duration formula. No exceptions.

| Element weight    | Base duration | Ease            |
| ----------------- | ------------- | --------------- |
| Chrome (< 20px)   | 160ms         | `ease-out-soft` |
| Control (20–80px) | 240ms         | `ease-out-soft` |
| Card (80–400px)   | 400ms         | `ease-out-soft` |
| Overlay (> 400px) | 560ms         | `ease-out-soft` |
| Route transition  | 700ms         | `ease-in-out-soft` |

Rules:
- Exits use `ease-in-quiet` at 60% of the entry duration.
- Springs allowed only for magnetic pull and card lift; stiffness 220, damping 22.
- Small elements move faster; large elements move slower. Always. No stylistic overrides.

---

## 4. Spatial Interaction System

The 8 spatial layers from Phase 3 §3 are unchanged. Phase 4 adds interaction rules across them:

- **Cursor influence radius.** Any card within 120px of the cursor gets a 4% opacity accent-tinted rim; strengthens to 12% when the cursor enters its bounds. Off on touch and reduced-motion.
- **Depth response on hover.** Hovered cards lift 8px on Z; their shadow stretches proportionally (300ms) instead of scaling uniformly. Peers dim to 62% + 0.4px blur.
- **Glass reactivity.** The floating nav's inner highlight shifts 8px horizontally with cursor X (240ms lerp). Off on scroll `focused` mode.
- **Scroll parallax stays soft.** Environment 0.05, Lighting 0.10, Particulate 0.15 — unchanged.

---

## 5. Dynamic Lighting Strategy

Three additions on top of Phase 3 §6:

1. **Scroll-modulated key light.** As the viewer scrolls past 40% of the page, the primary key light drifts 10% further from center, giving a soft "afternoon" progression across the visit.
2. **Section arrival flash.** On first entry to a new section, ambient tint pulses +15% intensity for 500ms then returns to baseline. Never triggers on scroll-back.
3. **Project-open darkening.** Opening a case view drops the environment layer to 40% brightness over 400ms so the case is the visual focus; restores on close.

No new light sources. Lighting count stays at 9 (Phase 3 §6).

---

## 6. 3D Depth System (refinements)

- Cards render `will-change: transform, filter` on hover-in and clear it on hover-out (avoids constant GPU cost).
- Glass surfaces gain a 1px inner white-on-8%-opacity edge highlight that intensifies to 14% on cursor proximity within 80px.
- Images inside project covers get a subtle 2° tilt with cursor position — bounded, spring-eased, and clipped to the card frame. Off on mobile and reduced-motion.

No new layers; no new elevation tokens.

---

## 7. The Signature Interaction (commit to ONE)

**Chosen: Shared-element project morph.**

Why this one:
- It's the emotional peak of the visit.
- It's the moment where design meets engineering.
- It teaches the visitor that this site *understands continuity*.

**Storyboard (locked):**

1. Card cover + title read their bounding rect.
2. On click, they translate + scale to the case-view header position over 520ms, `ease-out-soft`.
3. Grid fades to 0 + scales to 0.98 (400ms).
4. Case view mounts with `layoutId` on cover + title; environment drops to 40% brightness; ambient tint deepens to the project's dominant hue.
5. Case-view body reveals in a 60ms staggered fade-up.
6. On close (Esc / back / scroll-up): reverse morph, 460ms; grid restores; scroll position preserved.

**Everything else that could compete is deliberately restrained:**
- No hero 3D object.
- No skills constellation "wow" pass beyond node glow.
- No contact-form fireworks — a single warm liquid highlight on submit success.

One signature. One memory.

---

## 8. Context-aware Interface Behavior

The site quietly reads five signals and reacts.

| Signal              | Read via                              | Effect                                           |
| ------------------- | ------------------------------------- | ------------------------------------------------ |
| Scroll velocity     | `wheel` events, EMA over 500ms        | > 1000 px/s → ambient `focused` mode             |
| Idle time           | `pointermove`/`keydown` timer         | 30s → ambient `resting`; 60s → cursor halo hint  |
| Route depth         | Router state                          | On case view / research → `focused`              |
| Reduced motion      | media query                           | All ambient off, all reveals ≤ 150ms             |
| Visit count         | localStorage `visitCount`             | See §9 Living Memory                             |

None of these signals are logged, sent to a server, or persisted beyond localStorage.

---

## 9. Living Memory (localStorage only)

Small, respectful, resettable from the footer.

| Key                    | Stored                        | Effect on return                                 |
| ---------------------- | ----------------------------- | ------------------------------------------------ |
| `theme`                | `dark` / `light`              | Applied pre-hydration (already shipped)          |
| `visitCount`           | integer                       | 1st visit → full hero reveal; 2nd+ → skip mask, keep ambient fade |
| `lastProject`          | project slug + timestamp      | On landing, that card gets a subtle amber rim glow for 3s |
| `readingProgress`      | `{ slug: scrollY }` per case  | On return to a case view, scroll restored + fade-in |
| `motionPreference`     | `auto` / `full` / `calm`      | Optional footer control; overrides ambient mode  |
| `soundPreference`      | `off` / `on`                  | Future audio toggle (deferred)                   |

Rules:
- All keys namespaced under `vivek.portfolio.*` to avoid collision.
- A "Reset preferences" link in the footer clears the namespace.
- SSR-safe: reads happen after mount; nothing is server-rendered from memory.

---

## 10. Emotional Pacing (locked)

Same as Phase 3 §10. Phase 4 reinforces it by making motion density map (§8 of Phase 3) enforced by the ambient-mode system: reading sections auto-enter `focused` and stay there.

---

## 11. Moments of Silence

Deliberate stillness where concentration matters more than spectacle.

| View                        | What's silenced                                       |
| --------------------------- | ----------------------------------------------------- |
| Case view body copy         | Particulate paused, cursor-light dimmed to 30%        |
| Research reading view       | Ambient set to `focused`; fog stopped                 |
| Architecture diagram        | Draws in once, then locks — no idle loop              |
| Long-form scroll (> 5s dwell)| Cursor-light fades to 20% until next pointermove     |
| Reduced-motion mode         | Everything static; only focus rings animate           |

The absence of motion becomes a design element.

---

## 12. Material Refinement

Same six materials from Phase 3 §5. Refinements only:

- **Glass** — gains a very faint noise texture at 3% opacity to catch light naturally. Nav bar's inner highlight tracks cursor X (§4).
- **Metal (primary CTA)** — brushed-sheen gradient on hover only. Fades in 240ms, out 180ms.
- **Liquid** — reserved for exactly two places: contact-form submit success, and the case-view "next project" chip.
- **Paper** — case-view body copy gains a 2% warm luminance lift in dark mode for readability at length.
- **Matte / Hairline** — unchanged.

Materials never mix in base state; only during a transition (matte → gains liquid highlight on hover).

---

## 13. Performance Strategy

Same hard ceilings as Phase 3 §18. New rules for the intelligence layer:

- Scroll velocity uses passive `wheel` listeners + `requestAnimationFrame` throttle. No layout reads.
- Idle timer uses a single `setTimeout` that resets on `pointermove`/`keydown` — no polling.
- Ambient mode transitions animate via CSS custom properties + `transition`, not JS keyframes.
- localStorage reads happen once per session, in `useEffect`, never in render.
- Total added JS budget for Phase 4 primitives: ≤ 6KB gzipped.
- Any regression in FPS on scroll fails the milestone.

---

## 14. Accessibility Considerations

Everything from Phase 3 §17 stands. Additions:

- Ambient-mode changes are silent to screen readers.
- Living-memory features are always opt-outable via "Reset preferences" in the footer.
- `readingProgress` restoration happens after the page's H1 has focus (so a keyboard user isn't jumped mid-flow).
- `motionPreference: calm` in the footer explicitly overrides everything to reduced-motion behavior — the visitor's choice always wins over `prefers-reduced-motion: no-preference`.
- Focus ring on the signature morph: focused element retains its ring through the transition.

---

## 15. Implementation Priorities

Sequenced so the signature ships as soon as its dependencies are stable.

**P0 — Ambient mode system.** Add `data-ambient-mode` to the AmbientEnvironment root. Wire scroll-velocity + idle-timer + route-based mode. No visual change until P1.

**P1 — Environment mode visuals.** Cross-fade intensity per mode. Verify no FPS regression.

**P2 — Signature morph.** Shared-element case-view transition (Framer Motion `layoutId`). URL sync via TanStack navigation. Reverse close preserves scroll.

**P3 — Living memory.** Namespaced localStorage; `lastProject` rim glow; `readingProgress` restoration; footer "Reset preferences."

**P4 — Material refinements.** Nav-bar cursor-tracked highlight; card image tilt; CTA brushed sheen.

**P5 — Silences.** Ambient `focused` on reading routes; architecture-diagram single-play lock; long-dwell cursor dim.

**P6 — Perf & a11y hardening.** FPS profile, reduced-motion QA, focus-through-morph audit, localStorage reset check.

**P7 — (Deferred) Audio layer.** Only after everything else lands and the audio spec is approved.

---

## 16. Open Questions

1. **`visitCount` reveal skip** — on the 2nd+ visit, skip the headline word-by-word mask (hero shows instantly, ambient still fades in) OR always full-play the reveal? Skipping feels attentive; always-play feels consistent.
2. **`lastProject` rim glow** — a subtle 3s amber rim on the previously opened card, or nothing? First is a "welcome back" moment; the second is more restrained.
3. **Footer `motionPreference` control** — expose `auto / full / calm` (three states) or keep it as an implicit follow-of-OS setting? Explicit adds a control the user may never see; implicit trusts the OS.
4. **Image tilt on project covers** — max ±2° cursor-tracked tilt (adds physical response) or omit entirely (Phase 3 forbade tilt on chrome, but covers are content)? Currently the plan includes it — confirm.

Once these are answered, Phase 4 build proceeds against a locked spec.
