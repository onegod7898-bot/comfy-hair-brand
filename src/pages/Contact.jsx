export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        Have questions or want to order? Reach out through any of these channels.
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
