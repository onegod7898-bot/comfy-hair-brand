import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const MIN_MS = 450
const MAX_MS = 1200

/**
 * Full-screen branded overlay while switching routes.
 * Uses React Router location.key so every navigation gets feedback (initial load skipped).
 */
export default function NavigationLoader() {
  const location = useLocation()
  const isFirst = useRef(true)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    setActive(true)
    const minTimer = window.setTimeout(() => setActive(false), MIN_MS)
    const maxTimer = window.setTimeout(() => setActive(false), MAX_MS)
    return () => {
      clearTimeout(minTimer)
      clearTimeout(maxTimer)
    }
  }, [location.key])

  if (!active) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-auto nav-loader-root"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="absolute inset-0 bg-page/88 backdrop-blur-md" aria-hidden />
      <div className="relative flex flex-col items-center gap-5 px-8">
        <div className="nav-loader-ring">
          <img
            src="/logo.png"
            alt=""
            className="relative z-10 h-16 w-auto md:h-20 object-contain drop-shadow-lg nav-loader-logo"
            width={160}
            height={80}
            decoding="async"
          />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-charcoal/55 font-medium">Loading</p>
      </div>
    </div>
  )
}
