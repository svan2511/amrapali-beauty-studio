import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SERVICES = [
  {
    id: 'hair',
    num: '01',
    title: 'HAIR & SCALP',
    desc: 'Custom cuts, bespoke colouring & regenerative nourishment',
    tags: ['Haircut & Styling', 'Botanical Hair Spa', 'Keratin & Botox', 'Global & Balayage Colour', 'Occasion Blowdry'],
  },
  {
    id: 'makeup',
    num: '02',
    title: 'MAKEUP & BRIDAL',
    desc: 'Subtle editorial finish, high-definition bridal artistry & party glam',
    tags: ['Bridal Signature Makeup', 'Engagement & Sagan', 'Evening Party Makeup', 'Pre-Bridal Package', 'HD & Airbrush Techniques'],
  },
  {
    id: 'skin',
    num: '03',
    title: 'SKIN & GLOW',
    desc: 'Dermatologically inspired facials, hydration cures & deep detox',
    tags: ['Hydra Glow Facials', 'Deep Pore Cleanup', 'Brightening Rituals', 'Anti-Ageing Collagen Boost', 'De-Tan Infusion'],
  },
  {
    id: 'grooming',
    num: '04',
    title: 'GROOMING & WELLNESS',
    desc: 'Essential care for everyday elegance and polished refinement',
    tags: ['Beard Sculpting & Trimming', 'Luxury Manicure & Pedicure', 'Organic Threading', 'Peel Waxing & Sugaring', 'Head & Shoulder Massage'],
  },
]

export default function SignatureServices() {
  const [active, setActive] = useState('hair')
  const navigate = useNavigate()
  const goServices = (e) => {
    if (e) e.preventDefault()
    navigate('/services')
    window.scrollTo({ top: 0 })
  }

  return (
    <section id="services" className="w-full bg-surface-container-low py-20 md:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              Curated Rituals
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Beauty, crafted around you.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              From everyday grooming to complete transformations, discover unisex rituals refined
              for your individual texture, complexion, and lifestyle.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface text-on-surface font-label-md text-label-md self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            Unisex Care • Men &amp; Women
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 flex flex-col gap-4">
            {SERVICES.map((s) => {
              const isActive = active === s.id
              return (
                <div
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-md ${
                    isActive
                      ? 'bg-surface-container-lowest shadow-md'
                      : 'bg-surface shadow-[0_8px_32px_-4px_rgba(73,61,53,0.03)]'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4">
                      <span className="font-headline-md text-headline-md text-primary font-light">
                        {s.num}
                      </span>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">{s.title}</h3>
                        <p className="font-body-sm text-body-sm text-outline pt-0.5">{s.desc}</p>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                        isActive ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                  <div className="mt-4 pt-4 flex flex-wrap gap-2 text-on-surface-variant">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-surface-container font-label-md text-label-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="lg:col-span-5 sticky top-28 hidden lg:block">
            <div className="animate-sway">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_48px_-8px_rgba(73,61,53,0.08)] bg-surface-container">
              <img
                alt="Inside Amarpali Beauty Studio — styling stations and curated product shelves"
                className="w-full h-[480px] object-cover object-center transition-opacity duration-500"
                src="/beauty.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/70 via-transparent to-transparent flex flex-col justify-end p-8 text-inverse-on-surface">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">
                  Inside Our Studio
                </span>
                <h4 className="font-headline-sm text-headline-sm text-inverse-on-surface font-light">
                  Mindful Care &amp; Private Suites
                </h4>
                <p className="font-body-sm text-body-sm text-outline-variant pt-2 max-w-sm">
                  Real styling stations, curated shelves and a calm lounge — step into our
                  Roorkee sanctuary.
                </p>
                <div className="pt-4">
                  <a
                    className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed hover:underline cursor-pointer"
                    href="/services"
                    onClick={goServices}
                  >
                    View Full Menu &amp; Rates →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        {/* View all — editorial gold-divided premium CTA */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-container/70 to-primary-container/70" />
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface text-on-surface-variant font-label-sm text-label-sm uppercase tracking-[0.16em] ring-1 ring-primary/15 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
              20 signature rituals
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-primary-container/70 to-primary-container/70" />
          </div>
          <button
            type="button"
            onClick={goServices}
            className="btn-shine group inline-flex items-center gap-3 pl-9 pr-3 py-3 rounded-full bg-gradient-to-r from-primary-container to-[#d8b67e] text-on-primary-container shadow-[0_16px_40px_-10px_rgba(118,90,38,0.55)] ring-1 ring-primary/25 hover:bg-primary hover:text-on-primary hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-10px_rgba(118,90,38,0.6)] transition-all duration-300"
          >
            <span className="font-label-lg text-label-lg tracking-[0.06em]">View All Services</span>
            <span className="w-10 h-10 rounded-full bg-surface-container-lowest/90 text-on-surface flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
            </span>
          </button>
          <p className="font-body-sm text-body-sm text-outline tracking-wide">
            Hair &nbsp;·&nbsp; Skin &nbsp;·&nbsp; Bridal &nbsp;·&nbsp; Nails &nbsp;·&nbsp; Grooming
            <span className="text-primary font-semibold"> — starting ₹299</span>
          </p>
        </div>
      </div>
    </section>
  )
}
