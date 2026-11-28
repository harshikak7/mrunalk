import { getAsset } from '../lib/assets'

// Renders an SVG asset as a mask so it takes the current text color (works with link-hover).
export default function MaskIcon({ name, className = 'size-5' }) {
  const url = `url("${getAsset(name)}")`
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ maskImage: url, WebkitMaskImage: url, maskSize: 'contain', WebkitMaskSize: 'contain' }}
    />
  )
}
