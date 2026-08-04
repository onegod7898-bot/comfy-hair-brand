import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { notifyOrderCancelled } from '../services/notify'
import { updateOrderStatus } from '../services/ordersApi'

export default function OrderSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const orderState = location.state
  const [cancelling, setCancelling] = useState(false)
  const [cancelError, setCancelError] = useState('')

  const handleCancelOrder = async () => {
    setCancelError('')
    if (orderState?.orderId) {
      setCancelling(true)
      try {
        await updateOrderStatus(orderState.orderId, 'cancelled')
      } catch (err) {
        console.error('Order cancellation failed', err)
        setCancelError(`${err.message} Your order was not cancelled — please try again or contact us on WhatsApp.`)
        setCancelling(false)
        return
      }
      setCancelling(false)
    }
    if (orderState?.items != null) {
      notifyOrderCancelled(orderState.items, orderState.total)
    }
    navigate('/')
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center bg-page">
      <div className="w-24 h-24 rounded-full bg-accent-light flex items-center justify-center text-4xl text-accent mb-6">
        ✓
      </div>
      <h1 className="font-display text-3xl font-semibold text-primary">Order Placed!</h1>
      <p className="text-charcoal/70 mt-2 max-w-sm">
        Thank you for your order. We&apos;ll send you a confirmation and tracking details soon.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-8 py-3.5 bg-primary text-white font-semibold rounded-pill hover:bg-primary-dark transition-colors shadow-soft"
        >
          Continue Shopping
        </button>
        <button
          type="button"
          onClick={handleCancelOrder}
          disabled={cancelling}
          className="px-8 py-3.5 border-2 border-sand text-charcoal font-semibold rounded-pill hover:bg-page-dark transition-colors disabled:opacity-50"
        >
          {cancelling ? 'Cancelling…' : 'Cancel this order'}
        </button>
      </div>
      {cancelError && (
        <p className="mt-4 max-w-sm p-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium" role="alert">
          {cancelError}
        </p>
      )}
    </div>
  )
}
