export default function StatusBadge({ label }) {
  return (
    <p className="flex items-center gap-[9px] text-lg leading-5 text-accent">
      <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-accent" />
      {label}
    </p>
  )
}
