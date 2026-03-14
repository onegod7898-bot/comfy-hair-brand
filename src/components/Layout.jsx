import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
]

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { count } = useCart()

  return (
    <div className="min-h-screen flex flex-col bg-page">
      <header className="sticky top-0 z-50 bg-page/95 backdrop-blur-md border-b border-sand shadow-nav">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-[4.25rem]">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 shrink-0 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 rounded-lg"
          >
            <img
              src="/logo.png"
              alt="Comfy Hair Brand"
              className="h-9 md:h-10 w-auto object-contain"
            />
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ path, label }) => {
              const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
              return (
                <button
                  key={path}
                  type="button"
                  onClick={() => navigate(path)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-charcoal/70 hover:text-primary'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="relative p-2.5 text-charcoal/80 hover:text-primary rounded-full hover:bg-page-dark transition-colors duration-200"
              aria-label="Cart"
            >
              <span className="text-xl" aria-hidden>🛒</span>
              {count > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-accent text-white text-xs font-semibold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="ml-1 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-pill hover:bg-primary-dark transition-all duration-200 shadow-soft"
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className="md:hidden flex items-center gap-2 overflow-x-auto px-4 pb-3 pt-1 scrollbar-hide border-t border-sand/80">
          {navLinks.map(({ path, label }) => {
            const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
            return (
              <button
                key={path}
                type="button"
                onClick={() => navigate(path)}
                className={`shrink-0 px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-white' : 'bg-page-dark text-charcoal hover:bg-sand'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-sand bg-page-dark/80 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-display text-xl font-semibold text-primary">Comfy Hair Brand</p>
              <p className="text-sm text-charcoal/70 mt-1">Luxury wigs without the luxury price.</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <button type="button" onClick={() => navigate('/shop')} className="text-charcoal/70 hover:text-primary transition-colors">
                Shop
              </button>
              <button type="button" onClick={() => navigate('/about')} className="text-charcoal/70 hover:text-primary transition-colors">
                About
              </button>
              <button type="button" onClick={() => navigate('/contact')} className="text-charcoal/70 hover:text-primary transition-colors">
                Contact
              </button>
              <a href="https://wa.me/2348116500217" target="_blank" rel="noopener noreferrer" className="text-charcoal/70 hover:text-primary transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
          <p className="text-xs text-charcoal/50 mt-8 pt-6 border-t border-sand/50">
            © {new Date().getFullYear()} Comfy Hair Brand. All rights reserved.
          </p>
        </div>
      </footer>

      <a
        href="https://wa.me/2348116500217?text=Hello!%20I'm%20interested%20in%20Comfy%20Hair%20Brand%20wigs."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[#22c55e] text-white text-sm font-semibold rounded-full shadow-card hover:shadow-card-hover hover:scale-105 transition-all duration-200"
      >
        <span aria-hidden>💬</span>
        Chat with us
      </a>
    </div>
  )
}
