// Read a resolved theme token (e.g. 'color-text') from :root so GSAP can tween it.
export const token = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim()

export const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
