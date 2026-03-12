import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import {
  wigCategories,
  getFeaturedProducts,
  getGalleryProducts,
} from '../data/wigProducts'

export default function Home() {
  const navigate = useNavigate()
  const { has, toggle } = useFavorites()
  const featured = getFeaturedProducts()
  const galleryProducts = getGalleryProducts()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Wig category cards - like reference site */}
      <section className="mb-12 md:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {wigCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => navigate(`/shop?cat=${cat.id}`)}
              className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md transition-all text-left"
            >
              <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-4xl">
                ✨
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{cat.description}</p>
                <span className="inline-block mt-3 text-sm font-medium text-gray-900 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
                  Shop Now
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products - with videos and prices */}
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Featured Products</h2>
        <p className="text-gray-600 mb-6">
          Handpicked bestsellers loved by our community. Quality you can trust.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {(featured.length ? featured : galleryProducts).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => navigate(`/product/${p.id}`)}
              className="text-left rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="relative aspect-[3/4] bg-black">
                <video
                  src={p.video}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                />
                {p.tag && (
                  <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {p.tag}
                  </span>
                )}
                <span className="absolute bottom-2 left-2 right-2 bg-white/95 px-2 py-1.5 rounded text-sm font-semibold text-gray-900">
                  ₦{p.price.toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); toggle(p.id) }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-red-500"
                  aria-label={has(p.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {has(p.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Wig Gallery - videos and prices */}
      <section className="mb-12 md:mb-16">
        <p className="text-xs uppercase tracking-wider text-pink-500 font-medium mb-1">Our Work</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Wig Gallery</h2>
        <p className="text-gray-600 mb-6">
          Browse our collection of stunning wig transformations and styles.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryProducts.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => navigate(`/product/${p.id}`)}
              className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md transition-all text-left aspect-square max-h-[320px]"
            >
              <div className="w-full h-full bg-black">
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
                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                <p className="text-sm text-gray-600">₦{p.price.toLocaleString()}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href="https://instagram.com/Oyedelecomfortoluwaseun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 font-medium text-sm hover:underline"
          >
            View more on Instagram →
          </a>
        </div>
      </section>
    </div>
  )
}
