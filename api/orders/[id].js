import { applyCors, parseBody, readOrders, requireAdmin, writeOrders } from '../_lib/orders.js'

export default async function handler(req, res) {
  const id = req.query?.id
  if (!id) return res.status(400).json({ error: 'Order id required' })

  applyCors(res, 'PATCH')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { status } = parseBody(req)
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
