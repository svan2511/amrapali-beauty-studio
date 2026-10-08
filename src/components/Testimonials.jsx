import { useEffect, useRef, useState } from 'react'

const ELFSIGHT_ID = '86245944-531e-4e75-a3ac-aa95e701877a'
const FALLBACK_DELAY_MS = 12000

// Auto-swap mode: live widget shows by default; custom fallback appears
// automatically only if the live widget can't load (limit over / blocked).
const PREVIEW_BOTH = false

// Shown ONLY if the live widget can't load (e.g. monthly views over).
// Pixel-matched to the Elfsight slider look: header summary + review slider.
const FALLBACK_REVIEWS = [
  {
    name: 'Aman Sharma',
    initial: 'A',
    color: '#7b1fa2',
    time: '2 months ago',
    text: 'Finally, a true luxury unisex salon in Roorkee where men don\u2019t feel like an afterthought. Exceptional fade haircut and beard grooming.',
  },
  {
    name: 'Priyanshi Rawat',
    initial: 'P',
    color: '#0288d1',
    time: '1 month ago',
    text: 'My engagement makeup was understated and glowing, exactly what I asked for. The skin prep beforehand felt like a mini vacation.',
  },
  {
    name: 'Rhea & Dev M.',
    initial: 'R',
    color: '#00897b',
    time: '3 weeks ago',
    text: 'Such a beautiful experience. Everything felt thoughtful, professional, and genuinely comfortable.',
  },
]

const GOOGLE_PAGE = 'https://maps.app.goo.gl/jKiBJtGo45hPBVPEA'

function GoogleG({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.1 3.5 2.7.2.1c2.2-2 3.8-5 3.8-8.9z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5l-.1.1-3.7 2.9v.1C3.4 21.5 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4l-.1-.1-3.7-2.9-.1.1C.5 8.3 0 10.1 0 12s.5 3.7 1.3 5.3l3.9-2.9z"
      />
      <path
        fill="#EA4335"
        d="M12 4.6c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.4 0 3.4 2.5 1.3 6.7l3.9 2.9c1-2.9 3.7-5 6.8-5z"
      />
    </svg>
  )
}

function GoldStars({ size = 18, value = 5 }) {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-label={`${value} star rating`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill={i < value ? '#FBBC04' : '#dadce0'}
            d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z"
          />
        </svg>
      ))}
    </span>
  )
}

// Multicolor "Google" wordmark + dark "Reviews" — exactly like the live widget header
function GoogleWordmark() {
  return (
    <span className="text-[24px] leading-none font-medium tracking-tight" aria-label="Google Reviews">
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC05' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
      <span className="font-bold text-[19px]" style={{ color: '#1f1f1f' }}>
        {' '}
        Reviews
      </span>
    </span>
  )
}

// Blue verified check shown after reviewer names in the live widget
function VerifiedBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-label="Verified reviewer">
      <circle cx="12" cy="12" r="10" fill="#1a73e8" />
      <path
        d="M10.6 15.6l-3.2-3.2 1.4-1.4 1.8 1.8 4.8-4.8 1.4 1.4-6.2 6.2z"
        fill="#fff"
      />
    </svg>
  )
}

