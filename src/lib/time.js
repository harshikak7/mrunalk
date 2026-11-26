// "Oct 31, 8:20 PM" in the given time zone.
export function formatTime(date, timeZone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  )
  return `${parts.month} ${parts.day}, ${parts.hour}:${parts.minute} ${parts.dayPeriod}`
}

// Milliseconds until the next minute boundary (+ small buffer).
export const msToNextMinute = () => 60000 - (Date.now() % 60000) + 50
