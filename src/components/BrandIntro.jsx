import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PILLARS = [
  {
    num: '01',
    title: 'Warm Hospitality',
    desc: 'Unrushed consultations and serene, ambient tea rituals upon arrival.',
    icon: 'local_cafe',
  },
  {
    num: '02',
    title: 'Expert Mastery',
    desc: 'Trained artists dedicated to high-precision hair, skin, and styling crafts.',
    icon: 'workspace_premium',
  },
  {
    num: '03',
    title: 'Gender Neutral',
    desc: 'A sanctuary built without barriers—welcoming women, men, and teens alike.',
    icon: 'groups',
  },
]

export default function BrandIntro() {
  const gridRef = useRef(null)
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [played, setPlayed] = useState(false)
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  // Reveal the cards with a stagger the moment they scroll into view.
  // Entrance classes are removed after playing so hover motion stays instant.
  useEffect(() => {
    if (reduced) {
      setVisible(true)
      setPlayed(true)
      return
    }
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <section id="about" className="w-full bg-surface-container-lowest py-20 md:py-28 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
          <div className="lg:col-span-4 flex flex-col gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              Philosophy &amp; Care
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              More than a beauty studio.
            </h2>
            <span className="font-headline-md text-headline-md text-primary italic font-light">
              It&apos;s your moment.
            </span>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-8">
            <p className="font-headline-sm text-headline-sm text-on-surface-variant font-light leading-relaxed">
              At Amarpali Beauty Studio, beauty is personal. Every look, every detail, and every
              experience is thoughtfully designed around you. From everyday grooming to special
              occasions, we create experiences that help you look confident, feel beautiful, and
              leave feeling your absolute best.
            </p>
            <div
              ref={gridRef}
              onTransitionEnd={() => setPlayed(true)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4"
            >
              {PILLARS.map((p, i) => (
                <div
                  key={p.num}
                  style={played ? undefined : { transitionDelay: `${i * 140}ms` }}
                  className={`${played ? '' : 'reveal'} ${
                    visible && !played ? 'reveal-visible' : ''
                  }`}
                >
                  <div
                    className={reduced ? undefined : 'animate-sway'}
                    style={reduced ? undefined : { animationDelay: `${i * 1.5}s` }}
                  >
                    <div className="group relative p-6 rounded-2xl bg-surface-container-low flex flex-col gap-2 overflow-hidden ring-1 ring-transparent hover:ring-primary/20 hover:bg-surface-container hover:-translate-y-1.5 hover:shadow-[0_20px_44px_-12px_rgba(118,90,38,0.35)] transition-all duration-500">
                      {/* gold top-line sweep on hover */}
                      <span className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-primary-container via-primary to-primary-container" />
                      <div className="flex items-start justify-between">
                        <span className="font-display-xl text-display-xl text-primary/40 group-hover:text-primary/70 font-light leading-none transition-colors duration-500">
                          {p.num}
                        </span>
                        <span className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center ring-1 ring-primary/15 transition-all duration-500 group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 group-hover:rotate-6">
                          <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                        </span>
                      </div>
                      <h4 className="font-title-md text-title-md text-on-surface pt-1">{p.title}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <a
                className="inline-flex items-center gap-2 font-label-lg text-label-lg text-on-surface hover:text-primary transition-colors group"
                href="/about"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/about')
                }}
              >
                <span>Discover Our Story</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  east
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
