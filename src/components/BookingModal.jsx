import { useEffect, useMemo, useState } from 'react'
import { useBooking } from '../lib/booking.jsx'
import { SERVICES, SERVICE_CATEGORIES } from '../data/services.js'

const WA_NUMBER = '917906783475'
const SLOTS = ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM']

const newBookingId = () => `AP-${Date.now().toString(36).toUpperCase().slice(-5)}`

const todayISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const prettyDate = (iso) => {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const cleanPhone = (p) => p.replace(/\D/g, '').replace(/^(91|0)/, '')
const validPhone = (p) => /^[6-9]\d{9}$/.test(cleanPhone(p))

// Past slots of today can't be booked (30-min advance buffer)
const SLOT_LEAD_MIN = 30
const slotToDate = (slot, iso) => {
  const [t, ap] = slot.split(' ')
  let [h, m] = t.split(':').map(Number)
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  const [y, mo, d] = iso.split('-').map(Number)
  return new Date(y, mo - 1, d, h, m)
}

const inputCls =
  'w-full px-4 py-3 rounded-2xl bg-surface-container-low ring-1 ring-primary/15 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow'
const labelCls = 'font-label-md text-label-md uppercase tracking-wider text-outline'

export default function BookingModal() {
  const { open, service: initialService, closeBooking } = useBooking()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState(todayISO())
  const [time, setTime] = useState('')
  const [note, setNote] = useState('')
  const [tried, setTried] = useState(false)
  const [sent, setSent] = useState(false)
  const [bookingId, setBookingId] = useState('')

  // Reset every time the popup opens; pre-select service if given
  useEffect(() => {
    if (!open) return
    const found = SERVICES.find((s) => s.title === initialService)
    setName('')
    setPhone('')
    setServiceId(found ? found.id : '')
    setDate(todayISO())
    setTime('')
    setNote('')
    setTried(false)
    setSent(false)
  }, [open, initialService])

  // Escape to close + lock body scroll
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeBooking()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeBooking])

  const grouped = useMemo(() => {
    const cats = SERVICE_CATEGORIES.filter((c) => c.id !== 'all')
    return cats
      .map((c) => ({ ...c, items: SERVICES.filter((s) => s.category === c.id) }))
      .filter((g) => g.items.length > 0)
  }, [])

  const service = SERVICES.find((s) => s.id === serviceId)

  const isToday = date === todayISO()
  const slotPassed = (s) => isToday && slotToDate(s, date).getTime() <= Date.now() + SLOT_LEAD_MIN * 60000
  const allPassed = SLOTS.every(slotPassed)

  const onDateChange = (v) => {
    setDate(v)
    // Clear selected slot if it already passed on the newly picked date
    if (v === todayISO() && time && slotToDate(time, v).getTime() <= Date.now() + SLOT_LEAD_MIN * 60000) {
      setTime('')
    }
  }

  const errors = {
    name: name.trim().length < 2 ? 'Please tell us your name' : '',
    phone: !validPhone(phone) ? 'Enter a valid 10-digit mobile number' : '',
    service: !service ? 'Please choose a ritual' : '',
    date: !date || date < todayISO() ? 'Please pick today or a future date' : '',
    time: !time ? 'Please pick a time slot' : '',
  }
  const invalid = Object.values(errors).some(Boolean)

  const waLink = (ref) => {
    const lines = [
      '*AMARPALI BEAUTY STUDIO — New Booking*',
      `Ref ID: ${ref}`,
      '',
      `*Name:* ${name.trim()}`,
      `*Phone:* +91 ${cleanPhone(phone)}`,
      `*Service:* ${service.title}`,
      `*Price:* ${service.price} (${service.duration})`,
      `*Date:* ${prettyDate(date)}`,
      `*Time:* ${time}`,
      note.trim() ? `*Note:* ${note.trim()}` : null,
      '',
      'Please confirm my slot.',
    ].filter((l) => l !== null)
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setTried(true)
    if (invalid) return
    const ref = newBookingId()
    setBookingId(ref)
    window.open(waLink(ref), '_blank', 'noopener')
    setSent(true)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center sm:p-6 bg-inverse-surface/80 backdrop-blur-md"
      onClick={closeBooking}
      role="dialog"
      aria-modal="true"
      aria-label="Book an appointment"
    >
      <div
        className="animate-pop relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-[1.75rem] sm:rounded-[1.75rem] bg-surface-container-lowest shadow-[0_28px_80px_-12px_rgba(0,0,0,0.5)] ring-1 ring-primary/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* gold hairline */}
        <div className="sticky top-0 z-10 h-[3px] w-full bg-gradient-to-r from-transparent via-primary-container to-transparent" />

        {!sent ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-5 p-6 sm:p-8" noValidate>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-[0.18em] text-primary">
                  Amarpali Beauty Studio
                </p>
                <h3 className="font-headline-md text-headline-md text-on-surface pt-1">
                  Book your ritual.
                </h3>
                <p className="font-body-sm text-body-sm text-outline pt-1">
                  No advance needed • Free cancellation
                </p>
              </div>
              <button
                type="button"
                onClick={closeBooking}
                aria-label="Close booking"
                className="w-10 h-10 shrink-0 rounded-full bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div>
              <label htmlFor="bk-name" className={labelCls}>Your Name *</label>
              <input
                id="bk-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                autoComplete="name"
                className={`${inputCls} mt-1.5 ${tried && errors.name ? 'ring-2 ring-error' : ''}`}
              />
              {tried && errors.name && <p className="font-body-sm text-body-sm text-error pt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="bk-phone" className={labelCls}>Mobile Number *</label>
              <input
                id="bk-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 …"
                inputMode="tel"
                autoComplete="tel"
                className={`${inputCls} mt-1.5 ${tried && errors.phone ? 'ring-2 ring-error' : ''}`}
              />
              {tried && errors.phone && <p className="font-body-sm text-body-sm text-error pt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="bk-service" className={labelCls}>Select Ritual *</label>
              <select
                id="bk-service"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className={`${inputCls} mt-1.5 ${tried && errors.service ? 'ring-2 ring-error' : ''}`}
              >
                <option value="">— Choose a ritual —</option>
                {grouped.map((g) => (
                  <optgroup key={g.id} label={g.label}>
                    {g.items.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} • {s.price}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {tried && errors.service && <p className="font-body-sm text-body-sm text-error pt-1">{errors.service}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bk-date" className={labelCls}>Date *</label>
                <input
                  id="bk-date"
                  type="date"
                  value={date}
                  min={todayISO()}
                  onChange={(e) => onDateChange(e.target.value)}
                  className={`${inputCls} mt-1.5 ${tried && errors.date ? 'ring-2 ring-error' : ''}`}
                />
                {tried && errors.date && <p className="font-body-sm text-body-sm text-error pt-1">{errors.date}</p>}
              </div>
              <div>
                <span className={labelCls}>Studio Hours</span>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2.5 bg-surface-container-low rounded-2xl px-4 py-3 ring-1 ring-primary/15">
                  10 AM – 8:30 PM, all 7 days
                </p>
              </div>
            </div>

            <div>
              <span className={labelCls}>Time Slot *</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {SLOTS.map((s) => {
                  const passed = slotPassed(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={passed}
                      title={passed ? 'This slot has passed for today' : s}
                      onClick={() => setTime(s)}
                      className={`px-4 py-2 rounded-full font-label-md text-label-md ring-1 transition-all duration-200 ${
                        passed
                          ? 'bg-surface-container-low/60 text-outline/60 ring-primary/10 line-through cursor-not-allowed'
                          : time === s
                            ? 'bg-primary text-on-primary ring-primary shadow-[0_8px_20px_-6px_rgba(118,90,38,0.6)]'
                            : 'bg-surface-container-low text-on-surface-variant ring-primary/15 hover:ring-primary/40 hover:text-on-surface'
                      }`}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
              {allPassed && (
                <p className="font-body-sm text-body-sm text-primary pt-1.5">
                  Today&apos;s slots are over — please pick tomorrow or a future date.
                </p>
              )}
              {tried && errors.time && <p className="font-body-sm text-body-sm text-error pt-1.5">{errors.time}</p>}
            </div>

            <div>
              <label htmlFor="bk-note" className={labelCls}>Note <span className="normal-case font-body-sm">(optional)</span></label>
              <textarea
                id="bk-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="Occasion, allergies, anything we should know…"
                className={`${inputCls} mt-1.5 resize-none`}
              />
            </div>

            {/* live summary */}
            {service && date && time && (
              <div className="rounded-2xl bg-surface-container-low ring-1 ring-primary/15 p-4 flex flex-col gap-1.5">
                <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Your Booking</p>
                <p className="font-title-md text-title-md text-on-surface">{service.title}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {prettyDate(date)} • {time} • {service.price} • {service.duration}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1faa53] text-white font-label-lg text-label-lg hover:brightness-110 hover:-translate-y-px transition-all shadow-[0_14px_36px_-10px_rgba(31,170,83,0.6)]"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              Confirm on WhatsApp
            </button>
            <p className="font-body-sm text-body-sm text-outline text-center -mt-2">
              Opens WhatsApp with your booking ready — just press send.
            </p>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center gap-4 p-8 sm:p-10">
            <span className="animate-pop w-16 h-16 rounded-full bg-[#1faa53] text-white flex items-center justify-center shadow-[0_16px_40px_-8px_rgba(31,170,83,0.6)]">
              <span className="material-symbols-outlined text-[32px]">check</span>
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Request sent, {name.split(' ')[0] || 'friend'}!
            </h3>
            <div className="w-full rounded-2xl bg-surface-container-low ring-1 ring-primary/15 p-4 font-body-md text-body-md text-on-surface-variant">
              <p className="font-label-md text-label-md uppercase tracking-widest text-primary pb-1">Ref: {bookingId}</p>
              {service.title} • {prettyDate(date)} • {time}
            </div>
            <p className="font-body-sm text-body-sm text-outline">
              WhatsApp opened with your booking — press send there. We confirm every slot personally, usually within a couple of hours.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <a
                href={waLink(bookingId)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1faa53] text-white font-label-md text-label-md hover:brightness-110 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span> Open Again
              </a>
              <button
                type="button"
                onClick={closeBooking}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container text-on-surface ring-1 ring-primary/15 font-label-md text-label-md hover:bg-surface-container-high transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
