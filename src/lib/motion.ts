// Shared motion presets — every animation in the portfolio comes from here.
// Custom easing only; nothing generic.

export const easeOutSoft = [0.22, 1, 0.36, 1] as const;
export const easeInOutSoft = [0.65, 0, 0.35, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15% 0px" },
  transition: { duration: 0.7, ease: easeOutSoft },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-15% 0px" },
  transition: { duration: 0.6, ease: easeOutSoft },
};

export const stagger = (delay = 0.06) => ({
  animate: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

export const childFadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOutSoft },
};
