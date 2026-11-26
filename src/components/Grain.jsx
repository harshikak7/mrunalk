// Lightweight procedural grain: a small tiling SVG noise (no image file).
const noise = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
    "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/>" +
    "<feColorMatrix type='saturate' values='0'/></filter>" +
    "<rect width='100%' height='100%' filter='url(#n)'/></svg>",
)

export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-30"
      style={{ backgroundImage: `url("data:image/svg+xml,${noise}")`, backgroundRepeat: 'repeat' }}
    />
  )
}
