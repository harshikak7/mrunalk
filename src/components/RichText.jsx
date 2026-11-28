// Renders an array of text segments: strings as-is, { text, href } as underlined links.
// A link without an href yet renders as underlined text (placeholder until a URL is added).
export default function RichText({ segments }) {
  return segments.map((seg, i) => {
    if (typeof seg === 'string') return <span key={i}>{seg}</span>
    const className = 'link-hover underline underline-offset-2'
    return seg.href ? (
      <a
        key={i}
        href={seg.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {seg.text}
      </a>
    ) : (
      <span key={i} className={className}>
        {seg.text}
      </span>
    )
  })
}
