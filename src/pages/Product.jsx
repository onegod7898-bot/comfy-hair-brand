import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { getProductById } from '../data/wigProducts'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { has, toggle } = useFavorites()
  const [added, setAdded] = useState(false)

  const product = getProductById(id)

  if (!product) {
    return (
      <div className="p-4">
        <button type="button" onClick={() => navigate(-1)} className="text-primary">← Back</button>
        <p className="mt-4 text-gray-600">Product not found.</p>
      </div>
    )
  }

  const addToBag = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.video,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="pb-6">
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
          <h1 className="text-lg font-semibold text-gray-900 truncate max-w-[200px]">
            {product.name}
          </h1>
          <button
            type="button"
            onClick={() => toggle(product.id)}
            className="p-2 text-red-500"
            aria-label={has(product.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {has(product.id) ? '❤️' : '🤍'}
          </button>
        </div>
      </header>

      <div className="aspect-[3/4] max-h-[60vh] bg-black relative">
        <video
          src={product.video}
          className="w-full h-full object-cover"
          controls
          loop
          playsInline
          autoPlay
          muted
        />
      </div>

      <div className="px-4 pt-4">
        {product.dealCode && (
          <p className="text-xs text-gray-500 mb-1">Deal code: {product.dealCode}</p>
        )}
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
          {product.normalPrice && (
            <p className="text-sm text-gray-500 line-through">₦{product.normalPrice.toLocaleString()}</p>
          )}
        </div>
        <p className="text-gray-600 mt-2 text-sm">{product.description}</p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={addToBag}
            className="flex-1 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors"
          >
            {added ? 'Added to bag' : 'Add to bag'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#22c55e] text-white font-medium"
          >
            💬 Chat with us
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Screenshot the hair you want with the price and send to 08116500217 (WhatsApp).
        </p>
      </div>
    </div>
  )
}
