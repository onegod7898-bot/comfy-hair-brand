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
      {/* Hero — image bold and straight, gradient only on left for text */}
      <section
        data-hero
        className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col justify-end md:justify-between overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
        }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(90deg, rgba(250,249,247,0.97) 0%, rgba(250,249,247,0.92) 38%, rgba(250,249,247,0.35) 55%, transparent 72%)',
          }}
          aria-hidden
        />
        <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 py-14 md:py-20 flex flex-col min-h-[70vh] justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-section text-accent font-semibold mb-3">
              Your Hair, Your Crown
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-primary leading-[1.1] tracking-tight">
              Luxury Wigs Without the Luxury Price
            </h1>
            <p className="text-charcoal/80 text-base md:text-lg mt-6 leading-relaxed max-w-lg">
              Affordable. Stylish. Confidence in Every Strand. Transform your look with premium quality wigs crafted for everyday queens.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="px-7 py-3.5 bg-primary text-white font-semibold rounded-pill hover:bg-primary-dark transition-all duration-200 shadow-card hover:shadow-card-hover"
              >
                Shop Now →
              </button>
              <a
                href="https://wa.me/2348116500217"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-white border-2 border-primary text-primary font-semibold rounded-pill hover:bg-primary hover:text-white transition-all duration-200"
              >
                Book Appointment
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 md:gap-8 pt-10 mt-10 border-t border-sand max-w-md">
            <div>
              <p className="font-display text-3xl md:text-4xl font-semibold text-primary">500+</p>
              <p className="text-sm text-charcoal/70 mt-0.5">Happy Clients</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-semibold text-primary">70+</p>
              <p className="text-sm text-charcoal/70 mt-0.5">Community Members</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-semibold text-primary">5★</p>
              <p className="text-sm text-charcoal/70 mt-0.5">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        {/* Shop by style */}
        <section className="mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-section text-accent font-semibold mb-2">Shop by style</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6">
            Find your look
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
            {getFirstProductPerCategory().map(({ category: cat, product }) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => navigate(product ? `/product/${product.id}` : `/shop?cat=${cat.id}`)}
                className="group text-left rounded-card-lg overflow-hidden bg-white border border-sand shadow-card card-lift hover:border-sand"
              >
                <div className="aspect-[3/4] bg-primary relative overflow-hidden">
                  {product ? (
                    <video
                      src={product.video}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                    <span className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-semibold text-primary shadow-soft">
                      ₦{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-primary">{cat.name}</h3>
                  <p className="text-sm text-charcoal/70 mt-1 line-clamp-2">{cat.description}</p>
                  <span className="inline-block mt-4 text-sm font-medium text-accent border border-accent/40 px-4 py-2 rounded-lg hover:bg-accent-light/50 transition-colors">
                    Shop Now
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-section text-accent font-semibold mb-2">Bestsellers</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-1">
            Featured Products
          </h2>
          <p className="text-charcoal/70 mb-8 max-w-xl">
            Handpicked bestsellers loved by our community. Quality you can trust.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {(featured.length ? featured : galleryProducts).map((p) => (
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
                  <span className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-semibold text-primary shadow-soft">
                    ₦{p.price.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggle(p.id) }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-accent shadow-soft hover:bg-white transition-colors"
                    aria-label={has(p.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {has(p.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-primary truncate">{p.name}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="text-primary font-semibold hover:text-accent transition-colors duration-200"
            >
              View All Products →
            </button>
          </div>
        </section>

        {/* Wig Gallery */}
        <section className="mb-16 md:mb-24">
          <p className="text-xs uppercase tracking-section text-accent font-semibold mb-2">Our Work</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-1">
            Wig Gallery
          </h2>
          <p className="text-charcoal/70 mb-8 max-w-xl">
            Browse our collection of stunning wig transformations and styles.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => navigate(`/product/${p.id}`)}
                className="group relative text-left rounded-card-lg overflow-hidden bg-white border border-sand shadow-card card-lift aspect-square max-h-[300px]"
              >
                <div className="w-full h-full bg-primary overflow-hidden">
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
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-sm font-semibold">₦{p.price.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://instagram.com/Oyedelecomfortoluwaseun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/70 font-medium text-sm hover:text-accent transition-colors"
            >
              View more on Instagram →
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
