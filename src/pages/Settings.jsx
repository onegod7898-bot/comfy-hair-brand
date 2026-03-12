import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button type="button" onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600" aria-label="Back">←</button>
          <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
          <div className="w-9" />
        </div>
      </header>

      <div className="px-4 py-6 space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-900">Notifications</span>
          <button
            type="button"
            role="switch"
            aria-checked={notifications}
            onClick={() => setNotifications((v) => !v)}
            className={`w-11 h-6 rounded-full transition-colors ${notifications ? 'bg-primary' : 'bg-gray-200'}`}
          >
            <span className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${notifications ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-900">Dark Mode</span>
          <button
            type="button"
            role="switch"
            aria-checked={darkMode}
            onClick={() => setDarkMode((v) => !v)}
            className={`w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-gray-200'}`}
          >
            <span className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
        <button type="button" className="w-full flex items-center justify-between py-3 border-b border-gray-100 text-left">
          <span className="text-sm font-medium text-gray-900">Language</span>
          <span className="text-sm text-gray-500">English ›</span>
        </button>
        <div className="pt-4 space-y-2">
          <button type="button" className="w-full text-left py-2 text-sm text-gray-600">Privacy Policy</button>
          <button type="button" className="w-full text-left py-2 text-sm text-gray-600">Terms of Service</button>
          <button type="button" className="w-full text-left py-2 text-sm text-gray-600">About Us</button>
        </div>
        <p className="text-xs text-gray-400 pt-4">Version 1.0.0</p>
      </div>
    </div>
  )
}
