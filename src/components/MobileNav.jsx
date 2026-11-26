import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { site } from '../data/site'
import { getAsset } from '../lib/assets'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Mobile (<768px) bar: logo + menu button; the menu slides open below it.
export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const { pathname } = useLocation()

  // Close on route change and on Escape.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    gsap.to(panelRef.current, {
      height: open ? 'auto' : 0,
      duration: reducedMotion() ? 0 : 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [open])

  const rowClass =
    'flex items-center justify-between border-b border-line-subtle bg-surface px-[18px] py-[14px] text-lg font-medium tracking-normal'
  const arrow = (
    <img src={getAsset('arrow-forward')} alt="" width="20" height="20" className="-rotate-90" />
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface px-[7px] py-[11px] md:hidden">
      <div className="flex items-center justify-between">
        <Link to="/" aria-label={site.logoLinkLabel} className="rounded-full">
          <img src={getAsset('logo')} alt="" className="size-[60px] rounded-full object-cover" />
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? site.menuLabels.close : site.menuLabels.open}
          onClick={() => setOpen((o) => !o)}
          className="flex size-[51px] items-center justify-center"
        >
          <img src={getAsset('menu-handle')} alt="" width="40" height="40" />
        </button>
      </div>

      <nav
        id="mobile-menu"
        ref={panelRef}
        aria-label={site.navLabel}
        inert={!open}
        className="h-0 overflow-hidden"
      >
        {site.nav.map((item) =>
          item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={rowClass}
            >
              {item.label}
              {arrow}
            </a>
          ) : (
            <Link key={item.label} to={item.href} className={rowClass}>
              {item.label}
              {arrow}
            </Link>
          ),
        )}
      </nav>
    </header>
  )
}