function FallbackReviews() {
  const [index, setIndex] = useState(0)
  const [anim, setAnim] = useState(true)
  const [paused, setPaused] = useState(false)
  const total = FALLBACK_REVIEWS.length
  const touchX = useRef(null)

  // infinite loop: slides 0..total, then silent snap back to 0
  useEffect(() => {
    if (index === total) {
      const t = setTimeout(() => {
        setAnim(false)
        setIndex(0)
      }, 750)
      return () => clearTimeout(t)
    }
    setAnim(true)
  }, [index, total])

  useEffect(() => {
    if (paused || total < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % (total + 1)), 5000)
    return () => clearInterval(id)
  }, [paused, total])

  const step = (dir) => {
    setAnim(true)
    setIndex((i) => {
      const n = i + dir
      if (n < 0) return total - 1
      return n % (total + 1)
    })
  }

  // track holds 2 sets; one step = 100 / trackChildren % of track width
  const TRACK_COUNT = total * 2
  const looped = [...FALLBACK_REVIEWS, ...FALLBACK_REVIEWS]

  return (
    <div className="w-full flex flex-col gap-5">
      {/* ===== widget header: wordmark + 4.0 rating + review count ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl bg-white border border-[#e3e3e3] px-5 py-4">
        <div className="flex flex-col items-center sm:items-start gap-1.5">
          <GoogleWordmark />
          <span className="inline-flex items-center gap-2">
            <span className="text-[20px] leading-none font-bold text-[#1f1f1f]">4.0</span>
            <GoldStars size={22} value={4} />
            <span className="text-[15px] text-[#5f6368]">(80)</span>
          </span>
        </div>
        <a
          href={GOOGLE_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:ml-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1a73e8] hover:bg-[#1765cc] text-white text-[14px] font-medium px-6 py-2.5 transition-colors"
        >
          Review us on Google
        </a>
      </div>

      {/* ===== review slider: 3 visible at a time ===== */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (dx < -40) step(1)
          else if (dx > 40) step(-1)
          touchX.current = null
        }}
      >
        <div className="overflow-hidden rounded-xl -mx-2">
          <div
            className={`flex ${anim ? 'transition-transform duration-700 ease-out' : ''}`}
            style={{ transform: `translateX(-${index * (100 / TRACK_COUNT)}%)` }}
          >
            {looped.map((r, k) => (
              <div key={`${r.name}-${k}`} className="shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2">
                <div className="rounded-xl bg-white border border-[#e3e3e3] p-6 flex flex-col gap-2.5 h-full">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-[18px] font-medium shrink-0"
                      style={{ backgroundColor: r.color }}
                    >
                      {r.initial}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#1f1f1f] leading-tight">
                        {r.name}
                        <VerifiedBadge />
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[13px] text-[#5f6368]">
                        <GoogleG size={14} />
                        {r.time}
                      </span>
                    </div>
                  </div>
                  <GoldStars />
                  <p className="text-[15px] leading-relaxed text-[#1f1f1f]">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* arrows */}
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous reviews"
          className="absolute -left-1 sm:left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#e3e3e3] shadow-md text-[#5f6368] hover:text-[#1f1f1f] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">chevron_left</span>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next reviews"
          className="absolute -right-1 sm:right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#e3e3e3] shadow-md text-[#5f6368] hover:text-[#1f1f1f] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">chevron_right</span>
        </button>

        {/* dots */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {FALLBACK_REVIEWS.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => {
                setAnim(true)
                setIndex(i)
              }}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index % total === i ? 'w-7 bg-[#1a73e8]' : 'w-2 bg-[#dadce0] hover:bg-[#bdc1c6]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const widgetRef = useRef(null)
  const [failed, setFailed] = useState(false)

  // Load Elfsight once — the widget renders live Google reviews into the div below
  useEffect(() => {
    if (document.querySelector('script[data-elfsight]')) return
    const s = document.createElement('script')
    s.src = 'https://elfsightcdn.com/platform.js'
    s.async = true
    s.setAttribute('data-elfsight', 'true')
    document.body.appendChild(s)
  }, [])

  // Watch the widget: if nothing renders in time (limit over / blocked),
  // seamlessly swap to same-design manual reviews. If it renders late,
  // swap back automatically.
  useEffect(() => {
    const el = widgetRef.current
    if (!el) return
    const observer = new MutationObserver(() => {
      if (el.childElementCount > 0) setFailed(false)
    })
    observer.observe(el, { childList: true })
    const timer = setTimeout(() => {
      if (el.childElementCount === 0) setFailed(true)
    }, FALLBACK_DELAY_MS)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <section className="w-full bg-surface-container-lowest py-20 md:py-28 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-6 text-center items-center">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
          Guest Reflections
        </span>
        <div className="flex flex-col gap-0">
          <span className="block h-[30px] md:h-[36px] overflow-hidden font-display-xl text-[52px] md:text-[60px] leading-[1] text-primary/40 font-light">
            “
          </span>
          <blockquote className="font-headline-lg text-headline-lg text-on-surface font-light leading-tight tracking-tight text-balance">
            What Our Customers says about us.
          </blockquote>
        </div>

        {PREVIEW_BOTH ? (
          <>
            {/* TEMP: live widget with label */}
            <div className="w-full flex flex-col gap-3 rounded-2xl ring-2 ring-dashed ring-emerald-500/60 p-4">
              <span className="self-start font-label-md text-label-md px-3 py-1 rounded-full bg-emerald-600 text-white">
                ● LIVE — real Google widget
              </span>
              <div className="w-full min-h-[200px] text-left">
                <div ref={widgetRef}>
                  <div className={`elfsight-app-${ELFSIGHT_ID}`} data-elfsight-app-lazy />
                </div>
              </div>
            </div>
            {/* TEMP: custom fallback with label */}
            <div className="w-full flex flex-col gap-3 rounded-2xl ring-2 ring-dashed ring-amber-500/70 p-4">
              <span className="self-start font-label-md text-label-md px-3 py-1 rounded-full bg-amber-600 text-white">
                ● CUSTOM — humara fallback design
              </span>
              <FallbackReviews />
            </div>
          </>
        ) : (
          /* Live Google Reviews (Elfsight) — or identical fallback */
          <div className="w-full min-h-[380px] text-left">
            <div ref={widgetRef} className={failed ? 'hidden' : undefined}>
              <div className={`elfsight-app-${ELFSIGHT_ID}`} data-elfsight-app-lazy />
            </div>
            {failed && <FallbackReviews />}
          </div>
        )}

        {/* <a
          className="btn-shine inline-flex items-center gap-2 font-label-lg text-label-lg px-7 py-3 rounded-full bg-inverse-surface text-inverse-on-surface hover:bg-primary transition-all duration-300"
          href={GOOGLE_PAGE}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="material-symbols-outlined text-[18px]">reviews</span>
          <span>Review Us on Google</span>
        </a> */}
      </div>
    </section>
  )
}
