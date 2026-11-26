import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { formatTime, msToNextMinute } from '../lib/time'

export default function TimeChip({ className = '' }) {
  const { city, timeZone, separator } = site.time
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let id
    const tick = () => {
      setNow(new Date())
      id = setTimeout(tick, msToNextMinute())
    }
    id = setTimeout(tick, msToNextMinute())
    return () => clearTimeout(id)
  }, [])

  return (
    <p className={`text-xl text-text ${className}`}>
      {city}
      {separator}
      <time dateTime={now.toISOString()}>{formatTime(now, timeZone)}</time>
    </p>
  )
}
