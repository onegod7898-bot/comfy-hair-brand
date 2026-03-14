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
  const [secret, setSecret] = useState(() => typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('admin_secret') : null)
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
    if (!password.trim()) {
      setError('Enter password')
      return
    }
    setError('')
    setSecret(password.trim())
  }

  const handleLogout = () => {
    setSecret(null)
    setPassword('')
    sessionStorage.removeItem('admin_secret')
  }

  const handleStatusChange = async (orderId, newStatus) => {
    if (!secret) return
    setUpdating(orderId)
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Admin</h1>
          <p className="text-gray-600 text-sm mb-4">Enter your admin password to view orders.</p>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900"
              autoFocus
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800">
              View orders
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadOrders}
            disabled={loading}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Refresh'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to site
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Log out
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2 border-b border-gray-200 mb-6">
        {TABS.map(({ key, label }) => {
          const count = key === 'pending' ? pendingCount : key === 'shipped' ? shippedCount : cancelledCount
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 -mb-px transition-colors ${
                tab === key
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {label} {count > 0 && <span className="ml-1 text-gray-400">({count})</span>}
            </button>
          )
        })}
      </div>

      {loading && orders.length === 0 ? (
        <p className="text-gray-500">Loading orders…</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No orders in this tab.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((order) => (
            <li
              key={order.id}
              className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <span className="text-xs text-gray-500 font-mono">{order.id}</span>
                <span className="text-xs text-gray-500">
                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}
                </span>
              </div>
              <ul className="text-sm text-gray-700 mb-3">
                {(order.items || []).map((item, i) => (
                  <li key={i}>
                    {item.name} — ₦{Number(item.price || 0).toLocaleString()} × {item.qty || 1}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-gray-900">₦{Number(order.total || 0).toLocaleString()}</p>
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
                      className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
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
