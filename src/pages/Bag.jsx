import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Bag() {
  const navigate = useNavigate()
  const { items, total, updateQty } = useCart()
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const shipping = 0

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-lg font-semibold text-gray-900">Bag</h1>
        </div>
      </header>

      <div className="px-4 py-4">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-5xl">
              🛒
            </div>
            <p className="text-gray-700 font-medium">Your bag is empty</p>
            <p className="text-sm text-gray-500 mt-1">Add items to get started</p>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="mt-6 px-6 py-3 bg-primary text-white font-medium rounded-pill hover:bg-primary-dark transition-colors"
            >
              Shop now
            </button>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-card border border-gray-100 p-3 shadow-card"
                >
                  <div className="w-20 h-24 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image && (item.image.includes('.mp4') || item.image.includes('/videos/')) ? (
                      <video src={item.image} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                    ) : (
                      <span className="text-3xl">{item.image || '✨'}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm font-semibold text-primary mt-0.5">₦{Number(item.price).toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="w-full mt-4 py-2.5 border border-gray-200 rounded-card text-sm font-medium text-gray-700"
            >
              Use Voucher
            </button>

            <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 pt-2">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              All payments in Naira. Pay to Nigeria account: <strong>8116500217</strong>.
            </p>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 py-3 bg-primary text-white font-medium rounded-pill hover:bg-primary-dark transition-colors"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  )
}
