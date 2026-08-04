import { readOrders, writeOrders, requireAdmin, parseBody, sendError } from '../../lib/ordersStore.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    if (!requireAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    try {
      const orders = await readOrders()
      return res.status(200).json(orders)
    } catch (err) {
      return sendError(res, err, 'Failed to load orders')
    }
  }

  if (req.method === 'POST') {
    try {
      const { items = [], total = 0 } = parseBody(req)
      if (!Array.isArray(items) || !items.length) {
        return res.status(400).json({ error: 'Items required' })
      }
      const orders = await readOrders()
      const order = {
        id: crypto.randomUUID(),
        items,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      orders.unshift(order)
      await writeOrders(orders)
      return res.status(200).json({ id: order.id, status: order.status })
    } catch (err) {
      return sendError(res, err, 'Failed to create order')
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
