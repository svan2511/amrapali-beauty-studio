import { useBooking } from '../lib/booking.jsx'

export default function AppointmentCTA() {
  const { openBooking } = useBooking()
  return (
    <section id="book" className="w-full bg-surface-container-high py-20 md:py-28 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto rounded-3xl bg-surface-container-lowest p-8 sm:p-14 shadow-[0_20px_48px_-8px_rgba(73,61,53,0.08)] flex flex-col items-center text-center gap-6">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
          Begin Your Ritual
        </span>
        <h2 className="font-display-xl text-display-xl text-on-surface tracking-tight text-balance">
          Ready for your next look?
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg font-light">
          Book your appointment today and let our beauty and hair specialists take care of the rest
          in our serene Roorkee studio.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => openBooking()}
            className="inline-flex items-center gap-2 font-label-lg text-label-lg px-8 py-3.5 rounded-full bg-primary text-on-primary shadow-sm hover:bg-on-surface transition-colors"
          >
            <span>Book Appointment</span>
            <span className="material-symbols-outlined text-sm">check_circle</span>
          </button>
          <a
            className="inline-flex items-center gap-2 font-label-lg text-label-lg px-6 py-3.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
            href="tel:07906783475"
          >
            <span className="material-symbols-outlined text-sm text-primary">call</span>
            <span>Call 079067 83475</span>
          </a>
          <a
            className="inline-flex items-center gap-2 font-label-lg text-label-lg px-6 py-3.5 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-colors"
            href="https://wa.me/917906783475"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            <span>WhatsApp Booking</span>
          </a>
        </div>
        <p className="font-body-sm text-body-sm text-outline pt-2">
          Walk-ins warmly accommodated subject to availability.
        </p>
      </div>
    </section>
  )
}
