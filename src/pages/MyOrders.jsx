import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const tabs = ['Pending', 'Shipped', 'Delivered']

const mockOrders = {
  Pending: [{ id: '1', date: 'Mar 5, 2025', total: 128, items: 2, status: 'Processing' }],
  Shipped: [{ id: '2', date: 'Mar 1, 2025', total: 49, items: 1, status: 'Shipped', tracking: '1Z999AA10123456784' }],
  Delivered: [{ id: '3', date: 'Feb 20, 2025', total: 224, items: 3, status: 'Delivered' }],
}

export default function MyOrders() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Pending')
  const orders = mockOrders[activeTab] || []

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button type="button" onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600" aria-label="Back">←</button>
          <h1 className="text-lg font-semibold text-gray-900">My Order</h1>
          <div className="w-9" />
        </div>
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 py-6">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No {activeTab.toLowerCase()} orders</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="rounded-card border border-gray-100 p-4 shadow-card"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                    <p className="text-xs text-gray-600 mt-1">{order.items} item(s) · ${order.total}</p>
                    {order.tracking && (
                      <p className="text-xs text-primary mt-1">Tracking: {order.tracking}</p>
                    )}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
