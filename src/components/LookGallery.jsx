import { useCallback, useEffect, useRef, useState } from 'react'
import { IMAGES } from '../data/images.js'

const SHOTS = [
  {
    src: '/dulhan.png',
    title: 'Signature Bridal Glow',
    sub: 'HD bridal artistry, nath & heirloom jewellery',
    span: 'md:col-span-7',
    h: 'h-[320px] md:h-[380px]',
    pos: 'object-top',
  },
  {
    src: '/dulhan-2.png',
    title: 'Bridal Lehenga Moments',
    sub: 'Complete bridal styling in our studio',
    span: 'md:col-span-5',
    h: 'h-[320px] md:h-[380px]',
    pos: 'object-[70%_10%]',
  },
  {
    src: IMAGES.menHairBeard,
    title: 'Modern Haircut & Beard',
    sub: 'Sharp grooming for men',
    span: 'md:col-span-4',
    h: 'h-[260px] md:h-[300px]',
    pos: 'object-top',
  },
  {
    src: IMAGES.skinRadiance,
    title: 'Skin Radiance Treatment',
    sub: 'Glow facials & festive shine',
    span: 'md:col-span-4',
    h: 'h-[260px] md:h-[300px]',
    pos: 'object-[50%_20%]',
  },
  {
    src: IMAGES.mehndiHands,
    title: 'Mehndi, Nails & Spa',
    sub: 'Henna, bangles & finesse',
    span: 'md:col-span-4',
    h: 'h-[260px] md:h-[300px]',
    pos: 'object-center',
  },
]

export default function LookGallery() {
  const [active, setActive] = useState(null) // index | null
  const touchX = useRef(null)

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(() => setActive((i) => (i === null ? i : (i + 1) % SHOTS.length)), [])
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + SHOTS.length) % SHOTS.length)),
    [],
  )

  // Keyboard nav + scroll lock while open
  useEffect(() => {
    if (active === null) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close, next, prev])

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (dx < -40) next()
    else if (dx > 40) prev()
    touchX.current = null
  }

  const current = active === null ? null : SHOTS[active]

  return (
    <section id="gallery" className="w-full bg-surface py-20 md:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              Portfolio &amp; Moments
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface pt-1">
              The Amarpali Look.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant pt-2">
              Real work on real Indian clients — tap any photo to view it up close.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low text-on-surface font-label-md text-label-md self-start md:self-auto ring-1 ring-primary/15">
            <span className="material-symbols-outlined text-primary text-[18px]">photo_library</span>
            100% Real Studio Work
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {SHOTS.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-3xl bg-surface-container-high ring-1 ring-primary/10 shadow-[0_20px_48px_-8px_rgba(73,61,53,0.10)] cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${s.span} ${s.h}`}
            >
              <img
                src={s.src}
                alt={s.title}
                loading="lazy"
                className={`w-full h-full object-cover ${s.pos} transition-transform duration-700 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent pointer-events-none" />
              <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-inverse-surface/50 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </span>
              <div className="absolute bottom-0 inset-x-0 p-5 flex items-end">
                <span className="font-label-md text-label-md px-3 py-1.5 rounded-full bg-surface/90 text-on-surface backdrop-blur">
                  {s.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Lightbox slider (same as awards) ---------- */}
      {current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-inverse-surface/85 backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery photo viewer"
        >
          <div
            className="relative w-full max-w-4xl flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex items-center justify-between text-white/90">
              <span className="inline-flex items-center gap-2 font-label-md text-label-md px-3.5 py-1.5 rounded-full bg-white/10 ring-1 ring-white/20">
                <span className="material-symbols-outlined text-[16px] text-primary-fixed-dim">
                  photo_library
                </span>
                {active + 1} / {SHOTS.length}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close viewer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary hover:text-on-primary ring-1 ring-white/20 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black/40 ring-1 ring-primary-fixed/30 shadow-[0_28px_80px_-12px_rgba(0,0,0,0.6)]">
              <img
                key={current.src}
                src={current.src}
                alt={current.title}
                className="animate-fade-up w-full max-h-[68vh] object-contain"
              />
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-surface-container-lowest/90 hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center shadow-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-surface-container-lowest/90 hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center shadow-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">chevron_right</span>
              </button>
            </div>

            <div className="flex flex-col items-center text-center gap-0.5">
              <h3 className="font-title-md text-title-md text-white">{current.title}</h3>
              <p className="font-body-sm text-body-sm text-white/70">{current.sub}</p>
            </div>

            <div className="flex items-center justify-center gap-2.5 pt-1">
              {SHOTS.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View ${s.title}`}
                  className={`h-14 w-14 rounded-xl overflow-hidden ring-2 transition-all duration-300 ${
                    i === active
                      ? 'ring-primary-fixed scale-105 opacity-100'
                      : 'ring-white/15 opacity-50 hover:opacity-90'
                  }`}
                >
                  <img src={s.src} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
