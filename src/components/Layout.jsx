import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/shop', label: 'Shop', icon: '🛍️' },
  { path: '/gallery', label: 'Gallery', icon: '📸' },
  { path: '/bag', label: 'Bag', icon: '🛒' },
  { path: '/profile', label: 'Profile', icon: '👤' },
]

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { count, total } = useCart()

  const isShop = location.pathname === '/shop'

  return (
    <div className="min-h-screen flex flex-col pb-24 bg-[#faf8f5]">
      <main className="flex-1">
        <Outlet />
      </main>
      {isShop && count > 0 && (
        <div
          className="fixed bottom-14 left-0 right-0 z-40 bg-primary text-white flex items-center justify-between px-4 py-3 shadow-lg"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={() => navigate('/bag')}
            className="flex items-center gap-2 font-medium"
          >
            View your cart
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {count}
            </span>
          </button>
          <span className="font-semibold">₦{total?.toLocaleString()}</span>
        </div>
      )}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-nav z-50"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex justify-around items-center h-14">
          {navItems.map(({ path, label, icon }) => {
            const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
            const isBag = path === '/bag'
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`}
                aria-label={label}
              >
                <span className="text-xl" aria-hidden>{icon}</span>
                {isBag && count > 0 && (
                  <span className="absolute -top-0.5 right-1/4 min-w-[18px] h-[18px] bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
                <span className="text-xs font-medium">{label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
