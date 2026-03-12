import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <p className="text-sm text-pink-500 font-medium mb-2">💖 Meet the Founder</p>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Hi, I&apos;m Comfort</h1>
      <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
        <p className="leading-relaxed">
          I am a professional hairstylist skilled at transforming hair into top-class luxury styles. I specialize in making high-quality wigs that enhance confidence and beauty.
        </p>
        <p className="leading-relaxed">
          Over the years, I have worked with many amazing and high-value clients, delivering premium results and satisfied smiles. Every wig I create is crafted with love, precision, and attention to detail.
        </p>
        <p className="leading-relaxed">
          Comfy Hair Brand was created to provide women with comfortable, affordable, and luxury wigs they can wear with confidence. Because every woman deserves to feel like royalty.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => navigate('/gallery')}
          className="px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors"
        >
          View My Work
        </button>
        <a
          href="https://wa.me/2348116500217"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded hover:bg-gray-900 hover:text-white transition-colors"
        >
          Watch Video / Chat
        </a>
      </div>
      {/* Stats */}
      <div className="mt-16 grid grid-cols-3 gap-6 text-center border-t border-gray-200 pt-12">
        <div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">5+</p>
          <p className="text-sm text-gray-600">Years Experience</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">500+</p>
          <p className="text-sm text-gray-600">Wigs Created</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">100%</p>
          <p className="text-sm text-gray-600">Client Satisfaction</p>
        </div>
      </div>
    </div>
  )
}
