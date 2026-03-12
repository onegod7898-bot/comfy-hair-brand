import { useNavigate } from 'react-router-dom'

const mockMessages = [
  { id: 1, from: 'support', text: 'Hi! How can we help you today?', time: '10:30' },
  { id: 2, from: 'user', text: 'I have a question about my order.', time: '10:32' },
  { id: 3, from: 'support', text: 'Sure, please share your order number and we\'ll look into it.', time: '10:33' },
]

export default function Chat() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] pb-20">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button type="button" onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600" aria-label="Back">←</button>
          <h1 className="text-lg font-semibold text-gray-900">Help Center</h1>
          <div className="w-9" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                msg.from === 'user'
                  ? 'bg-primary text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-900 rounded-bl-md'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.from === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm"
          />
          <button
            type="button"
            className="px-4 py-3 bg-primary text-white rounded-full font-medium"
            aria-label="Send"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
