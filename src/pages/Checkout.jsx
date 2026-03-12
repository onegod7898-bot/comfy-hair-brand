import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const paymentMethods = [
  { id: 'nigeria-pay', name: 'Nigeria Pay (Bank / USSD)' },
  { id: 'transfer', name: 'Bank Transfer' },
]
const NIGERIA_PAY_ACCOUNT = '8116500217'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [payment, setPayment] = useState('nigeria-pay')

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const shipping = 0
  const discount = 0

  const handleConfirmOrder = () => {
    clearCart()
    navigate('/order-success')
  }

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            type="button"
            onClick={() => (step > 1 ? setStep(step - 1) : navigate('/bag'))}
            className="p-2 -ml-2 text-gray-600"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Checkout</h1>
          <div className="w-9" />
        </div>
        <div className="flex px-4 pb-2 gap-1">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full ${
                s <= step ? 'bg-primary' : 'bg-gray-200'
              }`}
              aria-hidden
            />
          ))}
        </div>
      </header>

      <div className="px-4 py-6">
        {step === 1 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Shipping Address</h2>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  className="w-full px-4 py-3 border border-gray-200 rounded-card text-sm"
                />
              </div>
            </form>
            <h2 className="text-base font-semibold text-gray-900 mt-6 mb-3">Shipping method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-card cursor-pointer">
                <input type="radio" name="shipping" defaultChecked className="text-primary" />
                <span className="text-sm">Standard — Free</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-card cursor-pointer">
                <input type="radio" name="shipping" className="text-primary" />
                <span className="text-sm">Express — $9.99</span>
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Payment Method</h2>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-3 border rounded-card cursor-pointer ${
                    payment === method.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === method.id}
                    onChange={() => setPayment(method.id)}
                    className="text-primary"
                  />
                  <span className="text-sm font-medium">{method.name}</span>
                </label>
              ))}
            </div>
            {(payment === 'nigeria-pay' || payment === 'transfer') && (
              <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-sm font-medium text-gray-900">Pay to Nigeria account</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{NIGERIA_PAY_ACCOUNT}</p>
                <p className="text-xs text-gray-600 mt-1">All amounts in Naira (₦). After payment, send proof via WhatsApp to confirm your order.</p>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Order Summary</h2>
            <ul className="space-y-2 mb-4">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">{i.name} × {i.qty}</span>
                  <span>₦{(i.price * i.qty).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 pt-3 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>−₦{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-gray-900 pt-2">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">Pay to Nigeria account: <strong>{NIGERIA_PAY_ACCOUNT}</strong>. All amounts in Naira.</p>
            <button
              type="button"
              onClick={handleConfirmOrder}
              className="w-full mt-6 py-3 bg-primary text-white font-medium rounded-pill hover:bg-primary-dark transition-colors"
            >
              Confirm Order
            </button>
          </div>
        )}

        {step < 3 && (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="w-full mt-8 py-3 bg-primary text-white font-medium rounded-pill hover:bg-primary-dark transition-colors"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
