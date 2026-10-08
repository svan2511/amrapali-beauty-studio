export default function FeaturedExperience() {
  return (
    <section className="w-full bg-surface-variant py-20 md:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="animate-sway">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_48px_-8px_rgba(73,61,53,0.06)] aspect-[4/3]">
            <img
              className="w-full h-full object-cover object-[70%_10%]"
              src="/dulhan-2.webp"
              alt="Real Amarpali bride in red lehenga with bridal jewellery"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none"></div>
          </div>
          </div>
          <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-surface p-6 rounded-2xl shadow-[0_16px_36px_-6px_rgba(73,61,53,0.08)] max-w-xs">
            <span className="font-headline-md text-headline-md text-primary font-light">Peaceful</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant pt-1">
              Designed as an unhurried haven away from city noise.
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 flex flex-col gap-6 lg:pl-6">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            The Sanctuary
          </span>
          <h2 className="font-display-xl text-display-xl text-on-surface tracking-tight leading-tight">
            Your time.
            <br />
            Your transformation.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-light leading-relaxed">
            Take a moment for yourself. Discover beauty services designed around how you want to
            look and feel. Every touchpoint—from our organic hair serums to soft ambient
            lighting—is tuned to bring peace to your day.
          </p>
          <div className="pt-4">
            <a
              className="inline-flex items-center gap-3 font-label-lg text-label-lg px-7 py-3 rounded-full bg-inverse-surface text-inverse-on-surface hover:bg-primary transition-all duration-300"
              href="#about"
            >
              <span>Explore The Experience</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
