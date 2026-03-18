import { NIGERIA_PAY_ACCOUNTS } from '../config'

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <p className="text-xs uppercase tracking-section text-accent font-semibold mb-2">Get in touch</p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-4">Contact Us</h1>
      <p className="text-charcoal/70 mb-8">
        Have questions or want to order? All prices are in Naira. Pay to Nigeria account(s):
        <br />
        <strong className="text-primary">{NIGERIA_PAY_ACCOUNTS[0].account}</strong> (Nigeria Pay)
        <br />
        <strong className="text-primary">{NIGERIA_PAY_ACCOUNTS[1].account}</strong> ({NIGERIA_PAY_ACCOUNTS[1].label}).
        Reach out through any of these channels.
      </p>
      <div className="space-y-4">
        <a
          href="https://wa.me/2348116500217"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-5 rounded-card-lg border border-sand bg-white shadow-soft hover:border-[#22c55e]/50 hover:shadow-card transition-all duration-200"
        >
          <span className="font-semibold text-primary">WhatsApp</span>
          <span className="text-charcoal/70 block text-sm mt-1">+234 811 650 0217</span>
        </a>
        <div className="p-5 rounded-card-lg border border-accent/30 bg-accent-light/30">
          <span className="font-semibold text-primary">Nigeria Pay (Bank / USSD)</span>
          <span className="text-charcoal/80 block text-sm mt-1">
            <span className="block">
              {NIGERIA_PAY_ACCOUNTS[0].account} (Nigeria Pay)
            </span>
            <span className="block mt-1">
              {NIGERIA_PAY_ACCOUNTS[1].account} ({NIGERIA_PAY_ACCOUNTS[1].label}) - {NIGERIA_PAY_ACCOUNTS[1].name}
            </span>
          </span>
          <span className="text-charcoal/60 block text-xs mt-0.5">All payments in Naira (₦)</span>
        </div>
        <a
          href="mailto:Comfortoluwaseunoyedele@gmail.com"
          className="block p-5 rounded-card-lg border border-sand bg-white shadow-soft hover:border-charcoal/20 hover:shadow-card transition-all duration-200"
        >
          <span className="font-semibold text-primary">Email</span>
          <span className="text-charcoal/70 block text-sm mt-1">Comfortoluwaseunoyedele@gmail.com</span>
        </a>
        <a
          href="https://instagram.com/Oyedelecomfortoluwaseun"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-5 rounded-card-lg border border-sand bg-white shadow-soft hover:border-charcoal/20 hover:shadow-card transition-all duration-200"
        >
          <span className="font-semibold text-primary">Instagram</span>
          <span className="text-charcoal/70 block text-sm mt-1">@Oyedelecomfortoluwaseun</span>
        </a>
      </div>
    </div>
  )
}
