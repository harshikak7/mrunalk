import { useRef } from 'react'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import StatusBadge from '../components/StatusBadge'
import BackToTop from '../components/BackToTop'
import Marquee from '../components/Marquee'
import FooterRows from '../components/FooterRows'
import FooterCredit from '../components/FooterCredit'
import Achievements from '../components/Achievements'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { useSlideUpChildren } from '../lib/motion'

export default function Home() {
  const cardsRef = useRef(null)
  useSlideUpChildren(cardsRef)

  return (
    <>
      <Layout
        left={{
          top: (
            <h1 className="font-serif text-[60px] leading-16 font-semibold">
              {site.heroLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          ),
          bottom: <FooterRows />,
        }}
        right={{ top: <StatusBadge label={site.status} />, bottom: <Achievements /> }}
        mobileEnd={<FooterCredit />}
      >
        <div className="flex flex-col gap-[87px] md:gap-[150px]">
          <p className="mx-auto w-full px-[18px] text-[22px] md:max-w-[602px] md:px-0 md:py-2.5 md:text-2xl">
            {site.intro.primary}{' '}
            <span className="text-text-secondary">{site.intro.secondary}</span>
          </p>

          <section
            aria-labelledby="selected-works"
            className="flex flex-col gap-[23px] border-y border-line py-[23px]"
          >
            <div className="mx-auto flex w-full flex-col gap-[22px] px-[18px] md:max-w-[602px] md:px-0">
              <h2 id="selected-works" className="font-serif text-2xl">
                {site.selectedWorksTitle}
              </h2>
              <div ref={cardsRef} className="flex flex-col gap-5 md:gap-[43px]">
                {projects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </div>
          </section>

          <Marquee className="hidden md:flex" />
          <FooterCredit className="hidden px-2.5 md:block" />
        </div>
      </Layout>
      <BackToTop />
    </>
  )
}
