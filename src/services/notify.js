/**
 * Notify site owner when customers add to cart or place an order.
 * Set VITE_FORMSPREE_FORM_ID in .env to your Formspree form ID to receive emails.
 * Create a form at https://formspree.io and use the form ID from the form endpoint (e.g. xyz in https://formspree.io/f/xyz).
 */

import { NIGERIA_PAY_ACCOUNTS } from '../config'
import { cartSubtotal, formatNaira } from '../utils/format'

const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID

function formatItems(items) {
  return items
    .map((i) => `• ${i.name} — ${formatNaira(i.price)} × ${i.qty || 1}`)
    .join('\n')
}

function formatTotal(items) {
  return formatNaira(cartSubtotal(items))
}

export function notifyCart(items) {
  if (!FORM_ID || !items?.length) return
  const message = `Item(s) added to cart:\n\n${formatItems(items)}\n\nTotal: ${formatTotal(items)}`
  sendFormspree('Comfy Hair — Item(s) added to cart', message)
}

export function notifyOrder(items, total) {
  if (!FORM_ID || !items?.length) return
  const acc1 = NIGERIA_PAY_ACCOUNTS?.[0]
  const acc2 = NIGERIA_PAY_ACCOUNTS?.[1]
  const line1 = acc1?.account ? `${acc1.account} (${acc1.label || 'Opay'})` : ''
  const line2 = acc2?.account
    ? `${acc2.account} (${acc2.label || 'Bank'})${acc2.name ? ` - ${acc2.name}` : ''}`
    : ''
  const message = `New order placed:\n\n${formatItems(items)}\n\nTotal: ${formatNaira(total)}\n\nPay to Nigeria account(s):\n${line1}\n${line2}`
  sendFormspree('Comfy Hair — New order placed', message)
}

export function notifyOrderCancelled(items, total) {
  if (!FORM_ID) return
  const detail = items?.length
    ? `\n\n${formatItems(items)}\n\nTotal was: ${formatNaira(total)}`
    : ''
  const message = `A customer cancelled their order.${detail}`
  sendFormspree('Comfy Hair — Order cancelled', message)
}

/** Newsletter / discount list signup — uses the same Formspree form ID */
export async function notifyNewsletterSignup(name, email) {
  if (!FORM_ID || !email?.trim()) return { ok: false }
  const cleanName = (name || '').trim() || '—'
  const cleanEmail = email.trim()
  const message = `Newsletter signup (discount / offers):\n\nName: ${cleanName}\nEmail: ${cleanEmail}`
  try {
    const res = await postFormspree({
      _subject: 'Comfy Hair — Newsletter / discount signup',
      message,
      name: cleanName,
      email: cleanEmail,
    })
    return { ok: res.ok }
  } catch {
    return { ok: false }
  }
}

function postFormspree(payload) {
  return fetch(`https://formspree.io/f/${FORM_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
}

function sendFormspree(subject, message) {
  postFormspree({ _subject: subject, message }).catch(() => {})
}
