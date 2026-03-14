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
      <div className="max-w-6xl mx-auto px-4 py-12">
        <button type="button" onClick={() => navigate(-1)} className="text-primary font-semibold hover:text-accent transition-colors">← Back</button>
        <p className="mt-4 text-charcoal/70">Product not found.</p>
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
    <div className="min-h-screen bg-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-20 p-3 rounded-full bg-white/95 backdrop-blur-sm text-primary shadow-card hover:shadow-card-hover hover:bg-white transition-all duration-200"
        aria-label="Back"
      >
        ←
      </button>

      <div className="relative w-full aspect-[9/16] max-h-[85vh] bg-primary">
        <video
          src={product.video}
          className="w-full h-full object-cover"
          controls
          loop
          playsInline
          autoPlay
          muted
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/92 via-black/60 to-transparent pt-14 pb-5 px-5">
          {product.dealCode && (
            <p className="text-white/90 text-xs uppercase tracking-section font-semibold">Deal code — {product.dealCode}</p>
          )}
          <h1 className="text-white font-display text-xl md:text-2xl font-semibold mt-1">{product.name}</h1>
          <p className="text-white/90 text-sm mt-0.5">{product.description}</p>
          <p className="text-white/80 text-xs mt-1">Maintaining :: Hair serum</p>
          <p className="text-white font-display text-2xl font-semibold mt-3">₦{product.price.toLocaleString()}</p>
          {product.normalPrice && (
            <p className="text-white/60 text-sm line-through">₦{product.normalPrice.toLocaleString()}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-accent shadow-card hover:bg-white transition-colors"
          aria-label={has(product.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          {has(product.id) ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-10 bg-white border-t border-sand p-4 flex flex-wrap gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <a
          href="https://wa.me/2348116500217"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-pill bg-[#22c55e] text-white font-semibold hover:opacity-95 transition-opacity"
        >
          💬 Chat with us
        </a>
        <button
          type="button"
          onClick={addToCart}
          className="flex-1 min-w-[140px] px-5 py-3.5 rounded-pill bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-soft"
        >
          {added ? 'Added to cart' : 'Add to cart'}
        </button>
      </div>
      <p className="text-center text-xs text-charcoal/60 px-4 py-3 bg-page-dark/50">
        All payments in Naira. Pay to Nigeria account: <strong className="text-primary">8116500217</strong>. Screenshot the hair you want with the price and send to 08116500217 (WhatsApp).
      </p>

      {otherProducts.length > 0 && (
        <section className="px-4 sm:px-6 py-8 pb-16 max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-section text-accent font-semibold mb-2">More to explore</p>
          <h2 className="font-display text-xl font-semibold text-primary mb-4">You might also like</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {otherProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => navigate(`/product/${p.id}`)}
                className="flex-shrink-0 w-[130px] text-left rounded-card-lg overflow-hidden border border-sand bg-white shadow-soft hover:shadow-card transition-all"
              >
                <div className="aspect-[3/4] bg-primary">
                  <video
                    src={p.video}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium text-primary truncate">{p.name}</p>
                  <p className="text-xs text-charcoal/70">₦{p.price.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
