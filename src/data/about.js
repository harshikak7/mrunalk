import { site } from './site'

// All About page copy (verbatim from the About Figma frames).
// Rich text is an array of segments: a plain string, or { text, href } for an underlined link.

// TODO: add the real URLs for these links (not in the Figma frame).
const links = {
  simutomy: { text: 'Simutomy', href: '' },
  viscer: { text: 'Viscer', href: '' },
}

export const about = {
  heading: 'About Me!',
  backLabel: 'Go back',

  intro: {
    primary: [
      'Mrunal is a product designer working across UI, UX, Product design, with a focus on clarity, usability, and human centered systems.',
    ],
    secondary: [
      'Previously, he designed and lead product experiences at ',
      links.simutomy,
      ', building ',
      links.viscer,
      ' a platform that enable nursing and medical students to learn clinical procedures on their own, in VR.',
    ],
  },

  // Alt text for about-sticker-1..5, in order (layer names in the frame).
  stickers: ['Simutomy', 'VisceR', 'Nive Media', 'SUD Life', 'You Matter'],

  stats: [
    { value: '3.5', label: 'Years of Experience' },
    { value: '7', label: 'Projects Worked On' },
  ],

  work: {
    title: 'Work Experience',
    resume: {
      label: 'Download Resume',
      // Same Google Drive link as the nav's Resume cell.
      href: site.nav.find((item) => item.label === 'Resume').href,
    },
    roles: [
      {
        title: 'UI/UX Lead',
        company: 'MedTech Startup, Mumbai',
        period: '‘23 - 2026',
        description: [
          'Previously, I designed and lead product experiences at ',
          links.simutomy,
          ', building ',
          links.viscer,
          ' a platform that enable nursing and medical students to practice and learn clinical procedures in VR.',
        ],
      },
      {
        title: 'Freelance Illustrator',
        company: 'Animator, Mumbai',
        period: '‘20 - 2020',
        description: ['Designed characters and background illustration assets in Illustrator for a animator.'],
      },
    ],
  },

  // TODO: answers are placeholders — fill in the final Q&A set.
  faq: {
    title: 'FAQ',
    items: [
      { question: 'What kind of projects do you work on?', answer: '' },
      { question: 'What is your design process?', answer: '' },
      { question: 'Do you work with existing teams or independently?', answer: '' },
      { question: 'Do you take on freelance or contract projects?', answer: '' },
      { question: 'How can we work together?', answer: 'I am currently located at Mumbai, India' },
    ],
  },
}
