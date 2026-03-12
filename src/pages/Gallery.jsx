import { useNavigate } from 'react-router-dom'
import { getGalleryProducts } from '../data/wigProducts'

export default function Gallery() {
  const navigate = useNavigate()
  const products = getGalleryProducts()

  return (
    <div className="pb-4">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-gray-600"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Wig Gallery</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-4 py-6">
        <p className="text-sm text-gray-600 mb-6">
          Browse our collection of stunning wig transformations and styles.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => navigate(`/product/${p.id}`)}
              className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-card hover:border-primary/30 transition-colors text-left"
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
        <p className="mt-6 text-center text-gray-600 text-sm">
          View more on{' '}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium"
          >
            Instagram →
          </a>
        </p>
      </div>
    </div>
  )
}
