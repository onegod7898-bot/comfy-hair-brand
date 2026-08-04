/**
 * Notify site owner when customers add to cart or place an order.
 * Set VITE_FORMSPREE_FORM_ID in .env to your Formspree form ID to receive emails.
 * Create a form at https://formspree.io and use the form ID from the form endpoint (e.g. xyz in https://formspree.io/f/xyz).
 */

import { NIGERIA_PAY_ACCOUNTS } from '../config'

const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID

function formatItems(items) {
  return items
    .map((i) => `• ${i.name} — ₦${Number(i.price || 0).toLocaleString()} × ${i.qty || 1}`)
    .join('\n')
}

function formatTotal(items) {
  const total = items.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0)
  return `₦${total.toLocaleString()}`
}

export function notifyCart(items) {
  if (!FORM_ID || !items?.length) return Promise.resolve({ ok: false })
  const message = `Item(s) added to cart:\n\n${formatItems(items)}\n\nTotal: ${formatTotal(items)}`
  return sendFormspree('Comfy Hair — Item(s) added to cart', message)
}

export function notifyOrder(items, total) {
  if (!FORM_ID || !items?.length) return Promise.resolve({ ok: false })
  const acc1 = NIGERIA_PAY_ACCOUNTS?.[0]
  const acc2 = NIGERIA_PAY_ACCOUNTS?.[1]
  const line1 = acc1?.account ? `${acc1.account} (${acc1.label || 'Opay'})` : ''
  const line2 = acc2?.account
    ? `${acc2.account} (${acc2.label || 'Bank'})${acc2.name ? ` - ${acc2.name}` : ''}`
    : ''
  const message = `New order placed:\n\n${formatItems(items)}\n\nTotal: ₦${Number(total).toLocaleString()}\n\nPay to Nigeria account(s):\n${line1}\n${line2}`
  return sendFormspree('Comfy Hair — New order placed', message)
}

export function notifyOrderCancelled(items, total) {
  if (!FORM_ID) return Promise.resolve({ ok: false })
  const detail = items?.length
    ? `\n\n${formatItems(items)}\n\nTotal was: ₦${Number(total || 0).toLocaleString()}`
    : ''
  const message = `A customer cancelled their order.${detail}`
  return sendFormspree('Comfy Hair — Order cancelled', message)
}

/** Newsletter / discount list signup — uses the same Formspree form ID */
export async function notifyNewsletterSignup(name, email) {
  if (!FORM_ID || !email?.trim()) return { ok: false }
  const cleanName = (name || '').trim() || '—'
  const cleanEmail = email.trim()
  const message = `Newsletter signup (discount / offers):\n\nName: ${cleanName}\nEmail: ${cleanEmail}`
  return sendFormspree('Comfy Hair — Newsletter / discount signup', message, {
    name: cleanName,
    email: cleanEmail,
  })
}

/**
 * Fire-and-forget owner notification. Failures never block the customer flow,
 * but they are logged (and reported back via `ok`) instead of being swallowed.
 */
async function sendFormspree(subject, message, extraFields = {}) {
  const url = `https://formspree.io/f/${FORM_ID}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, message, ...extraFields }),
    })
    if (!res.ok) {
      console.error(`Notification "${subject}" rejected by Formspree (status ${res.status})`)
    }
    return { ok: res.ok, status: res.status }
  } catch (err) {
    console.error(`Notification "${subject}" could not be sent`, err)
    return { ok: false, status: null }
  }
}
