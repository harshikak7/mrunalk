import RichText from './RichText'

// One work-experience row: title / company / period on the left, description on the right.
export default function RoleRow({ role }) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col gap-0.5 md:w-[226px]">
        <h3 className="text-2xl leading-[normal] font-semibold">{role.title}</h3>
        <p className="flex justify-between gap-4 text-lg leading-[normal] md:flex-col md:gap-0">
          <span>{role.company}</span>
          <span>{role.period}</span>
        </p>
      </div>
      <p className="text-lg leading-[normal] text-text-muted md:w-[311px]">
        <RichText segments={role.description} />
      </p>
    </div>
  )
}
