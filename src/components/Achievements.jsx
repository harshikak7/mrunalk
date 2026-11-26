import { site } from '../data/site'

export default function Achievements() {
  const { label, items } = site.footer.achievements
  return (
    <section aria-label={label} className="flex flex-col gap-4">
      <h2 className="flex justify-end border-b border-line px-[9px] py-2.5 text-lg">{label}</h2>
      {items.map((item) => (
        <div key={item.name} className="flex flex-col gap-[3px] text-right">
          <p className="font-serif text-xl">{item.name}</p>
          <p className="flex justify-between gap-4 text-base text-text-muted">
            <span>{item.year}</span>
            <span>{item.org}</span>
          </p>
        </div>
      ))}
    </section>
  )
}
