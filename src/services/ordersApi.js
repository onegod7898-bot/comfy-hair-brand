const API = import.meta.env.VITE_API_BASE || ''

function headers(adminSecret) {
  const h = { 'Content-Type': 'application/json' }
  if (adminSecret) h['Authorization'] = `Bearer ${adminSecret}`
  return h
}

class OrdersApiError extends Error {
  constructor(message, status = null, cause = null) {
    super(message)
    this.name = 'OrdersApiError'
    this.status = status
    if (cause) this.cause = cause
  }
}

async function request(url, options, fallbackMessage) {
  let res
  try {
    res = await fetch(url, options)
  } catch (err) {
    throw new OrdersApiError(
      `${fallbackMessage}: could not reach the server. Check your connection and try again.`,
      null,
      err
    )
  }
  if (!res.ok) {
    let serverMessage = ''
    try {
      const body = await res.json()
      serverMessage = body?.error || ''
    } catch {
      // Response had no JSON body; fall back to the generic message.
    }
    throw new OrdersApiError(serverMessage || `${fallbackMessage} (${res.status})`, res.status)
  }
  try {
    return await res.json()
  } catch (err) {
    throw new OrdersApiError(`${fallbackMessage}: the server returned an unreadable response.`, res.status, err)
  }
}

export async function createOrder(items, total) {
  return request(
    `${API}/api/orders`,
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        items: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty || 1 })),
        total,
      }),
    },
    'Failed to create order'
  )
}

export async function updateOrderStatus(orderId, status, adminSecret = null) {
  return request(
    `${API}/api/orders/${orderId}`,
    {
      method: 'PATCH',
      headers: headers(adminSecret),
      body: JSON.stringify({ status }),
    },
    'Failed to update order'
  )
}

export async function listOrders(adminSecret) {
  const url = `${API}/api/orders`
  try {
    return await request(
      adminSecret ? `${url}?admin=${encodeURIComponent(adminSecret)}` : url,
      { method: 'GET', headers: headers(adminSecret) },
      'Failed to load orders'
    )
  } catch (err) {
    if (err.status === 401) {
      throw new OrdersApiError(
        'Invalid password. Check that ADMIN_SECRET in Vercel matches the password you enter.',
        401,
        err
      )
    }
    throw err
  }
}

export { OrdersApiError }
