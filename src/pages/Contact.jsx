export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        Have questions or want to order? All prices are in Naira. Pay to Nigeria account: <strong>8116500217</strong>. Reach out through any of these channels.
      </p>
      <div className="space-y-4">
        <a
          href="https://wa.me/2348116500217"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg border border-gray-200 bg-white hover:border-[#22c55e] hover:shadow-md transition-all"
        >
          <span className="font-medium text-gray-900">WhatsApp</span>
          <span className="text-gray-600 block text-sm">+234 811 650 0217</span>
        </a>
        <div className="p-4 rounded-lg border border-gray-200 bg-amber-50/50">
          <span className="font-medium text-gray-900">Nigeria Pay (Bank / USSD)</span>
          <span className="text-gray-700 block text-sm mt-1">Account: <strong>8116500217</strong></span>
          <span className="text-gray-600 block text-xs mt-0.5">All payments in Naira (₦)</span>
        </div>
        <a
          href="mailto:Comfortoluwaseunoyedele@gmail.com"
          className="block p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:shadow-md transition-all"
        >
          <span className="font-medium text-gray-900">Email</span>
          <span className="text-gray-600 block text-sm">Comfortoluwaseunoyedele@gmail.com</span>
        </a>
        <a
          href="https://instagram.com/Oyedelecomfortoluwaseun"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:shadow-md transition-all"
        >
          <span className="font-medium text-gray-900">Instagram</span>
          <span className="text-gray-600 block text-sm">@Oyedelecomfortoluwaseun</span>
        </a>
      </div>
    </div>
  )
}
