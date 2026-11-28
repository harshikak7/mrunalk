// Renders an array of text segments: strings as-is, { text, href } as underlined links,
// { text } (no href) as underlined plain text with no hover color.
export default function RichText({ segments }) {
  return segments.map((seg, i) => {
    if (typeof seg === 'string') return <span key={i}>{seg}</span>
    return seg.href ? (
      <a
        key={i}
        href={seg.href}
        target="_blank"
        rel="noopener noreferrer"
        className="link-hover cursor-pointer underline underline-offset-2"
      >
        {seg.text}
      </a>
    ) : (
      <span key={i} className="underline underline-offset-2">
        {seg.text}
      </span>
    )
  })
}
