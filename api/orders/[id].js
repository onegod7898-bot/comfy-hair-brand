import { put, get } from '@vercel/blob'

const BLOB_PATH = 'comfy-orders.json'
const ADMIN_SECRET = process.env.ADMIN_SECRET

async function readOrders() {
  try {
    const res = await get(BLOB_PATH, { access: 'private' })
    if (!res || res.statusCode !== 200) return []
    const text = await new Response(res.stream).text()
    return text ? JSON.parse(text) : []
  } catch {
    return []
  }
}

async function writeOrders(orders) {
  await put(BLOB_PATH, JSON.stringify(orders), {
    access: 'private',
    contentType: 'application/json',
  })
}

function requireAdmin(req) {
  const secret = req.headers?.authorization?.replace('Bearer ', '') || req.query?.admin
  return !!ADMIN_SECRET && secret === ADMIN_SECRET
}

export default async function handler(req, res) {
  const id = req.query?.id
  if (!id) return res.status(400).json({ error: 'Order id required' })

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const { status } = body
  if (!['pending', 'shipped', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Use: pending, shipped, cancelled' })
  }

  // Only admin can set shipped or pending; customer can cancel (no auth)
  if (status !== 'cancelled' && !requireAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const orders = await readOrders()
  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return res.status(404).json({ error: 'Order not found' })

  orders[index] = { ...orders[index], status, updatedAt: new Date().toISOString() }
  await writeOrders(orders)
  return res.status(200).json(orders[index])
}
