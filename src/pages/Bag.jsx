import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Bag() {
  const navigate = useNavigate()
  const { items, total, updateQty } = useCart()
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const shipping = 0

  return (
    <div className="pb-6 bg-page min-h-screen">
      <header className="sticky top-0 z-40 bg-page/95 backdrop-blur-md border-b border-sand">
        <div className="flex items-center justify-between px-4 sm:px-6 h-14">
          <h1 className="font-display text-xl font-semibold text-primary">Cart</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-28 h-28 mx-auto mb-5 rounded-full bg-page-dark flex items-center justify-center text-5xl">
              🛒
            </div>
            <p className="font-medium text-primary">Your cart is empty</p>
            <p className="text-sm text-charcoal/70 mt-1">Add items to get started</p>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="mt-8 px-7 py-3.5 bg-primary text-white font-semibold rounded-pill hover:bg-primary-dark transition-colors shadow-soft"
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
                  className="flex gap-4 rounded-card-lg border border-sand p-4 bg-white shadow-soft"
                >
                  <div className="w-20 h-24 rounded-lg bg-page-dark flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image && (item.image.includes('.mp4') || item.image.includes('/videos/')) ? (
                      <video src={item.image} className="w-full h-full object-cover" muted playsInline preload="metadata" />
                    ) : (
                      <span className="text-3xl">{item.image || '✨'}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{item.name}</p>
                    <p className="text-sm font-semibold text-accent mt-0.5">₦{Number(item.price).toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 rounded-full border border-sand flex items-center justify-center text-charcoal/80 text-sm font-medium hover:bg-page-dark transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-full border border-sand flex items-center justify-center text-charcoal/80 text-sm font-medium hover:bg-page-dark transition-colors"
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
              className="w-full mt-4 py-2.5 border border-sand rounded-card text-sm font-medium text-charcoal/80 hover:bg-page-dark transition-colors"
            >
              Use Voucher
            </button>

            <div className="mt-6 pt-4 border-t border-sand space-y-2">
              <div className="flex justify-between text-sm text-charcoal/70">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-charcoal/70">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-primary pt-2">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-xs text-charcoal/60 mt-2">
              All payments in Naira. Pay to Nigeria account: <strong>8116500217</strong>.
            </p>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 py-3.5 bg-primary text-white font-semibold rounded-pill hover:bg-primary-dark transition-colors shadow-soft"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  )
}
