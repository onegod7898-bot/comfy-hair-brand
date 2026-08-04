import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { notifyNewsletterSignup } from '../services/notify'

const LS_SUBSCRIBED = 'comfy_hair_newsletter_subscribed'
const LS_DISMISSED_AT = 'comfy_hair_newsletter_dismissed_at'
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000
const SHOW_AFTER_MS = 5000

function shouldOfferModal() {
  try {
    if (localStorage.getItem(LS_SUBSCRIBED) === '1') return false
    const raw = localStorage.getItem(LS_DISMISSED_AT)
    if (!raw) return true
    const t = parseInt(raw, 10)
    if (Number.isNaN(t)) return true
    return Date.now() - t > DISMISS_COOLDOWN_MS
  } catch (err) {
    console.warn('Newsletter modal: localStorage unavailable', err)
    return true
  }
}

export default function NewsletterModal() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const close = useCallback(() => {
    setOpen(false)
    try {
      localStorage.setItem(LS_DISMISSED_AT, String(Date.now()))
    } catch (err) {
      console.warn('Newsletter modal: could not persist dismissal', err)
    }
  }, [])

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return
    if (!shouldOfferModal()) return

    const timer = window.setTimeout(() => setOpen(true), SHOW_AFTER_MS)
    return () => window.clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const n = name.trim()
    const em = email.trim()
    if (!n) {
      setError('Please enter your full name.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError('Please enter a valid email address.')
      return
    }
    setStatus('sending')
    const { ok } = await notifyNewsletterSignup(n, em)
    setStatus('idle')
    if (ok) {
      try {
        localStorage.setItem(LS_SUBSCRIBED, '1')
      } catch (err) {
        console.warn('Newsletter modal: could not persist subscription', err)
      }
      setStatus('done')
      window.setTimeout(() => {
        setOpen(false)
        setStatus('idle')
        setName('')
        setEmail('')
      }, 2200)
    } else {
      setError('Something went wrong. Please try again or message us on WhatsApp.')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-primary/30 backdrop-blur-sm"
        aria-label="Close newsletter"
        onClick={close}
      />
      <div
        className="relative z-[101] w-full max-w-md rounded-card-lg bg-page border-2 border-dashed border-accent/45 shadow-card-hover p-6 sm:p-8 ring-1 ring-sand/80"
        style={{ animation: 'newsletterIn 0.25s ease-out' }}
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-xl text-charcoal/60 hover:text-primary rounded-full hover:bg-accent-light/50 transition-colors"
          aria-label="Close"
        >
          ×
        </button>
        <p className="text-xs text-center uppercase tracking-section text-accent font-semibold mb-2 pr-6">
          Exclusive offers
        </p>
        <h2
          id="newsletter-modal-title"
          className="font-display text-center text-2xl sm:text-[1.65rem] font-semibold text-primary pr-6 leading-tight"
        >
          Newsletter signup
        </h2>
        <p className="text-center text-sm text-charcoal/75 mt-3 leading-relaxed">
          Sign up for our e-mail and be the first who know of our special offers!
        </p>

        {status === 'done' ? (
          <p className="mt-8 text-center text-sm font-semibold text-accent">
            Thank you — you&apos;re on the list! Check your inbox soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-sand bg-white text-sm text-primary placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent/60"
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-sand bg-white text-sm text-primary placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent/60"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-3.5 rounded-pill bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 shadow-soft"
            >
              {status === 'sending' ? 'Signing up…' : 'Sign up'}
            </button>
          </form>
        )}
      </div>
      <style>{`
        @keyframes newsletterIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
