import {
  applyCors,
  computeTotal,
  parseBody,
  readOrders,
  requireAdmin,
  sanitizeItems,
  writeOrders,
} from '../_lib/orders.js'

export default async function handler(req, res) {
  applyCors(req, res, 'GET, POST')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    if (!requireAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const orders = await readOrders()
    return res.status(200).json(orders)
  }

  if (req.method === 'POST') {
    const body = parseBody(req)
    if (!body) return res.status(400).json({ error: 'Invalid JSON body' })
    const items = sanitizeItems(body.items)
    if (!items) {
      return res.status(400).json({ error: 'Invalid items' })
    }
    const orders = await readOrders()
    const order = {
      id: crypto.randomUUID(),
      items,
      total: computeTotal(items),
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    orders.unshift(order)
    await writeOrders(orders)
    return res.status(200).json({ id: order.id, status: order.status })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
