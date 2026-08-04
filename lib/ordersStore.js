import { put, get, BlobNotFoundError } from '@vercel/blob'

const BLOB_PATH = 'comfy-orders.json'

/**
 * Reads the orders blob. Returns [] only when the blob does not exist yet;
 * any other failure is thrown so callers never mistake an outage for
 * "there are no orders" (which would overwrite existing orders on write).
 */
export async function readOrders() {
  let res
  try {
    res = await get(BLOB_PATH, { access: 'private' })
  } catch (err) {
    if (err instanceof BlobNotFoundError) return []
    throw err
  }
  if (!res || res.statusCode === 404) return []
  if (res.statusCode !== 200) {
    throw new Error(`Failed to read orders blob (status ${res.statusCode})`)
  }
  const text = await new Response(res.stream).text()
  if (!text) return []
  try {
    return JSON.parse(text)
  } catch (err) {
    throw new Error(`Orders blob contains invalid JSON: ${err.message}`)
  }
}

export async function writeOrders(orders) {
  return put(BLOB_PATH, JSON.stringify(orders), {
    access: 'private',
    contentType: 'application/json',
  })
}

export function requireAdmin(req) {
  const adminSecret = process.env.ADMIN_SECRET
  const secret = req.headers?.authorization?.replace('Bearer ', '') || req.query?.admin
  return !!adminSecret && secret === adminSecret
}

/** Parses a request body that may arrive as a raw string. Throws on invalid JSON. */
export function parseBody(req) {
  if (typeof req.body !== 'string') return req.body || {}
  if (!req.body) return {}
  try {
    return JSON.parse(req.body)
  } catch {
    const err = new Error('Invalid JSON body')
    err.statusCode = 400
    throw err
  }
}

/** Logs an unexpected handler failure and responds with a JSON error. */
export function sendError(res, err, fallbackMessage) {
  const status = err?.statusCode || 500
  if (status >= 500) console.error(fallbackMessage, err)
  res.status(status).json({ error: status >= 500 ? fallbackMessage : err.message })
}
