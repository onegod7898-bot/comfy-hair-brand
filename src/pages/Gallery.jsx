import { useNavigate } from 'react-router-dom'
import { getGalleryProducts } from '../data/wigProducts'

export default function Gallery() {
  const navigate = useNavigate()
  const products = getGalleryProducts()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <p className="text-xs uppercase tracking-wider text-pink-500 font-medium mb-1">Our Work</p>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Wig Gallery</h1>
      <p className="text-gray-600 mb-8">
        Browse our collection of stunning wig transformations and styles.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => navigate(`/product/${p.id}`)}
            className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md transition-all text-left"
          >
            <div className="aspect-[3/4] bg-black">
              <video
                src={p.video}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
            </div>
            <div className="p-3">
              <p className="font-medium text-gray-900">{p.name}</p>
              <p className="text-sm text-gray-600 mt-0.5">₦{p.price.toLocaleString()}</p>
            </div>
          </button>
        ))}
      </div>
      <p className="mt-8 text-center text-gray-600 text-sm">
        View more on{' '}
        <a
          href="https://instagram.com/Oyedelecomfortoluwaseun"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 font-medium hover:underline"
        >
          Instagram →
        </a>
      </p>
    </div>
  )
}
