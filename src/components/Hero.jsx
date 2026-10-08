import { useCallback, useEffect, useState } from 'react'
import { HERO_SLIDES } from '../data/images.js'
import { useBooking } from '../lib/booking.jsx'

const AUTOPLAY_MS = 6500

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = HERO_SLIDES.length
  const slide = HERO_SLIDES[index]
  const { openBooking } = useBooking()

  const go = useCallback((i) => setIndex(((i % total) + total) % total), [total])

  // Autoplay — steady interval + resume when tab becomes visible again,
  // so it never gets stuck. Hovering the photo pauses (mouse devices only).
  useEffect(() => {
    if (paused || total < 2) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, AUTOPLAY_MS)
    const onVis = () => {
      if (!document.hidden) setIndex((i) => (i + 1) % total)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [paused, total])

  const canHover = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  return (
    <section
      id="home"
      className="relative w-full bg-surface pt-28 md:pt-36 pb-14 md:pb-20 px-6 lg:px-12 overflow-hidden"
    >
      {/* ambient editorial glows */}
      <div className="animate-blob absolute -top-32 -left-32 w-96 h-96 rounded-full bg-surface-container-high/60 blur-3xl pointer-events-none" />
      <div className="animate-blob-2 absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-surface-variant/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border border-primary/15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-10 items-center">
        {/* ============ LEFT: clean content panel (never fights the photo) ============ */}
        <div className="flex flex-col items-start gap-6 order-2 lg:order-1">
          {/* per-slide text cross-fades with the photo */}
          <div key={`text-${index}`} className="flex flex-col items-start gap-6 w-full">
            <div
              className="animate-fade-up flex flex-wrap items-center gap-3"
              style={{ animationDelay: '0.05s' }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/60 text-on-secondary-container font-label-md text-label-md ring-1 ring-secondary/20 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary pulse-dot"></span>
                {slide.eyebrow} • Roorkee
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider ring-1 ring-primary/15">
                <span className="material-symbols-outlined text-[14px] text-primary">auto_awesome</span>
                Unisex Studio
              </span>
            </div>

            <h1
              className="animate-fade-up font-display-xl text-display-xl text-on-surface leading-[1.08] tracking-tight text-balance"
              style={{ animationDelay: '0.12s' }}
            >
              {slide.titleA}{' '}
              <span className="relative inline-block italic font-light text-primary">
                {slide.titleAccent}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 220 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 9C60 3 160 3 217 8"
                    stroke="url(#gold)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gold" x1="0" x2="220" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#c9a66b" />
                      <stop offset="1" stopColor="#765a26" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p
              className="animate-fade-up font-body-lg text-body-lg text-on-surface-variant max-w-xl font-light leading-relaxed"
              style={{ animationDelay: '0.2s' }}
            >
              {slide.sub}
            </p>
          </div>

          {/* constant CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn-shine group inline-flex items-center justify-center gap-2 font-label-lg text-label-lg px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-container to-[#d8b67e] text-on-primary-container shadow-[0_14px_36px_-10px_rgba(118,90,38,0.5)] ring-1 ring-primary/25 hover:bg-primary hover:text-on-primary hover:-translate-y-0.5 transition-all duration-300"
            >
              Book an Appointment
              <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                arrow_outward
              </span>
            </button>
            <a
              className="group inline-flex items-center gap-2 font-label-lg text-label-lg px-6 py-3.5 rounded-full bg-surface-container-low text-on-surface ring-1 ring-primary/10 hover:bg-surface-container hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              href="#services"
            >
              <span>Explore Services</span>
              <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-y-0.5">
                arrow_downward
              </span>
            </a>
          </div>

          {/* trust stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md w-full">
            {[
              { top: '100%', bottom: 'Unisex Rituals' },
              { top: '4.9★', bottom: 'Google Rating' },
              { top: '7 Days', bottom: 'Open Weekly' },
            ].map((s, i) => (
              <div
                key={s.bottom}
                className={`flex flex-col ${i > 0 ? 'border-l border-primary/15 pl-4 sm:pl-6' : ''}`}
              >
                <span className="font-headline-md text-headline-md text-on-surface font-normal">
                  {s.top}
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline pt-1">
                  {s.bottom}
                </span>
              </div>
            ))}
          </div>

          {/* slider controls: counter + progress + arrows */}
          {total > 1 && (
            <div className="flex items-center gap-4 w-full max-w-md pt-1">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="w-10 h-10 shrink-0 rounded-full bg-surface-container-low text-on-surface ring-1 ring-primary/15 hover:bg-primary hover:text-on-primary flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
                className="w-10 h-10 shrink-0 rounded-full bg-surface-container-low text-on-surface ring-1 ring-primary/15 hover:bg-primary hover:text-on-primary flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">{paused ? 'play_arrow' : 'pause'}</span>
              </button>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-outline tabular-nums">
                    {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                  <span key={`cap-${index}`} className="animate-fade-up font-label-sm text-label-sm uppercase tracking-widest text-primary">
                    {slide.cardTitle}
                  </span>
                </div>
                <div className="h-[3px] rounded-full bg-primary/15 overflow-hidden">
                  <div
                    key={`bar-${index}${paused ? '-p' : ''}`}
                    className={paused ? 'h-full w-full bg-primary/40' : 'animate-slide-progress h-full bg-gradient-to-r from-primary-container to-primary rounded-full'}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="w-10 h-10 shrink-0 rounded-full bg-surface-container-low text-on-surface ring-1 ring-primary/15 hover:bg-primary hover:text-on-primary flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          )}
        </div>

        {/* ============ RIGHT: photo stage — images shine here ============ */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <div
            className="relative w-full max-w-2xl"
            onMouseEnter={() => {
              if (canHover()) setPaused(true)
            }}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-b from-surface-container-high/70 to-surface-container-high/30 -rotate-2 ring-1 ring-primary/10" />
            <div className="relative overflow-hidden rounded-[2rem] aspect-[1600/727] md:aspect-auto md:h-[600px] ring-1 ring-primary/15 shadow-[0_28px_60px_-12px_rgba(118,90,38,0.35)] bg-surface-variant">
              {HERO_SLIDES.map((s, i) => (
                <div
                  key={s.src}
                  aria-hidden={i !== index}
                  className={`absolute inset-0 transition-opacity duration-[1300ms] ease-out ${
                    i === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    key={`${s.src}-${i === index ? 'on' : 'off'}`}
                    src={s.src}
                    alt={i === index ? s.alt : ''}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    className={`w-full h-full object-cover ${i === index ? 'animate-hero-bg' : ''}`}
                  />
                </div>
              ))}
              {/* gentle legibility gradient only at caption zone */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-inverse-surface/55 to-transparent pointer-events-none" />
              {/* per-slide caption chip */}
              <div key={`chip-${index}`} className="animate-fade-up absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                <div className="bg-surface-container-lowest/90 backdrop-blur px-4 py-2.5 rounded-2xl ring-1 ring-white/40 shadow-lg">
                  <p className="font-label-md text-label-md text-on-surface">{slide.cardTitle}</p>
                  <p className="font-body-sm text-body-sm text-outline">{slide.cardSub}</p>
                </div>
                <span className="hidden sm:flex w-11 h-11 shrink-0 rounded-full bg-surface-container-lowest/90 backdrop-blur text-primary items-center justify-center ring-1 ring-white/40">
                  <span className="material-symbols-outlined text-[20px]">spa</span>
                </span>
              </div>
            </div>

            {/* floating rating pill */}
            <div className="animate-float absolute -top-5 -right-2 sm:-right-5 bg-surface-container-lowest/95 backdrop-blur px-4 py-2.5 rounded-full shadow-[0_14px_36px_-8px_rgba(73,61,53,0.25)] ring-1 ring-primary/15 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">star</span>
              <span className="font-label-md text-label-md text-on-surface">4.9 Loved in Roorkee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
