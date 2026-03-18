import { useNavigate } from 'react-router-dom'

const lastUpdated = 'March 18, 2026'

export default function Terms() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-primary font-semibold hover:text-accent transition-colors"
      >
        ← Back
      </button>

      <p className="text-xs uppercase tracking-section text-accent font-semibold mt-3">Terms and Conditions</p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mt-2 mb-6">
        Comfy Hair Brand
      </h1>

      <div className="space-y-5 text-charcoal/85 leading-relaxed">
        <p className="text-sm text-charcoal/70">
          Last updated: <strong className="text-primary">{lastUpdated}</strong>
        </p>

        <p>
          Welcome to Comfy Hair Brand. By using this website and placing an order, you agree to these Terms and
          Conditions. This content is for information only and is not legal advice.
        </p>

        <p>
          <strong className="text-primary">NO REFUNDS.</strong> We only offer collection or replacement products.
          Before payment, please confirm the wig name and price with our team (WhatsApp).
        </p>

        <div className="space-y-2">
          <p className="font-semibold text-primary">1. Orders & Payment</p>
          <p>
            Payments are made via Opay or GTB (bank/USSD) as shown on the checkout page. After payment, you
            must send proof as instructed so we can confirm your order.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">2. Collection / Delivery</p>
          <p>
            Your order can be collected or delivered based on availability and the agreement confirmed with you
            after payment.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">3. Replacement Policy</p>
          <p>
            If the item is damaged on arrival or if an incorrect item was sent, contact us within{' '}
            <strong className="text-primary">48 hours</strong> of receiving your wig and provide details and
            pictures/video evidence via WhatsApp.
          </p>
          <p>
            Replacement is subject to inspection and product availability. Shipping/collection arrangements may
            be adjusted based on the situation.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">4. Cancellations</p>
          <p>
            You may cancel an order before it is dispatched. Once your order is being processed or dispatched,
            cancellation may not be possible.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">5. Product Information</p>
          <p>
            Product names, prices, and video demonstrations are shown for sale on this website. Hair color and
            appearance can vary slightly due to lighting, camera settings, and display devices.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">6. Intellectual Property</p>
          <p>
            All content (including images, videos, and brand assets) is owned by or licensed to Comfy Hair Brand.
            You may not copy, distribute, or use our content without permission.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">7. Limitation of Liability</p>
          <p>
            To the maximum extent permitted by law, Comfy Hair Brand is not liable for indirect or consequential
            damages arising from your use of the website or from orders placed through the website.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">8. Contact</p>
          <p className="text-sm text-charcoal/70">
            Questions about these Terms? Contact us via WhatsApp: <strong className="text-primary">+234 811 650 0217</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

