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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      <p className="text-xs uppercase tracking-section text-accent font-semibold mb-2">Shop</p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">Shop Wigs</h1>
      <p className="text-charcoal/70 mb-8 max-w-xl">Browse by category. All products show video and price.</p>
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className={`px-5 py-2.5 rounded-pill text-sm font-semibold transition-all duration-200 ${
            category === 'all' ? 'bg-primary text-white shadow-soft' : 'bg-white border border-sand text-charcoal hover:border-charcoal/30 hover:bg-page-dark'
          }`}
        >
          All
        </button>
        {wigCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => navigate(`/shop?cat=${c.id}`)}
            className={`px-5 py-2.5 rounded-pill text-sm font-semibold transition-all duration-200 ${
              category === c.id ? 'bg-primary text-white shadow-soft' : 'bg-white border border-sand text-charcoal hover:border-charcoal/30 hover:bg-page-dark'
            }`}
          >
            {c.name.replace(' Wigs', '')}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
        {products.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => navigate(`/product/${p.id}`)}
            className="group text-left rounded-card-lg overflow-hidden bg-white border border-sand shadow-card card-lift"
          >
            <div className="relative aspect-[3/4] bg-primary overflow-hidden">
              <video
                src={p.video}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
              {p.tag && (
                <span className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {p.tag}
                </span>
              )}
              <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-sm font-semibold text-primary shadow-soft">
                ₦{p.price.toLocaleString()}
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); toggle(p.id) }}
                className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-accent shadow-soft hover:bg-white transition-colors"
                aria-label={has(p.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {has(p.id) ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-primary truncate">{p.name}</p>
              {p.normalPrice && (
                <p className="text-xs text-charcoal/50 line-through mt-0.5">₦{p.normalPrice.toLocaleString()}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
