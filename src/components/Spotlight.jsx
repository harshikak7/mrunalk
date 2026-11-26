import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { canHover, reducedMotion } from '../lib/theme'

// Drop inside any `relative` element: a soft radial glow follows the cursor while
// hovering it (via --mx / --my). Desktop pointers only.
export default function Spotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const glow = ref.current
    const parent = glow.parentElement
    if (!canHover()) return

    const fade = (opacity) =>
      gsap.to(glow, { opacity, duration: reducedMotion() ? 0 : 0.25, overwrite: 'auto' })
    const move = (e) => {
      const r = parent.getBoundingClientRect()
      glow.style.setProperty('--mx', `${e.clientX - r.left}px`)
      glow.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    const enter = () => fade(1)
    const leave = () => fade(0)

    parent.addEventListener('pointermove', move)
    parent.addEventListener('pointerenter', enter)
    parent.addEventListener('pointerleave', leave)
    return () => {
      parent.removeEventListener('pointermove', move)
      parent.removeEventListener('pointerenter', enter)
      parent.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0"
      style={{
        background:
          'radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), var(--color-spotlight), transparent 70%)',
      }}
    />
  )
}
