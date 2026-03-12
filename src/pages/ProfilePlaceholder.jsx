import { useNavigate, useParams } from 'react-router-dom'

const titles = {
  address: 'My Address',
  payment: 'My Payment',
  notification: 'Notification',
}

export default function ProfilePlaceholder() {
  const navigate = useNavigate()
  const { page } = useParams()
  const title = titles[page] || 'Profile'

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button type="button" onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600" aria-label="Back">←</button>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <div className="w-9" />
        </div>
      </header>
      <div className="px-4 py-12 text-center text-gray-500">
        <p>Coming soon</p>
      </div>
    </div>
  )
}
