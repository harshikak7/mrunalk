import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { getAssetsByPrefix } from '../lib/assets'
import { about } from '../data/about'
import Sticker from './Sticker'

const SPEED = 40 // px per second
const stickers = getAssetsByPrefix('about-sticker-')

function Set({ hidden }) {
  return (
    <div className="flex shrink-0 gap-3 pr-3" aria-hidden={hidden || undefined}>
      {stickers.map((src, i) => (
        <Sticker key={src} src={src} alt={hidden ? '' : (about.stickers[i] ?? '')} />
      ))}
    </div>
  )
}

// Logos scrolling right -> left in a seamless loop (two identical sets, track moves by one set).
// Static when the user prefers reduced motion.
export default function StickerScroller({ className = '' }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      let tween
      const imgs = [...track.querySelectorAll('img')]
      // Widths depend on each logo's aspect ratio, so measure once every image has loaded.
      const loaded = (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true })
              img.addEventListener('error', resolve, { once: true })
            })
      Promise.all(imgs.map(loaded)).then(() => {
        // Real width of one set (logos have different widths), incl. its trailing gap.
        const half = track.firstElementChild.getBoundingClientRect().width
        if (!half) return
        tween = gsap.to(track, { x: -half, duration: half / SPEED, ease: 'none', repeat: -1 })
      })
      return () => tween?.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <div className={`overflow-hidden border-y border-line-subtle py-[22px] pl-4 ${className}`}>
      <div ref={trackRef} className="flex w-max">
        <Set />
        <Set hidden />
      </div>
    </div>
  )
}
