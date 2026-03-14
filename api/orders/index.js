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
  const blob = await put(BLOB_PATH, JSON.stringify(orders), {
    access: 'private',
    contentType: 'application/json',
  })
  return blob
}

function requireAdmin(req) {
  const secret = req.headers?.authorization?.replace('Bearer ', '') || req.query?.admin
  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return false
  }
  return true
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    if (!requireAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const orders = await readOrders()
    return res.status(200).json(orders)
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const { items = [], total = 0 } = body
    if (!items.length) {
      return res.status(400).json({ error: 'Items required' })
    }
    const orders = await readOrders()
    const id = crypto.randomUUID()
    const order = {
      id,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    orders.unshift(order)
    await writeOrders(orders)
    return res.status(200).json({ id, status: order.status })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
