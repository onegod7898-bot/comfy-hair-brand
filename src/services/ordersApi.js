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
  const url = `${API}/api/orders`
  const res = await fetch(adminSecret ? `${url}?admin=${encodeURIComponent(adminSecret)}` : url, {
    method: 'GET',
    headers: headers(adminSecret),
  })
  if (!res.ok) {
    const msg = res.status === 401 ? 'Invalid password. Check that ADMIN_SECRET in Vercel matches the password you enter.' : 'Failed to load orders.'
    throw new Error(msg)
  }
  return res.json()
}
