import { timingSafeEqual } from 'node:crypto'
import { put, get } from '@vercel/blob'

export const BLOB_PATH = 'comfy-orders.json'

const ADMIN_SECRET = process.env.ADMIN_SECRET

const MAX_ITEMS = 50
const MAX_QTY = 100
const MAX_NAME_LENGTH = 200
const MAX_PRICE = 100_000_000

export async function readOrders() {
  try {
    const res = await get(BLOB_PATH, { access: 'private' })
    if (!res || res.statusCode !== 200) return []
    const text = await new Response(res.stream).text()
    return text ? JSON.parse(text) : []
  } catch {
    return []
  }
}

export async function writeOrders(orders) {
  return put(BLOB_PATH, JSON.stringify(orders), {
    access: 'private',
    contentType: 'application/json',
  })
}

function secretsMatch(provided, expected) {
  const a = Buffer.from(String(provided))
  const b = Buffer.from(String(expected))
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function requireAdmin(req) {
  const header = req.headers?.authorization
  if (!ADMIN_SECRET || typeof header !== 'string' || !header.startsWith('Bearer ')) return false
  return secretsMatch(header.slice('Bearer '.length), ADMIN_SECRET)
}

function allowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
}

/**
 * Same-origin requests need no CORS header. Cross-origin requests are allowed
 * only for origins listed in ALLOWED_ORIGINS.
 */
export function applyCors(req, res, methods) {
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', `${methods}, OPTIONS`)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  const origin = req.headers?.origin
  if (origin && allowedOrigins().includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
}

export function parseBody(req) {
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body || '{}')
    } catch {
      return null
    }
  }
  return req.body && typeof req.body === 'object' ? req.body : {}
}

/**
 * Accepts only known item fields with sane types and bounds, so nothing
 * client-supplied is stored verbatim.
 */
export function sanitizeItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > MAX_ITEMS) return null
  const clean = []
  for (const item of items) {
    if (!item || typeof item !== 'object') return null
    const name = typeof item.name === 'string' ? item.name.trim().slice(0, MAX_NAME_LENGTH) : ''
    const price = Number(item.price)
    const qty = item.qty === undefined ? 1 : Number(item.qty)
    if (!name) return null
    if (!Number.isFinite(price) || price < 0 || price > MAX_PRICE) return null
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return null
    clean.push({ name, price, qty })
  }
  return clean
}

export function computeTotal(items) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0)
}
