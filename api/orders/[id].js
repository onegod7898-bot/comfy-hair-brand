import { readOrders, writeOrders, requireAdmin, parseBody, sendError } from '../../lib/ordersStore.js'

const STATUSES = ['pending', 'shipped', 'cancelled']

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

  try {
    const { status } = parseBody(req)
    if (!STATUSES.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Use: ${STATUSES.join(', ')}` })
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
  } catch (err) {
    return sendError(res, err, 'Failed to update order')
  }
}
