import { useNavigate } from 'react-router-dom'

const lastUpdated = 'March 18, 2026'

export default function Privacy() {
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

      <p className="text-xs uppercase tracking-section text-accent font-semibold mt-3">Privacy Policy</p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mt-2 mb-6">
        How we protect your data
      </h1>

      <div className="space-y-5 text-charcoal/85 leading-relaxed">
        <p className="text-sm text-charcoal/70">
          Last updated: <strong className="text-primary">{lastUpdated}</strong>
        </p>

        <p>
          This Privacy Policy explains how Comfy Hair Brand collects, uses, and protects information when you
          visit this website or place an order. It is for general information only and not legal advice.
        </p>

        <div className="space-y-2">
          <p className="font-semibold text-primary">1. Data we collect</p>
          <p className="text-sm text-charcoal/70">
            We may collect:
          </p>
          <p>• Name and contact details you provide during checkout</p>
          <p>• Cart items and order totals</p>
          <p>• Payment-related information you share (for example, payment proof) after paying via Opay or bank transfer</p>
          <p>• Messages you send to us (for example via WhatsApp)</p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">2. How we use your information</p>
          <p>• To process orders and communicate with you</p>
          <p>• To manage and track orders in our admin system</p>
          <p>• To notify the site owner when you add items to cart or place/cancel orders</p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">3. Where your data is stored</p>
          <p>
            Order and cart-related data may be stored securely using serverless infrastructure on Vercel.
            Notifications may be sent using Formspree. We do not ask you for card details on this site.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">4. Cookies & analytics</p>
          <p>
            This website may use basic analytics tools. If cookies are used, they help us improve the experience.
            You can control cookies through your browser settings.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">5. Your choices</p>
          <p>
            You can request access or deletion of your information by contacting us through the channels on the
            Contact page.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">6. Security</p>
          <p>
            We use reasonable technical and organizational measures to protect your data. However, no method
            of transmission or storage is 100% secure.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-primary">7. Contact</p>
          <p className="text-sm text-charcoal/70">
            Questions about privacy? Contact us via WhatsApp: <strong className="text-primary">+234 811 650 0217</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

