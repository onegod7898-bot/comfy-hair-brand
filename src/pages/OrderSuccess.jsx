import { useNavigate, useLocation } from 'react-router-dom'
import { notifyOrderCancelled } from '../services/notify'

export default function OrderSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const orderState = location.state

  const handleCancelOrder = () => {
    if (orderState?.items != null) {
      notifyOrderCancelled(orderState.items, orderState.total)
    }
    navigate('/')
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl mb-6">
        ✓
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Order Placed!</h1>
      <p className="text-gray-600 mt-2 max-w-sm">
        Thank you for your order. We&apos;ll send you a confirmation and tracking details soon.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-primary text-white font-medium rounded-pill hover:bg-primary-dark transition-colors"
        >
          Continue Shopping
        </button>
        <button
          type="button"
          onClick={handleCancelOrder}
          className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-pill hover:bg-gray-50 transition-colors"
        >
          Cancel this order
        </button>
      </div>
    </div>
  )
}
