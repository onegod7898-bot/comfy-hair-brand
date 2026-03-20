import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/** Minimum time the branded loader stays visible (ms) — feels premium, avoids flicker */
const MIN_VISIBLE_MS = 880

/**
 * Full-screen branded transition when navigating between pages (Layout routes).
 * Skips the very first paint so the homepage isn’t blocked on load.
 */
export default function PageNavigationLoader() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const isFirstNavigation = useRef(true)

  useEffect(() => {
    if (isFirstNavigation.current) {
      isFirstNavigation.current = false
      return
    }

    setVisible(true)
    const id = window.setTimeout(() => setVisible(false), MIN_VISIBLE_MS)
    return () => window.clearTimeout(id)
  }, [location.pathname, location.search, location.key])

  if (!visible) return null

  return (
    <div
      className="page-nav-loader fixed inset-0 z-[85] flex flex-col items-center justify-center pointer-events-auto"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="page-nav-loader-shine" aria-hidden />
      <div className="relative flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36">
        <div className="page-nav-loader-ring" aria-hidden />
        <div className="page-nav-loader-ring page-nav-loader-ring--delay" aria-hidden />
        <img
          src="/logo.png"
          alt=""
          className="relative z-10 h-14 sm:h-16 w-auto max-w-[140px] object-contain drop-shadow-md page-nav-loader-logo"
          draggable={false}
        />
      </div>
      <p className="mt-8 font-display text-xs sm:text-sm tracking-[0.28em] uppercase text-charcoal/55">
        Loading
      </p>
      <span className="sr-only">Please wait, loading the page.</span>
    </div>
  )
}
