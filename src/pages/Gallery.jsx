import { useNavigate } from 'react-router-dom'
import { getGalleryProducts } from '../data/wigProducts'

export default function Gallery() {
  const navigate = useNavigate()
  const products = getGalleryProducts()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      <p className="text-xs uppercase tracking-section text-accent font-semibold mb-2">Our Work</p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">Wig Gallery</h1>
      <p className="text-charcoal/70 mb-10 max-w-xl">
        Browse our collection of stunning wig transformations and styles.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => navigate(`/product/${p.id}`)}
            className="group text-left rounded-card-lg overflow-hidden bg-white border border-sand shadow-card card-lift"
          >
            <div className="aspect-[3/4] bg-primary overflow-hidden">
              <video
                src={p.video}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
            </div>
            <div className="p-4">
              <p className="font-medium text-primary truncate">{p.name}</p>
              <p className="text-sm text-charcoal/70 mt-0.5">₦{p.price.toLocaleString()}</p>
            </div>
          </button>
        ))}
      </div>
      <p className="mt-10 text-center text-charcoal/70 text-sm">
        View more on{' '}
        <a
          href="https://instagram.com/Oyedelecomfortoluwaseun"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:text-accent transition-colors"
        >
          Instagram →
        </a>
      </p>
    </div>
  )
}
