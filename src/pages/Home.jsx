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
    <div className="pb-4">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14 gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-lg font-bold text-gray-900">Comfy Hair Brand</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#22c55e] text-white text-sm font-medium"
          >
            <span aria-hidden>💬</span>
            Chat with us
          </button>
          <button
            type="button"
            onClick={() => navigate('/bag')}
            className="p-2 text-gray-600"
            aria-label="Cart"
          >
            🛒
          </button>
        </div>
        <div className="px-4 pb-3">
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="w-full flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-full text-sm text-gray-500"
          >
            <span aria-hidden>🔍</span>
            What are you looking for?
            <span className="ml-auto text-gray-400" aria-hidden>☰</span>
          </button>
        </div>
      </header>

      {/* Wig category cards - like shop page */}
      <section className="px-4 py-6">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {wigCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => navigate(`/shop?cat=${cat.id}`)}
              className="flex-shrink-0 w-[200px] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-card hover:border-primary/30 transition-colors text-left"
            >
              <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-4xl">
                ✨
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{cat.description}</p>
                <span className="inline-block mt-2 text-sm font-medium text-primary border border-primary px-3 py-1.5 rounded-full">
                  Shop Now
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products - with videos */}
      <section className="px-4 pb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Featured Products</h2>
        <p className="text-sm text-gray-600 mb-4">
          Handpicked bestsellers loved by our community. Quality you can trust.
        </p>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {(featured.length ? featured : galleryProducts).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => navigate(`/product/${p.id}`)}
              className="w-[180px] shrink-0 text-left rounded-xl overflow-hidden border border-gray-200 bg-white shadow-card hover:border-primary/30 transition-colors"
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
                <span className="absolute bottom-2 left-2 right-2 bg-white/90 px-2 py-1 rounded text-sm font-semibold text-gray-900">
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
              <div className="p-2.5">
                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Wig Gallery - videos */}
      <section className="px-4 pb-8">
        <p className="text-xs uppercase tracking-wider text-pink-500 font-medium mb-1">Our Work</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Wig Gallery</h2>
        <p className="text-sm text-gray-600 mb-4">
          Browse our collection of stunning wig transformations and styles.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {galleryProducts.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => navigate(`/product/${p.id}`)}
              className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-card hover:border-primary/30 transition-colors text-left aspect-square"
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
              <div className="p-2">
                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                <p className="text-xs text-gray-600">₦{p.price.toLocaleString()}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate('/gallery')}
            className="text-primary font-medium text-sm"
          >
            View more on Instagram →
          </button>
        </div>
      </section>
    </div>
  )
}
