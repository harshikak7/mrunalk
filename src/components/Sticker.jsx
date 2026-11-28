import { useRef } from 'react'
import gsap from 'gsap'
import { canHover, reducedMotion } from '../lib/theme'

// White box (fixed 60px height, width follows the logo, 16/8px padding so the 1.1 scale fits). On hover only the logo scales;
// the box never changes size. Desktop pointer only; instant under reduced motion.
export default function Sticker({ src, alt }) {
  const imgRef = useRef(null)

  const scale = (active) => {
    if (!canHover()) return
    gsap.to(imgRef.current, {
      scale: active ? 1.1 : 1,
      duration: reducedMotion() ? 0 : 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  return (
    <div
      onMouseEnter={() => scale(true)}
      onMouseLeave={() => scale(false)}
      className="h-[60px] w-auto shrink-0 overflow-hidden bg-white px-4 py-2"
    >
      {/* max-w-none: the base `img { max-width: 100% }` would squeeze/crop inside a shrink-to-fit box */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="h-full w-auto max-w-none object-contain"
        draggable="false"
      />
    </div>
  )
}
