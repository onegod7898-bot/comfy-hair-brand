import { CURRENCY } from '../config'

/** Format an amount as a Naira price, e.g. 25000 -> "₦25,000" */
export function formatNaira(amount) {
  return `${CURRENCY}${Number(amount || 0).toLocaleString()}`
}

/** Sum of price × qty for cart-like items */
export function cartSubtotal(items) {
  return (items || []).reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0)
}

/** True when a product media source is a video rather than an emoji/image */
export function isVideoSource(src) {
  return typeof src === 'string' && (src.includes('.mp4') || src.includes('/videos/'))
}
