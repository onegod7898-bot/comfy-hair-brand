import { applyCors, parseBody, readOrders, requireAdmin, writeOrders } from '../_lib/orders.js'

const STATUSES = ['pending', 'shipped', 'cancelled']

export default async function handler(req, res) {
  applyCors(req, res, 'PATCH')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const id = req.query?.id
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Order id required' })

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = parseBody(req)
  if (!body) return res.status(400).json({ error: 'Invalid JSON body' })
  const { status } = body
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Use: pending, shipped, cancelled' })
  }

  const isAdmin = requireAdmin(req)
  if (status !== 'cancelled' && !isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const orders = await readOrders()
  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return res.status(404).json({ error: 'Order not found' })

  // Customers may cancel their own order (identified by its unguessable id)
  // only while it is still pending; anything else requires the admin secret.
  if (!isAdmin && orders[index].status !== 'pending') {
    return res.status(409).json({ error: 'Order can no longer be cancelled' })
  }

  orders[index] = { ...orders[index], status, updatedAt: new Date().toISOString() }
  await writeOrders(orders)
  return res.status(200).json(orders[index])
}
