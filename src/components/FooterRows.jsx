import { site } from '../data/site'

// Underlined footer rows: role tags are plain text; the email is a mailto link.
export default function FooterRows() {
  const rowClass = 'flex items-center border-b border-line px-[9px] py-2.5 text-lg'
  return (
    <ul className="flex flex-col gap-[9px]">
      {site.footer.rows.map((row) => (
        <li key={row.label}>
          {row.href ? (
            <a href={row.href} className={`${rowClass} link-hover`}>
              {row.label}
            </a>
          ) : (
            <p className={rowClass}>{row.label}</p>
          )}
        </li>
      ))}
    </ul>
  )
}
