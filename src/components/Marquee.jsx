import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { site } from '../data/site'
import { canHover, reducedMotion, token } from '../lib/theme'

const SPEED = 60 // px per second
const COPIES = 4 // enough phrase pairs to cover the bar; the track holds two sets of these

function Phrases({ hidden }) {
  return (
    <div className="flex shrink-0 items-center gap-5 pr-5" aria-hidden={hidden || undefined}>
      {Array.from({ length: COPIES }).flatMap((_, i) =>
        site.marquee.map((text, j) => (
          <span key={`${i}-${j}`} className="flex items-center gap-5">
            <span className="font-serif text-[40px] leading-16 font-semibold whitespace-nowrap">
              {text}
            </span>
            <span className="h-[46px] w-px bg-(--mq-divider)" />
          </span>
        )),
      )}
    </div>
  )
}

// "Available for Work! | Let's Connect!" bar. Scrolls left -> right in a seamless loop.
// Default: dark bar, light text. Hover: solid white bar, dark text, dark divider.
export default function Marquee({ className = '' }) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    gsap.set(rootRef.current, { '--mq-divider': token('color-line') })
    // Only loop while the bar is visible (desktop) and motion is allowed.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const half = trackRef.current.scrollWidth / 2
      if (!half) return
      gsap.fromTo(
        trackRef.current,
        { x: -half },
        { x: 0, duration: half / SPEED, ease: 'none', repeat: -1 },
      )
    })
    return () => mm.revert()
  }, [])

  const setHover = (active) => {
    if (!canHover()) return
    gsap.to(rootRef.current, {
      backgroundColor: token(active ? 'color-text' : 'color-bg'),
      color: token(active ? 'color-text-on-light' : 'color-text'),
      '--mq-divider': token(active ? 'color-line-on-light' : 'color-line'),
      duration: reducedMotion() ? 0 : 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex h-[91px] items-center overflow-hidden border-y border-line bg-bg text-text ${className}`}
    >
      <p className="sr-only">{site.marquee.join(' | ')}</p>
      <div ref={trackRef} className="flex w-max" aria-hidden="true">
        <Phrases />
        <Phrases hidden />
      </div>
    </div>
  )
}
