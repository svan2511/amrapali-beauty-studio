import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const SHOTS = [
  {
    src: '/dulhan.webp',
    title: 'Signature Bridal Glow',
    sub: 'HD bridal artistry, nath & heirloom jewellery',
    cat: 'bridal',
    pos: 'object-[50%_5%]',
  },
  {
    src: '/dulhan-2.webp',
    title: 'Bridal Lehenga Moments',
    sub: 'Complete bridal styling in our studio',
    cat: 'bridal',
    pos: 'object-[50%_25%]',
  },
  {
    src: '/beared.webp',
    title: 'Modern Haircut & Beard',
    sub: 'Sharp grooming for men',
    cat: 'grooming',
    pos: 'object-[50%_22%]',
  },
  {
    src: '/dulhan-3.webp',
    title: 'Royal Bridal Look',
    sub: 'Real Amarpali bride, in-studio',
    cat: 'bridal',
    pos: 'object-[50%_20%]',
  },
  {
    src: '/dulhan-4.webp',
    title: 'Traditional Bridal Grace',
    sub: 'Real Amarpali bride, in-studio',
    cat: 'bridal',
    pos: 'object-[50%_8%]',
  },
  {
    src: '/dulhan-5.webp',
    title: 'Elegant Bridal Charm',
    sub: 'Real Amarpali bride, in-studio',
    cat: 'bridal',
    pos: 'object-[50%_5%]',
  },
  {
    src: '/dulhan-6.webp',
    title: 'Timeless Bridal Beauty',
    sub: 'Real Amarpali bride, in-studio',
    cat: 'bridal',
    pos: 'object-[50%_10%]',
  },
  {
    src: '/dulhan-7.webp',
    title: 'Radiant Bridal Glow',
    sub: 'Real Amarpali bride, in-studio',
    cat: 'bridal',
    pos: 'object-top',
  },
  {
    src: '/dulhan-8.webp',
    title: 'Classic Bridal Elegance',
    sub: 'Real Amarpali bride, in-studio',
    cat: 'bridal',
    pos: 'object-top',
  },
  {
    src: '/dulhan-9.webp',
    title: 'Dreamy Bridal Portrait',
    sub: 'Real Amarpali bride, in-studio',
    cat: 'bridal',
    pos: 'object-top',
  },
  {
    src: '/dulhan-10.webp',
    title: 'Stunning Bridal Finale',
    sub: 'Real Amarpali bride, in-studio',
    cat: 'bridal',
    pos: 'object-[50%_5%]',
  },
]

const FILTERS = [
  { id: 'all', label: 'All Looks' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'grooming', label: 'Grooming' },
]

const PAGE = 4

// Editorial spans: first two large (7+5), rest small.
// Exactly 4 visible → last two go 6+6 so the row fills neatly.
function spanFor(i, n) {
  if (n === 1) return 'md:col-span-12'
  if (n === 2) return 'md:col-span-6'
  if (i === 0) return 'md:col-span-7'
  if (i === 1) return 'md:col-span-5'
  if (n === 4) return 'md:col-span-6'
  return 'md:col-span-4'
}

function heightFor(i, n) {
  if (n <= 2) return 'h-[320px] md:h-[380px]'
  if (i < 2) return 'h-[320px] md:h-[380px]'
  return 'h-[260px] md:h-[300px]'
}

export default function LookGallery() {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState(null) // index into filtered | null
  const touchX = useRef(null)

  const filtered = useMemo(
    () => (filter === 'all' ? SHOTS : SHOTS.filter((s) => s.cat === filter)),
    [filter],
  )
  const visible = expanded ? filtered : filtered.slice(0, PAGE)

  const counts = useMemo(
    () => ({
      all: SHOTS.length,
      bridal: SHOTS.filter((s) => s.cat === 'bridal').length,
      grooming: SHOTS.filter((s) => s.cat === 'grooming').length,
    }),
    [],
  )

  const pickFilter = (id) => {
    setFilter(id)
    setExpanded(false)
  }

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length],
  )
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length],
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

  const current = active === null ? null : filtered[active]

  return (
    <section id="gallery" className="w-full bg-surface py-20 md:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
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

        {/* ---------- Category filter ---------- */}
        <div className="flex flex-wrap items-center gap-2.5">
          {FILTERS.map((f) => {
            const on = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => pickFilter(f.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-label-md text-label-md ring-1 transition-all duration-300 ${
                  on
                    ? 'bg-primary text-on-primary ring-primary shadow-[0_10px_28px_-8px_rgba(118,90,38,0.6)]'
                    : 'bg-surface-container-low text-on-surface-variant ring-primary/15 hover:ring-primary/35 hover:text-on-surface'
                }`}
              >
                {f.label}
                <span
                  className={`text-[11px] tabular-nums px-1.5 py-0.5 rounded-full ${
                    on ? 'bg-white/20' : 'bg-primary/10 text-primary'
                  }`}
                >
                  {counts[f.id]}
                </span>
              </button>
            )
          })}
          <span className="ml-auto font-body-sm text-body-sm text-outline">
            Showing {visible.length} of {filtered.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {visible.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-3xl bg-surface-container-high ring-1 ring-primary/10 shadow-[0_20px_48px_-8px_rgba(73,61,53,0.10)] cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${spanFor(i, visible.length)} ${heightFor(i, visible.length)}`}
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

        {/* ---------- View all / Show less ---------- */}
        {filtered.length > PAGE && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-4 w-full max-w-2xl">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-container/70 to-primary-container/70" />
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-[0.16em] ring-1 ring-primary/15 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                {expanded ? `${filtered.length} looks` : `+${filtered.length - PAGE} more`}
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-primary-container/70 to-primary-container/70" />
            </div>
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-surface-container-low text-on-surface ring-1 ring-primary/15 font-label-lg text-label-lg hover:bg-primary hover:text-on-primary hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>{expanded ? 'Show Less' : `View All ${filtered.length} Looks`}</span>
              <span
                className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${expanded ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
              >
                expand_more
              </span>
            </button>
          </div>
        )}
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
                {active + 1} / {filtered.length}
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

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 px-2">
              {filtered.map((s, i) => (
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
