import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

const allProducts = [
  { id: '1', name: 'FORM Smart Swim Goggles 2', price: 135, image: '🥽' },
  { id: '2', name: 'Pro Swim Goggles', price: 95, image: '🥽' },
  { id: '3', name: 'Classic Bikini Set', price: 49, image: '👙' },
  { id: '4', name: 'One Piece Swimsuit', price: 79, image: '🩱' },
]

export default function Favorites() {
  const navigate = useNavigate()
  const { favorites, toggle } = useFavorites()
  const items = allProducts.filter((p) => favorites.has(p.id))

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-lg font-semibold text-gray-900">My Favorites</h1>
        </div>
      </header>

      <div className="px-4 py-6">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">❤️</div>
            <p className="text-gray-600">No favorites yet</p>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="mt-4 text-primary font-medium"
            >
              Browse products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {items.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => navigate(`/product/${p.id}`)}
                className="text-left rounded-card overflow-hidden border border-gray-100 shadow-card"
              >
                <div className="relative aspect-[3/4] bg-gray-100 flex items-center justify-center">
                  <span className="text-5xl">{p.image}</span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggle(p.id) }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-red-500"
                    aria-label="Remove from favorites"
                  >
                    ❤️
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-sm font-semibold text-primary">₦{p.price.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
