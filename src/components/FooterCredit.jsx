import { site } from '../data/site'

export default function FooterCredit({ className = '' }) {
  const { prefix, name, href } = site.footer.credit
  return (
    <p className={`text-base tracking-wide md:text-lg ${className}`}>
      {prefix}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-serif text-base font-semibold underline-offset-4 hover:underline md:text-xl"
      >
        {name}
      </a>
    </p>
  )
}
