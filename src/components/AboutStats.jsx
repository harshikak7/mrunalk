import { about } from '../data/about'

export default function AboutStats() {
  return (
    <dl className="flex flex-col gap-4">
      {about.stats.map((stat) => (
        <div key={stat.label} className="flex flex-row-reverse items-center justify-between gap-4">
          <dt className="font-serif text-xl">{stat.label}</dt>
          <dd className="text-base text-text-muted">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
