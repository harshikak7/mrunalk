import { site } from '../data/site'
import { getAsset } from '../lib/assets'

// Mobile-only floating button that scrolls back to the top.
export default function BackToTop() {
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }
  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={site.backToTopLabel}
      className="fixed right-[18px] bottom-[22px] z-40 flex size-[59px] items-center justify-center rounded-full bg-white-bg md:hidden"
    >
      <img
        src={getAsset('arrow-forward-ios')}
        alt=""
        width="32"
        height="32"
        className="-rotate-90"
      />
    </button>
  )
}
