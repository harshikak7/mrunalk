export const projects = [
  { slug: 'viscer-vr', name: 'VisceR VR', role: 'UI/UX & Product Design', year: '2023-2026' },
  { slug: 'insurance-calculators', name: 'Insurance Calculators', role: 'UI/UX Design', year: '2025' },
  { slug: 'internal-insurance-dashboard', name: 'Internal Insurance Dashboard', shortName: 'Internal Dashboard', role: 'UI/UX Design', year: '2025' },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
