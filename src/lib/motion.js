import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mobile only: each child of `ref` fades + slides up (40px -> 0) once as it enters
// the viewport. Skipped entirely when the user prefers reduced motion.
export function useSlideUpChildren(ref) {
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray(ref.current.children).forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
    })
    return () => mm.revert()
  }, [ref])
}
