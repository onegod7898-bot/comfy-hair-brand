/**
 * Notify site owner when customers add to cart or place an order.
 * Set VITE_FORMSPREE_FORM_ID in .env to your Formspree form ID to receive emails.
 * Create a form at https://formspree.io and use the form ID from the form endpoint (e.g. xyz in https://formspree.io/f/xyz).
 */

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
  if (!FORM_ID || !items?.length) return
  const message = `Item(s) added to cart:\n\n${formatItems(items)}\n\nTotal: ${formatTotal(items)}`
  sendFormspree('Comfy Hair — Item(s) added to cart', message)
}

export function notifyOrder(items, total) {
  if (!FORM_ID || !items?.length) return
  const message = `New order placed:\n\n${formatItems(items)}\n\nTotal: ₦${Number(total).toLocaleString()}\n\nPay to Nigeria account: 8116500217`
  sendFormspree('Comfy Hair — New order placed', message)
}

export function notifyOrderCancelled(items, total) {
  if (!FORM_ID) return
  const detail = items?.length
    ? `\n\n${formatItems(items)}\n\nTotal was: ₦${Number(total || 0).toLocaleString()}`
    : ''
  const message = `A customer cancelled their order.${detail}`
  sendFormspree('Comfy Hair — Order cancelled', message)
}

function sendFormspree(subject, message) {
  const url = `https://formspree.io/f/${FORM_ID}`
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ _subject: subject, message }),
  }).catch(() => {})
}
