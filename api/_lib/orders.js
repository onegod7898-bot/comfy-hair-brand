import { put, get } from '@vercel/blob'

const BLOB_PATH = 'comfy-orders.json'
const ADMIN_SECRET = process.env.ADMIN_SECRET

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

export function requireAdmin(req) {
  const secret = req.headers?.authorization?.replace('Bearer ', '') || req.query?.admin
  return !!ADMIN_SECRET && secret === ADMIN_SECRET
}

export function applyCors(res, methods) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', `${methods}, OPTIONS`)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

export function parseBody(req) {
  return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
}
