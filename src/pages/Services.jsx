import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentCTA from '../components/AppointmentCTA.jsx'
import { useBooking } from '../lib/booking.jsx'
import { SERVICES, SERVICE_CATEGORIES, SERVICE_GALLERY } from '../data/services.js'

const RITUAL_STEPS = [
  { n: '01', t: 'Consult First', d: 'Hair texture, skin type & occasion mapped — no rushed chairs.', icon: 'forum' },
  { n: '02', t: 'Curated Ritual', d: 'Premium, cruelty-free products matched to you.', icon: 'spa' },
  { n: '03', t: 'Sealed Finish', d: 'After-care guidance + touch-up kit where needed.', icon: 'verified' },
]

export default function Services() {
  const navigate = useNavigate()
  const { openBooking } = useBooking()
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null) // gallery lightbox index
  const touchX = useRef(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SERVICES.filter((s) => {
      const matchCat = cat === 'all' || s.category === cat
      if (!matchCat) return false
      if (!q) return true
      return (
        s.title.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q) ||
        s.tags.join(' ').toLowerCase().includes(q)
      )
    })
  }, [cat, query])

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % SERVICE_GALLERY.length)),
    [],
  )
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + SERVICE_GALLERY.length) % SERVICE_GALLERY.length)),
    [],
  )

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

  const current = active === null ? null : SERVICE_GALLERY[active]
  const goBook = 'https://wa.me/917906783475?text=' + encodeURIComponent('Hi Amarpali! I want to book a service.')

  return (
    <main className="w-full bg-background">
      {/* ---------- HERO (About-style) ---------- */}
      <section className="relative w-full bg-surface pt-32 md:pt-44 pb-14 md:pb-20 px-6 lg:px-12 overflow-hidden">
        <div className="animate-blob absolute -top-32 -left-32 w-96 h-96 rounded-full bg-surface-container-high/60 blur-3xl pointer-events-none" />
        <div className="animate-blob-2 absolute top-1/3 right-0 w-[28rem] h-[28rem] rounded-full bg-surface-variant/40 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-start gap-6">
            <nav className="animate-fade-up inline-flex items-center gap-2 font-label-md text-label-md text-outline">
              <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary">Services</span>
            </nav>
            <div className="animate-fade-up flex flex-wrap items-center gap-3" style={{ animationDelay: '0.05s' }}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/60 text-on-secondary-container font-label-md text-label-md ring-1 ring-secondary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary pulse-dot" />
                Full Menu • Unisex
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider ring-1 ring-primary/15">
                <span className="material-symbols-outlined text-[14px] text-primary">auto_awesome</span>
                20 Signature Rituals
              </span>
            </div>
            <h1 className="animate-fade-up font-display-xl text-display-xl text-on-surface leading-[1.08] tracking-tight text-balance" style={{ animationDelay: '0.12s' }}>
              Rituals for hair, skin{' '}
              <span className="italic font-light text-primary">& every occasion.</span>
            </h1>
            <p className="animate-fade-up font-body-lg text-body-lg text-on-surface-variant max-w-xl font-light leading-relaxed" style={{ animationDelay: '0.2s' }}>
              Nanoplastia to Hydra-Glow, Korean glass to bridal artistry — every service starts
              with consultation, uses premium cruelty-free products, and ends with after-care.
            </p>
            <div className="animate-fade-up flex flex-wrap gap-3 pt-1" style={{ animationDelay: '0.26s' }}>
              <a href="#menu" className="btn-shine inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:-translate-y-0.5 transition-all">
                Explore Menu <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </a>
              <a href={goBook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-low text-on-surface ring-1 ring-primary/15 font-label-lg text-label-lg hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined text-[18px] text-primary">chat</span> WhatsApp Booking
              </a>
            </div>
            <div className="animate-fade-up grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-xl pt-2" style={{ animationDelay: '0.3s' }}>
              {[
                { top: '20', bottom: 'Rituals' },
                { top: '4.9★', bottom: 'Google Rating' },
                { top: '7 Days', bottom: 'Open Weekly' },
                { top: '100%', bottom: 'Consult First' },
              ].map((s, i) => (
                <div key={s.bottom} className={`flex flex-col ${i > 0 ? 'border-l border-primary/15 pl-4 sm:pl-6' : ''}`}>
                  <span className="font-headline-md text-headline-md text-on-surface font-normal">{s.top}</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline pt-1">{s.bottom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* arch hero visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="animate-float relative w-full max-w-md">
              <div className="absolute -inset-3 rounded-t-[14rem] rounded-b-3xl bg-surface-container-high/50 -rotate-2 ring-1 ring-primary/10" />
              <div className="relative overflow-hidden rounded-t-[13.5rem] rounded-b-2xl shadow-[0_28px_60px_-12px_rgba(118,90,38,0.35)] ring-1 ring-primary/15 bg-surface-variant">
                <img src="/hero-3.webp" alt="Inside Amarpali studio — hair ritual lounge" className="w-full h-[440px] md:h-[520px] object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
                  <div className="bg-surface-container-lowest/90 backdrop-blur px-4 py-2.5 rounded-2xl ring-1 ring-white/40 shadow-lg">
                    <p className="font-label-md text-label-md text-on-surface">Hair • Skin • Bridal</p>
                    <p className="font-body-sm text-body-sm text-outline">One calm sanctuary</p>
                  </div>
                </div>
              </div>
              <div className="animate-float-delayed absolute -bottom-6 -left-4 sm:-left-6 bg-surface-container-lowest/95 backdrop-blur px-4 py-3 rounded-2xl shadow-lg ring-1 ring-primary/15 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-container to-primary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                </span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Nanoplastia • Botox • Hydra</p>
                  <p className="font-body-sm text-body-sm text-outline">Signature expertise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- RITUAL STRIP ---------- */}
      <section className="w-full bg-surface-container-lowest py-12 md:py-16 px-6 lg:px-12 border-y border-primary/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {RITUAL_STEPS.map((s) => (
            <div key={s.n} className="flex items-start gap-4 rounded-2xl bg-surface-container-low/60 ring-1 ring-primary/10 p-5">
              <span className="w-11 h-11 shrink-0 rounded-full bg-primary text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
              </span>
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary">{s.n}</p>
                <h3 className="font-title-md text-title-md text-on-surface">{s.t}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant pt-1">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- MENU ---------- */}
      <section id="menu" className="w-full bg-surface py-20 md:py-24 px-6 lg:px-12 scroll-mt-28">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Full Menu & Rates</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface pt-1">Choose your ritual.</h2>
              <p className="font-body-md text-body-md text-on-surface-variant pt-2">
                {filtered.length} rituals • Transparent starting prices • Final quote after consultation.
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search — try hydra, botox, bridal…"
                className="w-full pl-11 pr-4 py-3 rounded-full bg-surface-container-low ring-1 ring-primary/15 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* category pills — sticky so they follow on scroll */}
          <div className="sticky top-[68px] md:top-[100px] z-30 -mx-6 px-6 lg:mx-0 lg:px-2 py-3 -my-3 bg-surface/85 backdrop-blur-xl">
            <div className="flex gap-2.5 overflow-x-auto pb-1 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SERVICE_CATEGORIES.map((c) => {
              const on = cat === c.id
              const count = c.id === 'all' ? SERVICES.length : SERVICES.filter((s) => s.category === c.id).length
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-label-md text-label-md ring-1 transition-all duration-300 ${
                    on
                      ? 'bg-primary text-on-primary ring-primary shadow-[0_10px_28px_-8px_rgba(118,90,38,0.6)]'
                      : 'bg-surface-container-low text-on-surface-variant ring-primary/15 hover:ring-primary/35 hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">{c.icon}</span>
                  {c.label}
                  <span className={`text-[11px] tabular-nums px-1.5 py-0.5 rounded-full ${on ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>{count}</span>
                </button>
              )
            })}
            </div>
          </div>

          {/* cards */}
          {filtered.length === 0 ? (
            <div className="rounded-3xl bg-surface-container-low p-12 text-center ring-1 ring-primary/10">
              <p className="font-headline-sm text-headline-sm text-on-surface">No ritual found for “{query}”</p>
              <p className="font-body-md text-body-md text-outline pt-2">Try hydra, keratin, bridal, manicure…</p>
              <button onClick={() => { setQuery(''); setCat('all') }} className="mt-5 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md">Reset menu</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((s, i) => (
                <article
                  key={s.id}
                  className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-surface-container-lowest ring-1 ring-primary/12 shadow-[0_20px_48px_-12px_rgba(73,61,53,0.14)] hover:shadow-[0_28px_64px_-12px_rgba(118,90,38,0.3)] hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="relative h-72 sm:h-80 overflow-hidden">
                    <img src={s.image} alt={s.title} loading="lazy" className={`w-full h-full object-cover ${s.pos ?? 'object-top'} transition-transform duration-700 group-hover:scale-105`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 font-display-xl text-[26px] text-white/85 font-light tabular-nums drop-shadow">{s.num}</span>
                    {s.badge && (
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest/92 backdrop-blur text-on-surface font-label-sm text-label-sm uppercase tracking-wider ring-1 ring-white/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {s.badge}
                      </span>
                    )}
                    <span className="absolute bottom-4 left-4 w-11 h-11 rounded-full bg-surface-container-lowest/92 backdrop-blur text-primary flex items-center justify-center ring-1 ring-white/40">
                      <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                    </span>
                    <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-inverse-surface/60 backdrop-blur text-white font-label-md text-label-md">
                      {s.duration}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5 p-5 sm:p-6 flex-1">
                    <div>
                      <p className="font-label-sm text-label-sm uppercase tracking-[0.16em] text-primary">
                        {SERVICE_CATEGORIES.find((c) => c.id === s.category)?.label}
                      </p>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface pt-1 leading-snug">{s.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant font-light pt-1.5">{s.short}</p>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline leading-relaxed">{s.detailed}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {s.tags.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full bg-surface-container font-label-md text-label-md text-on-surface-variant ring-1 ring-primary/10">{t}</span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-primary/10">
                      <span className="font-title-md text-title-md text-on-surface">{s.price}</span>
                      <button
                        type="button"
                        onClick={() => openBooking(s.title)}
                        className="btn-shine inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-on-surface transition-colors"
                      >
                        Book <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                      </button>
                    </div>
                  </div>
                  <span className="absolute inset-x-8 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </article>
              ))}
            </div>
          )}

          <p className="text-center font-body-sm text-body-sm text-outline">
            * Starting prices — final quote after free consultation. Patch / strand test included where needed.
          </p>
        </div>
      </section>

      {/* ---------- GALLERY SLIDER (same as About Awards) ---------- */}
      <section className="w-full bg-surface-container-low py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Inside The Studio</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface pt-1">See the rituals, feel the calm.</h2>
              <p className="font-body-md text-body-md text-on-surface-variant pt-2">Tap any photo for a full-screen slider — same experience as our About gallery.</p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface text-on-surface font-label-md text-label-md self-start md:self-auto ring-1 ring-primary/15">
              <span className="material-symbols-outlined text-primary text-[18px]">photo_library</span>
              Real Studio Work
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {SERVICE_GALLERY.map((g, i) => (
              <button
                key={g.src + i}
                type="button"
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden rounded-3xl bg-surface-container-high ring-1 ring-primary/10 shadow-[0_20px_48px_-8px_rgba(73,61,53,0.10)] cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  i < 2 ? (i === 0 ? 'md:col-span-7 h-[320px] md:h-[380px]' : 'md:col-span-5 h-[320px] md:h-[380px]') : 'md:col-span-4 h-[260px] md:h-[300px]'
                }`}
              >
                <img src={g.src} alt={g.title} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/70 via-inverse-surface/10 to-transparent" />
                <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-inverse-surface/50 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                </span>
                <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col gap-0.5">
                  <h3 className="font-title-md text-title-md text-white">{g.title}</h3>
                  <p className="font-body-sm text-body-sm text-white/80">{g.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {current && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-inverse-surface/85 backdrop-blur-md" onClick={close} role="dialog" aria-modal="true" aria-label="Services photo viewer">
            <div className="relative w-full max-w-4xl flex flex-col gap-3" onClick={(e) => e.stopPropagation()} onTouchStart={(e) => { touchX.current = e.touches[0].clientX }} onTouchEnd={(e) => {
              if (touchX.current === null) return
              const dx = e.changedTouches[0].clientX - touchX.current
              if (dx < -40) next(); else if (dx > 40) prev()
              touchX.current = null
            }}>
              <div className="flex items-center justify-between text-white/90">
                <span className="inline-flex items-center gap-2 font-label-md text-label-md px-3.5 py-1.5 rounded-full bg-white/10 ring-1 ring-white/20">
                  <span className="material-symbols-outlined text-[16px] text-primary-fixed-dim">photo_library</span>
                  {active + 1} / {SERVICE_GALLERY.length}
                </span>
                <button type="button" onClick={close} aria-label="Close viewer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary hover:text-on-primary ring-1 ring-white/20 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-black/40 ring-1 ring-primary-fixed/30 shadow-[0_28px_80px_-12px_rgba(0,0,0,0.6)]">
                <img key={current.src + active} src={current.src} alt={current.title} className="animate-fade-up w-full max-h-[68vh] object-contain" />
                <button type="button" onClick={prev} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-surface-container-lowest/90 hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center shadow-lg transition-colors">
                  <span className="material-symbols-outlined text-[22px]">chevron_left</span>
                </button>
                <button type="button" onClick={next} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-surface-container-lowest/90 hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center shadow-lg transition-colors">
                  <span className="material-symbols-outlined text-[22px]">chevron_right</span>
                </button>
              </div>
              <div className="flex flex-col items-center text-center gap-0.5">
                <h3 className="font-title-md text-title-md text-white">{current.title}</h3>
                <p className="font-body-sm text-body-sm text-white/70">{current.sub}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 px-2">
                {SERVICE_GALLERY.map((g, i) => (
                  <button key={g.src + i} type="button" onClick={() => setActive(i)} aria-label={`View ${g.title}`} className={`h-14 w-14 rounded-xl overflow-hidden ring-2 transition-all duration-300 ${i === active ? 'ring-primary-fixed scale-105 opacity-100' : 'ring-white/15 opacity-50 hover:opacity-90'}`}>
                    <img src={g.src} alt="" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="w-full bg-surface py-20 md:py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col items-center text-center max-w-xl mx-auto gap-3">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Good To Know</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Before you book.</h2>
          </div>
          <div className="flex flex-col border-y border-primary/15 divide-y divide-primary/15">
            {[
              { q: 'Do I need an appointment or can I walk in?', a: 'Walk-ins are welcome, but weekends fill fast — WhatsApp us for a confirmed slot and zero waiting.' },
              { q: 'Are products safe for sensitive skin / hair?', a: 'Yes — premium cruelty-free ranges, patch & strand tests, and botanical-first options for sensitive guests.' },
              { q: 'How long do Nanoplastia / Botox / Keratin last?', a: 'Nanoplastia 5–7 months, Hair Botox ~3–4 months, Keratin ~3 months — with our after-care guidance.' },
              { q: 'Do you do both men and women?', a: '100% unisex — precision cuts, beard sculpting, bridal suites and teen-friendly rituals under one roof.' },
            ].map((f, i) => (
              <details key={f.q} className="group py-6 px-2 sm:px-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="flex items-baseline gap-4">
                    <span className="font-display-xl text-display-xl text-primary/30 font-light">0{i + 1}</span>
                    <span className="font-title-md text-title-md text-on-surface text-left">{f.q}</span>
                  </span>
                  <span className="w-9 h-9 shrink-0 rounded-full bg-surface-container text-primary flex items-center justify-center ring-1 ring-primary/15 group-open:rotate-45 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </span>
                </summary>
                <p className="font-body-md text-body-md text-on-surface-variant font-light pt-3 pl-10 sm:pl-12 max-w-3xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </main>
  )
}
