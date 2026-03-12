import { useNavigate } from 'react-router-dom'

export default function OrderSuccess() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl mb-6">
        ✓
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Order Placed!</h1>
      <p className="text-gray-600 mt-2 max-w-sm">
        Thank you for your order. We&apos;ll send you a confirmation and tracking details soon.
      </p>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-8 px-8 py-3 bg-primary text-white font-medium rounded-pill hover:bg-primary-dark transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  )
}
