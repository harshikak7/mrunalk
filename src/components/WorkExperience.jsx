import { about } from '../data/about'
import MaskIcon from './MaskIcon'
import RoleRow from './RoleRow'

const inner = 'mx-auto w-full px-[18px] md:max-w-[602px] md:px-0'

export default function WorkExperience({ className = '' }) {
  const { title, resume, roles } = about.work
  return (
    <section aria-labelledby="work-experience" className={`flex flex-col gap-[21px] ${className}`}>
      <div className="border-y border-line py-[22px]">
        <div className={`${inner} flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between`}>
          <h2 id="work-experience" className="font-serif text-2xl leading-[normal]">
            {title}
          </h2>
          <a
            href={resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover flex items-center gap-2.5 text-base leading-[normal]"
          >
            {resume.label}
            <MaskIcon name="arrow-forward" />
          </a>
        </div>
      </div>

      <ul className="flex flex-col gap-[22px]">
        {roles.map((role, i) => {
          const last = i === roles.length - 1
          return (
            // The last divider spans the full column; the ones between roles match the content width.
            <li key={role.title} className={last ? 'border-b border-line pb-[23px]' : inner}>
              <div className={last ? inner : 'border-b border-line pb-[21px]'}>
                <RoleRow role={role} />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
