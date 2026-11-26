import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { getAsset } from '../lib/assets'
import NavCell from './NavCell'
import TimeChip from './TimeChip'
import MobileNav from './MobileNav'

// Desktop: fixed 60px bar across all three columns. Mobile: <MobileNav />.
export default function Nav() {
  return (
    <>
    <MobileNav />
    <header className="fixed inset-x-0 top-0 z-50 hidden h-nav md:grid md:grid-cols-site">
      <div className="flex h-nav items-center bg-nav-fill px-6 backdrop-blur-[30px] border-b border-line">
        <Link to="/" aria-label={site.logoLinkLabel} className="rounded-full">
          <img
            src={getAsset('logo')}
            alt=""
            className="size-[47px] rounded-full object-cover"
          />
        </Link>
      </div>

      <nav aria-label={site.navLabel} className="flex items-start">
        {site.nav.map((item) => (
          <NavCell key={item.label} item={item} />
        ))}
      </nav>

      <div className="flex h-nav items-center justify-start bg-nav-fill px-[18px] backdrop-blur-[30px] border-b border-line">
        <TimeChip />
      </div>
    </header>
    </>
  )
}
