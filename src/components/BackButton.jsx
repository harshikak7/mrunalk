import { useLocation, useNavigate } from 'react-router-dom'
import MaskIcon from './MaskIcon'

// Small left arrow: goes back in history, or home when the page was opened directly.
export default function BackButton({ label, className = '' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const goBack = () => (location.key === 'default' ? navigate('/') : navigate(-1))

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label={label}
      className={`link-hover flex size-5 cursor-pointer items-center justify-center text-text-muted ${className}`}
    >
      <MaskIcon name="arrow-forward" className="size-5 rotate-180" />
    </button>
  )
}
