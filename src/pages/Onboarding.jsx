import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    title: 'One best app for all your needs',
    text: 'Shop fashion, electronics, food, sports and more in one place.',
    emoji: '🛍️',
  },
  {
    title: 'Get real-time updates for all deliveries',
    text: 'Track your orders from store to doorstep with live updates.',
    emoji: '📍',
  },
  {
    title: 'Follow and get updates from favorite store',
    text: 'Never miss a drop. Get notified when your favorite brands have new arrivals.',
    emoji: '❤️',
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)

  const next = () => {
    if (index < slides.length - 1) setIndex(index + 1)
    else navigate('/auth')
  }

  const skip = () => navigate('/auth')

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col justify-center px-6 pt-12">
        <div className="text-center">
          <span className="text-6xl block mb-6" aria-hidden>{slides[index].emoji}</span>
          <h1 className="text-2xl font-bold text-gray-900">{slides[index].title}</h1>
          <p className="text-gray-600 mt-3 max-w-sm mx-auto">{slides[index].text}</p>
        </div>
        <div className="flex justify-center gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'bg-primary w-6' : 'bg-gray-200 w-2'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="p-6 pb-10">
        <button
          type="button"
          onClick={next}
          className="w-full py-3 bg-primary text-white font-medium rounded-pill hover:bg-primary-dark transition-colors"
        >
          Get Started
        </button>
        <button
          type="button"
          onClick={skip}
          className="w-full mt-3 text-gray-500 text-sm font-medium"
        >
          Skip
        </button>
      </div>
    </div>
  )
}
