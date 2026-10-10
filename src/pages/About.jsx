import { useNavigate } from 'react-router-dom'
import AppointmentCTA from '../components/AppointmentCTA.jsx'
import Awards from '../components/Awards.jsx'

const VALUES = [
  { num: '01', title: 'Personalized', desc: 'No cookie-cutter looks — every ritual is mapped to you.', icon: 'tune' },
  { num: '02', title: 'Professional', desc: 'Strict hygiene, premium cruelty-free products, calm conduct.', icon: 'verified' },
  { num: '03', title: 'Modern', desc: 'Global techniques with gentle, botanical-first care.', icon: 'auto_awesome' },
  { num: '04', title: 'Unisex', desc: 'Women, men and teens — everyone belongs in our chairs.', icon: 'groups' },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <main className="w-full bg-background">
      {/* ---------- page hero ---------- */}
      <section className="relative w-full bg-surface pt-32 md:pt-44 pb-14 md:pb-20 px-6 lg:px-12 overflow-hidden">
        <div className="animate-blob absolute -top-32 -left-32 w-96 h-96 rounded-full bg-surface-container-high/60 blur-3xl pointer-events-none" />
        <div className="animate-blob-2 absolute top-1/3 right-0 w-[28rem] h-[28rem] rounded-full bg-surface-variant/40 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-start gap-6">
            <nav className="animate-fade-up inline-flex items-center gap-2 font-label-md text-label-md text-outline">
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0 }); }} className="hover:text-primary transition-colors">Home</a>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary">About Us</span>
            </nav>
            <div className="animate-fade-up flex flex-wrap items-center gap-3" style={{ animationDelay: '0.05s' }}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/60 text-on-secondary-container font-label-md text-label-md ring-1 ring-secondary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary pulse-dot"></span>
                Our Story • Roorkee
              </span>
            </div>
            <h1 className="animate-fade-up font-display-xl text-display-xl text-on-surface leading-[1.08] tracking-tight text-balance" style={{ animationDelay: '0.12s' }}>
              A sanctuary,{' '}
              <span className="italic font-light text-primary">not just a salon.</span>
            </h1>
            <p className="animate-fade-up font-body-lg text-body-lg text-on-surface-variant max-w-xl font-light leading-relaxed" style={{ animationDelay: '0.2s' }}>
              Amarpali Beauty Studio is Roorkee&apos;s award-winning unisex sanctuary for hair,
              skin, bridal artistry and everyday grooming — where every guest is treated like
              the occasion.
            </p>
            <div className="animate-fade-up grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-xl pt-2" style={{ animationDelay: '0.28s' }}>
              {[
                { top: '4.9★', bottom: 'Google Rating' },
                { top: '80+', bottom: 'Google Reviews' },
                { top: '7 Days', bottom: 'Open Weekly' },
                { top: '100%', bottom: 'Unisex Rituals' },
              ].map((s, i) => (
                <div key={s.bottom} className={`flex flex-col ${i > 0 ? 'border-l border-primary/15 pl-4 sm:pl-6' : ''}`}>
                  <span className="font-headline-md text-headline-md text-on-surface font-normal">{s.top}</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline pt-1">{s.bottom}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="animate-float relative w-full max-w-md">
              <div className="absolute -inset-3 rounded-t-[14rem] rounded-b-3xl bg-surface-container-high/50 -rotate-2 ring-1 ring-primary/10" />
              <div className="relative overflow-hidden rounded-t-[13.5rem] rounded-b-2xl shadow-[0_28px_60px_-12px_rgba(118,90,38,0.35)] ring-1 ring-primary/15 bg-surface-variant">
                <img
                  src="/dulhan.webp"
                  alt="Signature Amarpali bridal artistry"
                  className="w-full h-[440px] md:h-[520px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
                  <div className="bg-surface-container-lowest/90 backdrop-blur px-4 py-2.5 rounded-2xl ring-1 ring-white/40 shadow-lg">
                    <p className="font-label-md text-label-md text-on-surface">Our Signature Craft</p>
                    <p className="font-body-sm text-body-sm text-outline">Real brides, real glow</p>
                  </div>
                </div>
              </div>
              <div className="animate-float-delayed absolute -bottom-6 -left-4 sm:-left-6 bg-surface-container-lowest/95 backdrop-blur px-4 py-3 rounded-2xl shadow-[0_16px_40px_-8px_rgba(73,61,53,0.25)] ring-1 ring-primary/15 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-container to-primary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">emoji_events</span>
                </span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">Award-Winning Studio</p>
                  <p className="font-body-sm text-body-sm text-outline">Nationally honoured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- rooted in roorkee ---------- */}
      <section className="w-full bg-surface-container-lowest py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="animate-sway">
              <div className="relative overflow-hidden rounded-[2rem] h-[380px] md:h-[480px] ring-1 ring-primary/15 shadow-[0_28px_60px_-12px_rgba(118,90,38,0.3)]">
                <img
                  src="/hero-3.webp"
                  alt="Inside Amarpali Beauty Studio Roorkee"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/45 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 bg-surface-container-lowest/90 backdrop-blur px-4 py-2.5 rounded-2xl ring-1 ring-white/40 shadow-lg">
                  <p className="font-label-md text-label-md text-on-surface">Azad Nagar Studio</p>
                  <p className="font-body-sm text-body-sm text-outline">Azad Nagar, Roorkee</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 order-1 lg:order-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              Rooted in Roorkee
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Built for everyone who walks in.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant font-light leading-relaxed">
              Most salons quietly serve one kind of guest. We refused that idea from day one.
              Amarpali was designed as a truly <strong className="font-semibold text-on-surface">unisex sanctuary</strong> —
              private bridal suites and precision beard sculpting under the same warm roof,
              with unhurried consultations for every single guest.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
              Our artists have been honoured on national stages — felicitated by icons of
              Indian cinema and decorated with awards like the Golden Wings Award — but our
              proudest trophy remains the same: guests who return, and bring their families.
            </p>
            <ul className="flex flex-col gap-3 pt-1">
              {[
                'Unrushed consultation before every service',
                'Premium, cruelty-free products only',
                'Open all 7 days • 10:00 AM – 8:30 PM',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 font-body-md text-body-md text-on-surface">
                  <span className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- values: editorial index list (distinct from Home cards) ---------- */}
      <section className="w-full bg-surface py-20 md:py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col items-center text-center max-w-xl mx-auto gap-3">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              What We Stand For
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">The Amarpali promise.</h2>
          </div>
          <div className="flex flex-col border-y border-primary/15 divide-y divide-primary/15">
            {VALUES.map((v) => (
              <div
                key={v.num}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 sm:gap-8 py-6 sm:py-7 px-2 sm:px-4 transition-colors duration-300 hover:bg-surface-container-low/60"
              >
                <span className="font-display-xl text-display-xl text-primary/25 group-hover:text-primary font-light leading-none transition-all duration-500 group-hover:-translate-y-0.5 tabular-nums">
                  {v.num}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface transition-transform duration-300 group-hover:translate-x-1">
                    {v.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light">
                    {v.desc}
                  </p>
                </div>
                <span className="w-11 h-11 rounded-full bg-surface-container text-primary hidden sm:flex items-center justify-center ring-1 ring-primary/15 transition-all duration-500 group-hover:bg-primary group-hover:text-on-primary group-hover:rotate-6">
                  <span className="material-symbols-outlined text-[20px]">{v.icon}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- moments strip ---------- */}
      {/* (moved to Home as MomentsStrip; About shows the full Awards slider below) */}
      <Awards />

      <AppointmentCTA />
    </main>
  )
}
