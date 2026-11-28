import Layout from '../components/Layout'
import BackButton from '../components/BackButton'
import RichText from '../components/RichText'
import AboutStats from '../components/AboutStats'
import StickerScroller from '../components/StickerScroller'
import WorkExperience from '../components/WorkExperience'
import Faq from '../components/Faq'
import Marquee from '../components/Marquee'
import FooterRows from '../components/FooterRows'
import FooterCredit from '../components/FooterCredit'
import Achievements from '../components/Achievements'
import BackToTop from '../components/BackToTop'
import StatusBadge from '../components/StatusBadge'
import { about } from '../data/about'
import { site } from '../data/site'

// Desktop: the back arrow sits 28px above the intro; the first row of every column starts at 159px.
// Mobile (stacked per the About mobile frame): heading, footer rows, back arrow + intro, stickers,
// work, FAQ, status, achievements, credit. The mobile-only margins below tune Layout's default
// stack spacing to the frame (60px between center sections, no marquee, no stats).
export default function About() {
  return (
    <>
      <Layout
        left={{
          top: (
            <h1 className="font-serif text-[60px] leading-16 font-semibold md:pt-[29px]">
              {about.heading}
            </h1>
          ),
          bottom: (
            <div className="mt-[52px] md:mt-0">
              <FooterRows />
            </div>
          ),
        }}
        right={{
          top: (
            <>
              <div className="hidden md:block md:pt-[29px]">
                <AboutStats />
              </div>
              <div className="-mt-[55px] md:hidden">
                <StatusBadge label={site.status} />
              </div>
            </>
          ),
          bottom: (
            // Mobile: the status wrapper above collapses to 0px (its -55px margin exceeds its 20px
            // height), so this offset puts Achievements 118px below the status line, as in the frame.
            <div className="-mt-[24px] md:mt-0">
              <Achievements />
            </div>
          ),
        }}
        mobileEnd={<FooterCredit className="-mt-8" />}
      >
        <div className="flex flex-col">
          {/* Desktop: arrow lifted 19px above the 130px line so the intro stays on the 159px row
              with 28px clear space under the arrow. Mobile: arrow stays put, intro moves down. */}
          <div className="-mt-[63px] flex flex-col gap-7 px-[18px] md:-mt-[19px]">
            <BackButton label={about.backLabel} />
            <div className="flex max-w-[582px] flex-col gap-2.5 [&>p]:leading-[normal]">
              <p className="text-[22px] md:text-2xl">
                <RichText segments={about.intro.primary} />
              </p>
              <p className="text-[22px] text-text-muted md:text-lg">
                <RichText segments={about.intro.secondary} />
              </p>
            </div>
          </div>
          <StickerScroller className="mt-[60px] md:mt-[103px]" />
          <WorkExperience className="mt-[60px] md:mt-[106px]" />
          <Faq className="mt-[60px] md:mt-[98px]" />
          <Marquee className="mt-[91px] hidden md:flex" />
          <FooterCredit className="mt-[182px] hidden px-2.5 md:block" />
        </div>
      </Layout>
      <BackToTop />
    </>
  )
}
