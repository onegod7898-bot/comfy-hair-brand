import { applyCors, parseBody, readOrders, requireAdmin, writeOrders } from '../_lib/orders.js'

export default async function handler(req, res) {
  applyCors(res, 'GET, POST')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    if (!requireAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const orders = await readOrders()
    return res.status(200).json(orders)
  }

  if (req.method === 'POST') {
    const { items = [], total = 0 } = parseBody(req)
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
