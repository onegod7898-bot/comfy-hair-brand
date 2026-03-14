const API = import.meta.env.VITE_API_BASE || ''

function headers(adminSecret) {
  const h = { 'Content-Type': 'application/json' }
  if (adminSecret) h['Authorization'] = `Bearer ${adminSecret}`
  return h
}

export async function createOrder(items, total) {
  const res = await fetch(`${API}/api/orders`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ items: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty || 1 })), total }),
  })
  if (!res.ok) throw new Error('Failed to create order')
  return res.json()
}

export async function updateOrderStatus(orderId, status, adminSecret = null) {
  const res = await fetch(`${API}/api/orders/${orderId}`, {
    method: 'PATCH',
    headers: headers(adminSecret),
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update order')
  return res.json()
}

export async function listOrders(adminSecret) {
  const res = await fetch(`${API}/api/orders?admin=${encodeURIComponent(adminSecret)}`, {
    headers: headers(adminSecret),
  })
  if (!res.ok) throw new Error(res.status === 401 ? 'Invalid password' : 'Failed to load orders')
  return res.json()
}
