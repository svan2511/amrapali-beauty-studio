import { useCallback, useEffect, useRef, useState } from 'react'

const AWARDS = [
  {
    src: '/awards/award-shilpa.jpeg',
    title: 'Beauty Club Association Honour',
    sub: 'Awarded on stage by Shilpa Shetty',
    icon: 'workspace_premium',
    span: 'md:col-span-7',
    h: 'h-[320px] md:h-[380px]',
  },
  {
    src: '/awards/award-karisma.jpeg',
    title: 'Celebrity Honour',
    sub: 'Felicitated by Karisma Kapoor',
    icon: 'military_tech',
    span: 'md:col-span-5',
    h: 'h-[320px] md:h-[380px]',
  },
  {
    src: '/awards/award-golden-wings.jpeg',
    title: 'Golden Wings Award • 2019',
    sub: 'Excellence in beauty artistry',
    icon: 'emoji_events',
    span: 'md:col-span-4',
    h: 'h-[280px] md:h-[320px]',
  },
  {
    src: '/awards/award-framed.jpeg',
    title: 'National Beauty Excellence',
    sub: 'Framed moment of pride',
    icon: 'stars',
    span: 'md:col-span-4',
    h: 'h-[280px] md:h-[320px]',
  },
  {
    src: '/awards/award-event.jpeg',
    title: 'Star-Studded Moments',
    sub: 'Styling beyond the studio',
    icon: 'photo_camera',
    span: 'md:col-span-4',
    h: 'h-[280px] md:h-[320px]',
  },
]

export default function Awards() {
  const [active, setActive] = useState(null) // index | null
  const touchX = useRef(null)

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(() => setActive((i) => (i === null ? i : (i + 1) % AWARDS.length)), [])
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + AWARDS.length) % AWARDS.length)),
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

  const current = active === null ? null : AWARDS[active]

  return (
    <section id="awards" className="w-full bg-surface-container-low py-20 md:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              Moments of Pride
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface pt-1">
              Recognised for artistry.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant pt-2">
              Honoured on national stages and felicitated by icons of Indian cinema — a testament
              to the craft behind every Amarpali ritual.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface text-on-surface font-label-md text-label-md self-start md:self-auto ring-1 ring-primary/15">
            <span className="material-symbols-outlined text-primary text-[18px]">emoji_events</span>
            Award-Winning Studio
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {AWARDS.map((a, i) => (
            <button
              key={a.src}
              type="button"
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-3xl bg-surface-container-high ring-1 ring-primary/10 shadow-[0_20px_48px_-8px_rgba(73,61,53,0.10)] cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${a.span} ${a.h}`}
            >
              <img
                src={a.src}
                alt={a.title}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/70 via-inverse-surface/10 to-transparent" />
              <span className="absolute top-4 left-4 w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur text-primary flex items-center justify-center ring-1 ring-white/40">
                <span className="material-symbols-outlined text-[20px]">{a.icon}</span>
              </span>
              <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-inverse-surface/50 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </span>
              <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col gap-0.5">
                <h3 className="font-title-md text-title-md text-white">{a.title}</h3>
                <p className="font-body-sm text-body-sm text-white/80">{a.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Lightbox slider ---------- */}
      {current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-inverse-surface/85 backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Awards photo viewer"
        >
          <div
            className="relative w-full max-w-4xl flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* top bar */}
            <div className="flex items-center justify-between text-white/90">
              <span className="inline-flex items-center gap-2 font-label-md text-label-md px-3.5 py-1.5 rounded-full bg-white/10 ring-1 ring-white/20">
                <span className="material-symbols-outlined text-[16px] text-primary-fixed-dim">
                  emoji_events
                </span>
                {active + 1} / {AWARDS.length}
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

            {/* image */}
            <div className="relative rounded-2xl overflow-hidden bg-black/40 ring-1 ring-primary-fixed/30 shadow-[0_28px_80px_-12px_rgba(0,0,0,0.6)]">
              <img
                key={current.src}
                src={current.src}
                alt={current.title}
                className="animate-fade-up w-full max-h-[68vh] object-contain"
              />
              {/* prev / next */}
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

            {/* caption */}
            <div className="flex flex-col items-center text-center gap-0.5">
              <h3 className="font-title-md text-title-md text-white">{current.title}</h3>
              <p className="font-body-sm text-body-sm text-white/70">{current.sub}</p>
            </div>

            {/* thumbnails */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 px-2">
              {AWARDS.map((a, i) => (
                <button
                  key={a.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View ${a.title}`}
                  className={`h-14 w-14 rounded-xl overflow-hidden ring-2 transition-all duration-300 ${
                    i === active
                      ? 'ring-primary-fixed scale-105 opacity-100'
                      : 'ring-white/15 opacity-50 hover:opacity-90'
                  }`}
                >
                  <img src={a.src} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
