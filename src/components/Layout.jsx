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
  const { count, total } = useCart()

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* Top website navbar - like comfy-hair-design.vercel.app */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14 md:h-16">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-lg md:text-xl font-bold text-gray-900 tracking-tight"
          >
            Comfy Hair Brand
          </button>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ path, label }) => {
              const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
              return (
                <button
                  key={path}
                  type="button"
                  onClick={() => navigate(path)}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/bag')}
              className="p-2 text-gray-600 hover:text-gray-900 relative"
              aria-label="Cart"
            >
              <span className="text-xl">🛒</span>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="ml-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </button>
          </div>
        </div>
        {/* Mobile nav: compact menu */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide border-t border-gray-100">
          {navLinks.map(({ path, label }) => {
            const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
            return (
              <button
                key={path}
                type="button"
                onClick={() => navigate(path)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium ${
                  isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
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

      {/* Floating Chat button - like reference site */}
      <a
        href="https://wa.me/2348116500217?text=Hello!%20I'm%20interested%20in%20Comfy%20Hair%20Brand%20wigs."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[#22c55e] text-white text-sm font-medium rounded-full shadow-lg hover:bg-[#1ea34e] transition-colors"
      >
        <span aria-hidden>💬</span>
        Chat with us
      </a>
    </div>
  )
}
