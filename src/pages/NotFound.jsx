import { Link } from 'react-router-dom'
import { site } from '../data/site'

export default function NotFound() {
  const { title, body, homeLabel } = site.notFound
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-serif text-[40px] font-semibold">{title}</h1>
      <p className="text-text-secondary">{body}</p>
      <Link to="/" className="underline underline-offset-4">
        {homeLabel}
      </Link>
    </main>
  )
}
