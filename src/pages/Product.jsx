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
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-gray-600 hover:text-gray-900 text-sm font-medium mb-4"
      >
        ← Back
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 aspect-[3/4] max-h-[70vh] bg-black rounded-xl overflow-hidden">
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
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
            <button
              type="button"
              onClick={() => toggle(product.id)}
              className="p-2 text-red-500 shrink-0"
              aria-label={has(product.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {has(product.id) ? '❤️' : '🤍'}
            </button>
          </div>
          {product.dealCode && (
            <p className="text-xs text-gray-500 mt-1">Deal code: {product.dealCode}</p>
          )}
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-xl font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
            {product.normalPrice && (
              <p className="text-sm text-gray-500 line-through">₦{product.normalPrice.toLocaleString()}</p>
            )}
          </div>
          <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={addToBag}
              className="px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors"
            >
              {added ? 'Added to bag' : 'Add to bag'}
            </button>
            <a
              href="https://wa.me/2348116500217"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded bg-[#22c55e] text-white font-medium hover:bg-[#1ea34e] transition-colors"
            >
              💬 Chat with us
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Screenshot the hair you want with the price and send to 08116500217 (WhatsApp).
          </p>
        </div>
      </div>
    </div>
  )
}
