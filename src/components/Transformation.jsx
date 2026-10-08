export default function Transformation() {
  return (
    <section className="w-full bg-surface-container py-20 md:py-28 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
          Everyday Rituals
        </span>
        <h2 className="font-display-xl text-display-xl text-on-surface tracking-tight max-w-2xl text-balance">
          From everyday to extraordinary.
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl font-light">
          Whether it&apos;s a fresh haircut, glowing skin, flawless bridal makeup, or a complete
          occasion look, every transformation begins with you.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <a
            className="inline-flex items-center gap-2 font-label-lg text-label-lg px-8 py-3.5 rounded-full bg-primary text-on-primary shadow-sm hover:bg-on-surface transition-colors"
            href="#book"
          >
            <span>Book Your Appointment</span>
            <span className="material-symbols-outlined text-sm">calendar_month</span>
          </a>
          <a
            className="inline-flex items-center gap-2 font-label-lg text-label-lg px-6 py-3.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface transition-colors"
            href="tel:07906783475"
          >
            <span className="material-symbols-outlined text-sm">call</span>
            <span>Call: 079067 83475</span>
          </a>
        </div>
      </div>
    </section>
  )
}
