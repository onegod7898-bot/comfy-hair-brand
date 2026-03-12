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
    <div className="pb-4">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14 gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-gray-600"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold text-gray-900 truncate max-w-[200px]">
            Shop Wigs
          </h1>
          <button
            type="button"
            onClick={() => navigate('/chat')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#22c55e] text-white text-sm font-medium"
          >
            💬 Chat
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${
              category === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            All
          </button>
          {wigCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => navigate(`/shop?cat=${c.id}`)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${
                category === c.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {c.name.replace(' Wigs', '')}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => navigate(`/product/${p.id}`)}
              className="text-left rounded-xl overflow-hidden border border-gray-200 bg-white shadow-card hover:border-primary/30 transition-colors"
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
                <span className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded text-sm font-semibold text-gray-900">
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
              <div className="p-2.5">
                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                {p.normalPrice && (
                  <p className="text-xs text-gray-500 line-through">₦{p.normalPrice.toLocaleString()}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
