import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import {
  getFeaturedProducts,
  getGalleryProducts,
  getFirstProductPerCategory,
} from '../data/wigProducts'

export default function Home() {
  const navigate = useNavigate()
  const { has, toggle } = useFavorites()
  const featured = getFeaturedProducts()
  const galleryProducts = getGalleryProducts()

  return (
    <div>
      {/* Hero with background image - like reference */}
      <section
        className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col justify-between bg-gray-900 py-12 md:py-20 px-4"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/60 to-transparent" aria-hidden />
        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col min-h-[70vh]">
          <div className="max-w-xl text-left">
            <p className="text-sm md:text-base text-gray-700 font-medium mb-2">✨ Your Hair, Your Crown</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Luxury Wigs Without the Luxury Price
            </h1>
            <p className="text-gray-700 text-lg mb-8">
              Affordable. Stylish. Confidence in Every Strand. Transform your look with premium quality wigs crafted for everyday queens.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
              >
                Shop Now
                <span aria-hidden>→</span>
              </button>
              <a
                href="https://wa.me/2348116500217"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded hover:bg-gray-900 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                📅 Book Appointment
              </a>
            </div>
          </div>
          {/* Stats - bottom left of hero */}
          <div className="mt-auto pt-8 grid grid-cols-3 gap-6 text-left max-w-md">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-700">Happy Clients</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">70+</p>
              <p className="text-sm text-gray-700">Community Members</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">5★</p>
              <p className="text-sm text-gray-700">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Shop by style - filled with real product videos */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Shop by style</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {getFirstProductPerCategory().map(({ category: cat, product }) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => navigate(product ? `/product/${product.id}` : `/shop?cat=${cat.id}`)}
                className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md transition-all text-left"
              >
                <div className="aspect-[3/4] bg-black relative">
                  {product ? (
                    <video
                      src={product.video}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">✨</div>
                  )}
                  {product && (
                    <span className="absolute bottom-2 left-2 right-2 bg-white/95 px-2 py-1 rounded text-sm font-semibold text-gray-900">
                      ₦{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{cat.description}</p>
                  <span className="inline-block mt-3 text-sm font-medium text-gray-900 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50">
                    Shop Now
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Products - with videos and prices */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Featured Products</h2>
          <p className="text-gray-600 mb-6">
            Handpicked bestsellers loved by our community. Quality you can trust.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {(featured.length ? featured : galleryProducts).map((p) => (
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
                  <span className="absolute bottom-2 left-2 right-2 bg-white/95 px-2 py-1.5 rounded text-sm font-semibold text-gray-900">
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
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="text-gray-900 font-medium hover:underline"
            >
              View All Products →
            </button>
          </div>
        </section>

        {/* Wig Gallery - videos and prices */}
        <section className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-wider text-pink-500 font-medium mb-1">Our Work</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Wig Gallery</h2>
          <p className="text-gray-600 mb-6">
            Browse our collection of stunning wig transformations and styles.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => navigate(`/product/${p.id}`)}
                className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md transition-all text-left aspect-square max-h-[280px]"
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
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-sm text-gray-600">₦{p.price.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://instagram.com/Oyedelecomfortoluwaseun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 font-medium text-sm hover:underline"
            >
              View more on Instagram →
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
