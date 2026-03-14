import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 md:py-24">
      <p className="text-xs uppercase tracking-section text-accent font-semibold mb-2">Meet the Founder</p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-6">Hi, I&apos;m Comfort</h1>
      <div className="space-y-5 text-charcoal/85 leading-relaxed">
        <p>
          I am a professional hairstylist skilled at transforming hair into top-class luxury styles. I specialize in making high-quality wigs that enhance confidence and beauty.
        </p>
        <p>
          Over the years, I have worked with many amazing and high-value clients, delivering premium results and satisfied smiles. Every wig I create is crafted with love, precision, and attention to detail.
        </p>
        <p>
          Comfy Hair Brand was created to provide women with comfortable, affordable, and luxury wigs they can wear with confidence. Because every woman deserves to feel like royalty.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => navigate('/gallery')}
          className="px-7 py-3.5 bg-primary text-white font-semibold rounded-pill hover:bg-primary-dark transition-all duration-200 shadow-card hover:shadow-card-hover"
        >
          View My Work
        </button>
        <a
          href="https://wa.me/2348116500217"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3.5 border-2 border-primary text-primary font-semibold rounded-pill hover:bg-primary hover:text-white transition-all duration-200"
        >
          Watch Video / Chat
        </a>
      </div>
      <div className="mt-20 grid grid-cols-3 gap-8 text-center border-t border-sand pt-12">
        <div>
          <p className="font-display text-3xl md:text-4xl font-semibold text-primary">5+</p>
          <p className="text-sm text-charcoal/70 mt-1">Years Experience</p>
        </div>
        <div>
          <p className="font-display text-3xl md:text-4xl font-semibold text-primary">500+</p>
          <p className="text-sm text-charcoal/70 mt-1">Wigs Created</p>
        </div>
        <div>
          <p className="font-display text-3xl md:text-4xl font-semibold text-primary">100%</p>
          <p className="text-sm text-charcoal/70 mt-1">Client Satisfaction</p>
        </div>
      </div>
    </div>
  )
}
