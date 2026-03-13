import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { getProductById, getOtherProducts } from '../data/wigProducts'
import { notifyCart } from '../services/notify'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { has, toggle } = useFavorites()
  const [added, setAdded] = useState(false)

  const product = getProductById(id)
  const otherProducts = getOtherProducts(id, 8)

  if (!product) {
    return (
      <div className="p-4">
        <button type="button" onClick={() => navigate(-1)} className="text-gray-900 font-medium">← Back</button>
        <p className="mt-4 text-gray-600">Product not found.</p>
      </div>
    )
  }

  const addToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.video,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    notifyCart([{ name: product.name, price: product.price, qty: 1 }])
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-20 p-2 rounded-full bg-white/90 text-gray-900 shadow-md hover:bg-white"
        aria-label="Back"
      >
        ←
      </button>

      {/* Video first - full width, reference style */}
      <div className="relative w-full aspect-[9/16] max-h-[85vh] bg-black">
        <video
          src={product.video}
          className="w-full h-full object-cover"
          controls
          loop
          playsInline
          autoPlay
          muted
        />
        {/* Overlay info on video - like reference (bottom-left) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-12 pb-4 px-4">
          {product.dealCode && (
            <p className="text-white/90 text-sm font-medium">DEAL CODE::: ({product.dealCode})</p>
          )}
          <h1 className="text-white text-lg md:text-xl font-bold mt-0.5">{product.name}</h1>
          <p className="text-white/95 text-sm mt-0.5">{product.description}</p>
          <p className="text-white/90 text-xs mt-1">Maintaining :: Hair serum</p>
          <p className="text-white text-xl font-bold mt-2">₦{product.price.toLocaleString()}</p>
          {product.normalPrice && (
            <p className="text-white/70 text-sm line-through">₦{product.normalPrice.toLocaleString()}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-red-500"
          aria-label={has(product.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          {has(product.id) ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Actions bar - Chat + Add to cart */}
      <div className="sticky bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 p-4 flex flex-wrap gap-3">
        <a
          href="https://wa.me/2348116500217"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#22c55e] text-white font-medium hover:bg-[#1ea34e] transition-colors"
        >
          💬 Chat with us
        </a>
        <button
          type="button"
          onClick={addToCart}
          className="flex-1 min-w-[140px] px-4 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
        >
          {added ? 'Added to cart' : 'Add to cart'}
        </button>
      </div>
      <p className="text-center text-xs text-gray-500 px-4 py-2">
        All payments in Naira. Pay to Nigeria account: <strong>8116500217</strong>. Screenshot the hair you want with the price and send to 08116500217 (WhatsApp).
      </p>

      {/* More to explore - thumbnail strip like reference */}
      {otherProducts.length > 0 && (
        <section className="px-4 py-6 pb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4">More to explore</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {otherProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => navigate(`/product/${p.id}`)}
                className="flex-shrink-0 w-[120px] text-left rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className="aspect-[3/4] bg-black">
                  <video
                    src={p.video}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-600">₦{p.price.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
