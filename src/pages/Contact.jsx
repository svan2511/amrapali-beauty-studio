import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DUMMY_EMAIL = 'hello@amarpalibeauty.in'
const PHONE_1 = '+91 79067 83475'
const PHONE_2 = '+91 99279 55948'
const WA_NUMBER = '917906783475'
const DIRECTIONS_URL = 'https://maps.app.goo.gl/jKiBJtGo45hPBVPEA'
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.9290692972386!2d77.87043477533774!3d29.86631937501373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb39d77e194ed%3A0xba6e5ed8d6c62234!2sAmarpali%20Beauty%20Studio!5e0!3m2!1sen!2sin!4v1791440922840!5m2!1sen!2sin'

const SERVICE_OPTIONS = [
  'Haircut & Styling',
  'Nanoplastia',
  'Hair Botox',
  'Keratin / Smoothening',
  'Hair Colour / Balayage',
  'Hydra Glow Facial',
  'Korean Glass Facial',
  'Classic Clean-Up',
  'Bridal / Party Makeup',
  'Manicure / Pedicure',
  'Beard / Grooming',
  'Other (write in message)',
]

const inputCls =
  'w-full px-4 py-3 rounded-2xl bg-surface-container-low ring-1 ring-primary/15 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow'

export default function Contact() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', service: SERVICE_OPTIONS[0], message: '' })
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    const text =
      `Hi Amarpali! New enquiry%0A` +
      `Name: ${encodeURIComponent(form.name)}%0A` +
      `Phone: ${encodeURIComponent(form.phone)}%0A` +
      `Service: ${encodeURIComponent(form.service)}%0A` +
      `Message: ${encodeURIComponent(form.message || '-')}`
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank', 'noopener')
    setSent(true)
  }

  return (
    <main className="w-full bg-background">
      {/* ---------- HERO ---------- */}
      <section className="relative w-full bg-surface pt-32 md:pt-44 pb-14 md:pb-20 px-6 lg:px-12 overflow-hidden">
        <div className="animate-blob absolute -top-32 -left-32 w-96 h-96 rounded-full bg-surface-container-high/60 blur-3xl pointer-events-none" />
        <div className="animate-blob-2 absolute top-1/3 right-0 w-[28rem] h-[28rem] rounded-full bg-surface-variant/40 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-10 items-center">
          <div className="flex flex-col items-start gap-6">
            <nav className="animate-fade-up inline-flex items-center gap-2 font-label-md text-label-md text-outline">
              <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary">Contact</span>
            </nav>
            <div className="animate-fade-up flex flex-wrap items-center gap-3" style={{ animationDelay: '0.05s' }}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/60 text-on-secondary-container font-label-md text-label-md ring-1 ring-secondary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary pulse-dot" />
                Visit • Call • Write
              </span>
            </div>
            <h1 className="animate-fade-up font-display-xl text-display-xl text-on-surface leading-[1.08] tracking-tight text-balance" style={{ animationDelay: '0.12s' }}>
              Conveniently located{' '}
              <span className="italic font-light text-primary">in Roorkee.</span>
            </h1>
            <p className="animate-fade-up font-body-lg text-body-lg text-on-surface-variant max-w-xl font-light leading-relaxed" style={{ animationDelay: '0.2s' }}>
              Walk in for a consultation, call for a slot, or send an enquiry —
              we reply the same day, usually within a couple of hours.
            </p>
            <div className="animate-fade-up flex flex-wrap gap-3 pt-1" style={{ animationDelay: '0.26s' }}>
              <a href="#enquire" className="btn-shine inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:-translate-y-0.5 transition-all">
                Send Enquiry <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </a>
              <a href={`tel:+${WA_NUMBER}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-low text-on-surface ring-1 ring-primary/15 font-label-lg text-label-lg hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined text-[18px] text-primary">call</span> {PHONE_1}
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="animate-float relative w-full max-w-2xl">
              <div className="absolute -inset-3 rounded-t-[14rem] rounded-b-3xl bg-surface-container-high/50 -rotate-2 ring-1 ring-primary/10" />
              <div className="relative overflow-hidden rounded-t-[13.5rem] rounded-b-2xl shadow-[0_28px_60px_-12px_rgba(118,90,38,0.35)] ring-1 ring-primary/15 bg-surface-variant">
                <img src="/hero.png" alt="Amarpali Beauty Studio front on Paniyala Road, Roorkee" className="w-full h-[420px] md:h-[600px] object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="bg-surface-container-lowest/90 backdrop-blur px-4 py-2.5 rounded-2xl ring-1 ring-white/40 shadow-lg">
                    <p className="font-label-md text-label-md text-on-surface">Dawarka Apartment, Paniyala Rd</p>
                    <p className="font-body-sm text-body-sm text-outline">Gandhi Nagar, Roorkee — 247667</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- INFO CARDS ---------- */}
      <section className="w-full bg-surface-container-lowest py-14 md:py-20 px-6 lg:px-12 border-y border-primary/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'location_on', t: 'Studio Address', d: 'Dawarka Apartment, Paniyala Rd, Gandhi Nagar, Roorkee, Uttarakhand — 247667', action: { label: 'Get Directions', href: DIRECTIONS_URL, ext: true } },
            { icon: 'call', t: 'Call / WhatsApp', d: `${PHONE_1} • ${PHONE_2}`, action: { label: 'Call Now', href: `tel:+${WA_NUMBER}` } },
            { icon: 'mail', t: 'Email Us', d: DUMMY_EMAIL, action: { label: 'Write Mail', href: `mailto:${DUMMY_EMAIL}` } },
            { icon: 'schedule', t: 'Hours', d: 'Monday – Sunday: 10:00 AM – 08:30 PM, open all 7 days', action: { label: 'Book a Slot', href: '#enquire' } },
          ].map((c) => (
            <div key={c.t} className="flex flex-col gap-3 rounded-2xl bg-surface-container-low/60 ring-1 ring-primary/10 p-6 hover:ring-primary/25 hover:-translate-y-0.5 transition-all duration-300">
              <span className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">{c.icon}</span>
              </span>
              <h3 className="font-title-md text-title-md text-on-surface">{c.t}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant break-words">{c.d}</p>
              <a
                href={c.action.href}
                {...(c.action.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:underline mt-auto pt-2"
              >
                {c.action.label} <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- MAP + FORM ---------- */}
      <section id="enquire" className="w-full bg-surface py-20 md:py-24 px-6 lg:px-12 scroll-mt-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* map */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Find Us</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface pt-1">On the map.</h2>
            </div>
            <div className="relative flex-1 min-h-[420px] rounded-[1.75rem] overflow-hidden ring-1 ring-primary/15 shadow-[0_20px_48px_-8px_rgba(73,61,53,0.10)] bg-surface-container-low">
              <iframe
                title="Amarpali Beauty Studio on Google Maps"
                src={MAP_EMBED}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface-container-low text-on-surface ring-1 ring-primary/15 font-label-lg text-label-lg hover:bg-surface-container transition-all self-start"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">directions</span>
              Open in Google Maps
            </a>
          </div>

          {/* form */}
          <div className="lg:col-span-5">
            <div className="rounded-[1.75rem] bg-surface-container-lowest ring-1 ring-primary/12 shadow-[0_20px_48px_-12px_rgba(73,61,53,0.14)] p-7 sm:p-9 flex flex-col gap-5 h-full">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Enquiry Form</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface pt-1">Ask us anything.</h2>
              </div>
              {sent && (
                <div className="flex items-start gap-3 rounded-2xl bg-secondary-container/60 ring-1 ring-secondary/25 p-4">
                  <span className="material-symbols-outlined text-secondary">check_circle</span>
                  <p className="font-body-sm text-body-sm text-on-secondary-container">
                    Thanks {form.name.split(' ')[0] || 'friend'}! WhatsApp opened with your enquiry — just press send. We usually reply within a couple of hours.
                  </p>
                </div>
              )}
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="eq-name" className="font-label-md text-label-md uppercase tracking-wider text-outline">Your Name *</label>
                  <input id="eq-name" value={form.name} onChange={set('name')} required placeholder="e.g. Priya Sharma" className={`${inputCls} mt-1.5`} />
                </div>
                <div>
                  <label htmlFor="eq-phone" className="font-label-md text-label-md uppercase tracking-wider text-outline">Phone *</label>
                  <input id="eq-phone" value={form.phone} onChange={set('phone')} required inputMode="tel" placeholder="+91 …" className={`${inputCls} mt-1.5`} />
                </div>
                <div>
                  <label htmlFor="eq-service" className="font-label-md text-label-md uppercase tracking-wider text-outline">Service</label>
                  <select id="eq-service" value={form.service} onChange={set('service')} className={`${inputCls} mt-1.5`}>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="eq-msg" className="font-label-md text-label-md uppercase tracking-wider text-outline">Message</label>
                  <textarea id="eq-msg" value={form.message} onChange={set('message')} rows={4} placeholder="Date, occasion, anything we should know…" className={`${inputCls} mt-1.5 resize-none`} />
                </div>
                <button type="submit" className="btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:bg-on-surface transition-colors">
                  <span className="material-symbols-outlined text-[18px]">send</span> Send via WhatsApp
                </button>
                <p className="font-body-sm text-body-sm text-outline text-center">or call {PHONE_1} • {PHONE_2}</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
