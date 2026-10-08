import { useNavigate } from 'react-router-dom'

const MOMENTS = [
  { src: '/awards/award-shilpa.jpeg', title: 'Beauty Club Association Honour', sub: 'Felicitated by Shilpa Shetty' },
  { src: '/awards/award-karisma.jpeg', title: 'Celebrity Honour', sub: 'Felicitated by Karisma Kapoor' },
  { src: '/awards/award-golden-wings.jpeg', title: 'Golden Wings Award • 2019', sub: 'Excellence in beauty artistry' },
]

export default function MomentsStrip() {
  const navigate = useNavigate()

  const seeAll = (e) => {
    e.preventDefault()
    navigate('/about')
    // land directly on the awards slider (behind the short page loader)
    setTimeout(() => {
      document.getElementById('awards')?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }, 500)
  }

  return (
    <section className="w-full bg-surface-container-low py-20 md:py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              National Recognition
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface pt-1">
              Honoured for our craft.
            </h2>
          </div>
          <a
            href="/about#awards"
            onClick={seeAll}
            className="inline-flex items-center gap-2 font-label-lg text-label-lg text-primary hover:underline self-start md:self-auto"
          >
            <span>See All Moments</span>
            <span className="material-symbols-outlined text-sm">east</span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {MOMENTS.map((m) => (
            <div
              key={m.src}
              className="group relative overflow-hidden rounded-3xl h-[300px] ring-1 ring-primary/10 shadow-[0_20px_48px_-8px_rgba(73,61,53,0.10)]"
            >
              <img
                src={m.src}
                alt={m.title}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/70 via-inverse-surface/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <h3 className="font-title-md text-title-md text-white">{m.title}</h3>
                <p className="font-body-sm text-body-sm text-white/80">{m.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
