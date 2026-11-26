// All site copy lives here.
export const site = {
  name: 'Mrunal',
  logoAlt: 'Illustration of Mrunal',
  logoLinkLabel: 'Mrunal — home',
  navLabel: 'Main',
  menuLabels: { open: 'Open menu', close: 'Close menu' },
  backToTopLabel: 'Back to top',

  // Rendered one line per entry (matches the design's break after "Hello!").
  heroLines: ['Hello!', 'I’m Mrunal.'],
  intro: {
    primary: "I design products in a way people don't have to think about.",
    secondary: 'Previously I design and lead product experiences at Simutomy.',
  },
  status: 'Open for New Opportunities',

  selectedWorksTitle: 'Selected Works',

  nav: [
    // TODO: paste the Google Drive share link for the resume
    { label: 'Resume', href: 'https://drive.google.com/file/d/1mKj_v8kKyfojgO9_s4tcTa1zWlXXbgPX/view?usp=drive_link', external: true },
    { label: 'About', href: '/about' },
    { label: 'Behance', href: 'https://www.behance.net/kmrunal', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kmrunal/', external: true },
  ],

  time: { city: 'Mumbai', timeZone: 'Asia/Kolkata', separator: ' | ' },

  marquee: ['Available for Work!', "Let's Connect!"],

  footer: {
    // Rows: role tags are plain text; only the email is a link.
    rows: [
      { label: 'UI/UX Design' },
      { label: 'Product Design' },
      { label: 'kolekarmrunal@gmail.com', href: 'mailto:kolekarmrunal@gmail.com', external: true },
    ],
    credit: {
      prefix: 'Coded by Human, ',
      name: 'Harshika',
      href: 'https://harshikaa-portfolio.vercel.app/',
    },
    achievements: {
      label: 'Achievements',
      items: [
        {
          name: 'UIUX Ninja',
          year: '2024',
          org: 'Simutomy Medtech Pvt Ltd',
          // TODO: paste the Google Drive certificate link
          href: 'https://drive.google.com/PLACEHOLDER',
        },
      ],
    },
  },

  caseStudy: { comingSoon: 'Case study coming soon' },

  notFound: {
    title: 'Page not found',
    body: "This page doesn't exist.",
    homeLabel: 'Back to home',
  },
}
