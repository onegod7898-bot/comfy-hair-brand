import { useNavigate } from 'react-router-dom'

const menuItems = [
  { path: '/orders', label: 'My Order', icon: '📦' },
  { path: '/favorites', label: 'My Favorites', icon: '❤️' },
  { path: '/profile/address', label: 'My Address', icon: '📍' },
  { path: '/profile/payment', label: 'My Payment', icon: '💳' },
  { path: '/profile/notification', label: 'Notification', icon: '🔔' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
  { path: '/chat', label: 'Help Center', icon: '💬' },
]

export default function Profile() {
  const navigate = useNavigate()

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
        </div>
      </header>

      <div className="px-4 pt-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
            ZK
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Zammora Krystine</h2>
            <p className="text-sm text-gray-500">zammora@example.com</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-card border border-gray-100 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-xl" aria-hidden>{item.icon}</span>
              <span className="text-sm font-medium text-gray-900">{item.label}</span>
              <span className="ml-auto text-gray-400" aria-hidden>›</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => navigate('/auth')}
          className="w-full mt-6 py-3 border border-red-200 text-red-600 font-medium rounded-pill hover:bg-red-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
