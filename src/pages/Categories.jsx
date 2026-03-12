import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { wigCategories, getProductsByCategory } from '../data/wigProducts'

export default function Categories() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('cat') || 'all'
  const { has, toggle } = useFavorites()
  const products = getProductsByCategory(category)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Shop Wigs</h1>
      <p className="text-gray-600 mb-6">Browse by category. All products show video and price.</p>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === 'all' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
          }`}
        >
          All
        </button>
        {wigCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => navigate(`/shop?cat=${c.id}`)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === c.id ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            {c.name.replace(' Wigs', '')}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => (
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
              <span className="absolute top-2 right-2 bg-white/95 px-2 py-0.5 rounded text-sm font-semibold text-gray-900">
                ₦{p.price.toLocaleString()}
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); toggle(p.id) }}
                className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-red-500"
                aria-label={has(p.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {has(p.id) ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
              {p.normalPrice && (
                <p className="text-xs text-gray-500 line-through">₦{p.normalPrice.toLocaleString()}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
