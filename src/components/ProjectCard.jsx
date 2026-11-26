import { Link } from 'react-router-dom'
import { getAsset } from '../lib/assets'
import Spotlight from './Spotlight'

export default function ProjectCard({ project, className = '' }) {
  const { slug, name, shortName, role, year } = project
  return (
    <Link to={`/work/${slug}`} className={`group flex flex-col gap-[13px] ${className}`}>
      <div className="relative">
        <img
          src={getAsset(`${slug}-cover`)}
          alt={name}
          className="h-[222px] w-full object-cover md:h-[362px]"
        />
        <Spotlight />
      </div>
      <div className="flex flex-col gap-1 text-xl font-medium md:flex-row md:items-center md:justify-between md:gap-4">
        <p>
          <span className="md:hidden">{shortName ?? name}</span>
          <span className="hidden md:inline">{name}</span>
          <span className="text-text-secondary"> | {role}</span>
        </p>
        <p className="shrink-0">{year}</p>
      </div>
    </Link>
  )
}
