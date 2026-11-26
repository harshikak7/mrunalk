import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { getAsset } from '../lib/assets'
import Spotlight from './Spotlight'

const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const cssPx = (name) =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name))

// One boxed nav cell. Neutral by default; on hover/focus it extends down (label rides
// to the bottom), the label goes full white and an arrow slides in at the right edge.
export default function NavCell({ item }) {
  const cellRef = useRef(null)
  const labelRef = useRef(null)
  const arrowRef = useRef(null)

  const animate = (active) => {
    const duration = reducedMotion() ? 0 : 0.28
    const opts = { duration, ease: 'power2.out', overwrite: 'auto' }
    gsap.to(cellRef.current, {
      ...opts,
      height: cssPx(active ? '--spacing-nav-hover' : '--spacing-nav'),
    })
    gsap.to(labelRef.current, { ...opts, opacity: active ? 1 : 0.6 })
    gsap.to(arrowRef.current, { ...opts, opacity: active ? 1 : 0, x: active ? 0 : -6 })
  }

  const handlers = {
    onMouseEnter: () => canHover() && animate(true),
    onMouseLeave: () => animate(false),
    onFocus: (e) => e.currentTarget.matches(':focus-visible') && animate(true),
    onBlur: () => animate(false),
  }

  const className =
    'relative flex h-nav flex-1 items-end justify-between self-start px-[18px] py-[14px] ' +
    'border-x border-b border-line bg-nav-cell backdrop-blur-[30px] ' +
    'font-sans text-xl font-medium tracking-normal text-text outline-offset-[-2px]'

  const content = (
    <>
      <Spotlight />
      <span ref={labelRef} className="opacity-60">
        {item.label}
      </span>
      <img
        ref={arrowRef}
        src={getAsset('arrow-forward')}
        alt=""
        width="20"
        height="20"
        className="mb-[3px] -translate-x-1.5 opacity-0"
      />
    </>
  )

  return item.external ? (
    <a
      ref={cellRef}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...handlers}
    >
      {content}
    </a>
  ) : (
    <Link ref={cellRef} to={item.href} className={className} {...handlers}>
      {content}
    </Link>
  )
}
