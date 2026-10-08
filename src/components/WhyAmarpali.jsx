import { useEffect, useRef, useState } from 'react'

const PILLARS = [
  {
    num: '01',
    title: 'PERSONALIZED',
    desc: 'Every service is tailored precisely to your personal style, skin balance, and day-to-day routine. No cookie-cutter results.',
    icon: 'tune',
  },
  {
    num: '02',
    title: 'PROFESSIONAL',
    desc: 'Focused on uncompromising hygiene, premium cruelty-free products, and a respectful, calming atmosphere.',
    icon: 'verified',
  },
  {
    num: '03',
    title: 'MODERN',
    desc: 'Contemporary beauty methodologies, gentle botanical ingredients, and up-to-date global aesthetic trends.',
    icon: 'auto_awesome',
  },
  {
    num: '04',
    title: 'UNISEX',
    desc: 'A welcoming, non-intimidating studio designed purposefully for all genders to feel comfortable and celebrated.',
    icon: 'groups',
  },
]

export default function WhyAmarpali() {
  const gridRef = useRef(null)
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
    <section className="w-full bg-surface py-20 md:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col items-center text-center max-w-xl mx-auto gap-3">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Our Core Pillars
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Why Amarpali?</h2>
          <p className="font-body-md text-body-md text-on-surface-variant font-light">
            Thoughtfully crafted to redefine salon experiences in Roorkee.
          </p>
        </div>
        <div
          ref={gridRef}
          onTransitionEnd={() => setPlayed(true)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
                <div className="group relative flex flex-col gap-4 p-8 rounded-2xl bg-surface-container-low/70 overflow-hidden ring-1 ring-transparent hover:ring-primary/20 hover:bg-surface-container-low hover:-translate-y-1.5 hover:shadow-[0_20px_44px_-12px_rgba(118,90,38,0.35)] transition-all duration-500 h-full">
                  {/* gold top-line sweep on hover */}
                  <span className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-primary-container via-primary to-primary-container" />
                  <div className="flex items-start justify-between">
                    <span className="font-display-xl text-display-xl text-primary group-hover:text-on-primary-fixed-variant font-light leading-none transition-colors duration-500">
                      {p.num}
                    </span>
                    <span className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center ring-1 ring-primary/15 transition-all duration-500 group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 group-hover:rotate-6">
                      <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                    </span>
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface tracking-wide">
                    {p.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
