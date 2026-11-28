import { useEffect, useId, useRef } from 'react'
import gsap from 'gsap'
import { getAsset } from '../lib/assets'
import { reducedMotion } from '../lib/theme'

// One accordion row. The answer panel animates its height; the + icon turns into the x icon.
export default function FaqItem({ item, open, onToggle }) {
  const id = useId()
  const panelRef = useRef(null)
  const addRef = useRef(null)
  const closeRef = useRef(null)
  const first = useRef(true)

  useEffect(() => {
    const duration = first.current || reducedMotion() ? 0 : 0.35
    first.current = false
    const ease = 'power2.out'
    const panel = panelRef.current
    if (open) panel.hidden = false
    gsap.to(panel, {
      height: open ? 'auto' : 0,
      duration,
      ease,
      overwrite: 'auto',
      onComplete: () => {
        if (!open) panel.hidden = true // keep closed answers out of the a11y tree
      },
    })
    gsap.to(addRef.current, { rotate: open ? 90 : 0, opacity: open ? 0 : 1, duration, ease, overwrite: 'auto' })
    gsap.to(closeRef.current, { rotate: open ? 0 : -90, opacity: open ? 1 : 0, duration, ease, overwrite: 'auto' })
  }, [open])

  return (
    <li className="border-b border-line pb-[19px]">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-xl leading-[normal] font-medium"
        >
          {item.question}
          <span className="relative size-5 shrink-0" aria-hidden="true">
            <img ref={addRef} src={getAsset('add')} alt="" width="20" height="20" className="absolute inset-0" />
            <img ref={closeRef} src={getAsset('close')} alt="" width="20" height="20" className="absolute inset-0 opacity-0" />
          </span>
        </button>
      </h3>
      <div
        ref={panelRef}
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        hidden
        className="h-0 overflow-hidden"
      >
        <p className="pt-[19px] text-base leading-[normal] text-text-muted md:max-w-[481px]">{item.answer}</p>
      </div>
    </li>
  )
}
