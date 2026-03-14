import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { listOrders, updateOrderStatus } from '../services/ordersApi'

const TABS = [
  { key: 'pending', label: 'Active / Pending' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'cancelled', label: 'Cancelled' },
]

export default function Admin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [secret, setSecret] = useState(() => {
    if (typeof sessionStorage === 'undefined') return null
    return sessionStorage.getItem('admin_secret')
  })
  const [error, setError] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('pending')
  const [updating, setUpdating] = useState(null)

  const loadOrders = useCallback(async () => {
    if (!secret) return
    setLoading(true)
    setError('')
    try {
      const data = await listOrders(secret)
      setOrders(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message || 'Failed to load orders')
      setOrders([])
      if (e.message && e.message.toLowerCase().includes('invalid')) {
        sessionStorage.removeItem('admin_secret')
        setSecret(null)
      }
    } finally {
      setLoading(false)
    }
  }, [secret])

  useEffect(() => {
    if (secret) {
      sessionStorage.setItem('admin_secret', secret)
      loadOrders()
    }
  }, [secret, loadOrders])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    const pwd = password.trim()
    if (!pwd) {
      setError('Enter your admin password.')
      return
    }
    setSecret(pwd)
  }

  const handleLogout = () => {
    setSecret(null)
    setPassword('')
    setError('')
    sessionStorage.removeItem('admin_secret')
  }

  const handleStatusChange = async (orderId, newStatus) => {
    if (!secret) return
    setUpdating(orderId)
    setError('')
    try {
      await updateOrderStatus(orderId, newStatus, secret)
      await loadOrders()
    } catch (e) {
      setError(e.message || 'Update failed')
    } finally {
      setUpdating(null)
    }
  }

  const filtered = orders.filter((o) => o.status === tab)
  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const shippedCount = orders.filter((o) => o.status === 'shipped').length
  const cancelledCount = orders.filter((o) => o.status === 'cancelled').length

  if (!secret) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12 bg-cream">
        <div className="w-full max-w-md rounded-2xl border-2 border-sand bg-white p-8 shadow-card">
          <h1 className="font-display text-2xl font-semibold text-primary mb-1">Admin</h1>
          <p className="text-charcoal/70 text-sm mb-6">Enter your admin password to view and manage orders.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <label htmlFor="admin-password" className="block text-sm font-semibold text-primary">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Enter password"
              className="w-full px-4 py-3 border-2 border-sand rounded-lg text-primary bg-white placeholder:text-charcoal/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
              autoComplete="current-password"
            />
            {error && (
              <p className="text-sm text-red-600 font-medium" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              View orders
            </button>
          </form>
          <p className="text-xs text-charcoal/50 mt-6 pt-4 border-t border-sand">
            Set ADMIN_SECRET in Vercel Environment Variables to the password you want to use here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-cream min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl font-semibold text-primary">Orders</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadOrders}
            disabled={loading}
            className="px-4 py-2 border border-sand rounded-lg text-sm font-medium text-charcoal hover:bg-cream-dark disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Refresh'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-sand rounded-lg text-sm font-medium text-charcoal hover:bg-cream-dark"
          >
            Back to site
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-charcoal/70 hover:text-primary"
          >
            Log out
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium" role="alert">
          {error}
        </div>
      )}

      <div className="flex gap-2 border-b border-sand mb-6">
        {TABS.map(({ key, label }) => {
          const count = key === 'pending' ? pendingCount : key === 'shipped' ? shippedCount : cancelledCount
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 -mb-px transition-colors ${
                tab === key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-charcoal/60 hover:text-primary'
              }`}
            >
              {label} {count > 0 && <span className="ml-1 text-charcoal/40">({count})</span>}
            </button>
          )
        })}
      </div>

      {loading && orders.length === 0 ? (
        <p className="text-charcoal/60">Loading orders…</p>
      ) : filtered.length === 0 ? (
        <p className="text-charcoal/60">No orders in this tab.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((order) => (
            <li
              key={order.id}
              className="p-4 rounded-xl border border-sand bg-white shadow-soft"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <span className="text-xs text-charcoal/50 font-mono">{order.id}</span>
                <span className="text-xs text-charcoal/50">
                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}
                </span>
              </div>
              <ul className="text-sm text-charcoal mb-3">
                {(order.items || []).map((item, i) => (
                  <li key={i}>
                    {item.name} — ₦{Number(item.price || 0).toLocaleString()} × {item.qty || 1}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-primary">₦{Number(order.total || 0).toLocaleString()}</p>
                {tab === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={updating === order.id}
                      onClick={() => handleStatusChange(order.id, 'shipped')}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      {updating === order.id ? '…' : 'Mark shipped'}
                    </button>
                    <button
                      type="button"
                      disabled={updating === order.id}
                      onClick={() => handleStatusChange(order.id, 'cancelled')}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg border border-sand text-charcoal hover:bg-cream-dark disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
