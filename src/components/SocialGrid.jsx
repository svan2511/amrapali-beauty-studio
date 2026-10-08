// Real Amarpali studio looks — bridal, party & occasion makeup.
const POSTS = [
  {
    src: '/am-look-1.webp',
    alt: 'Bridal makeup with nath and gold jewellery',
    pos: 'object-top',
  },
  {
    src: '/am-look-2.webp',
    alt: 'Party makeup in sky-blue gown',
    pos: 'object-top',
  },
  {
    src: '/am-look-3.webp',
    alt: 'Engagement makeup with floral hairstyle',
    pos: 'object-top',
  },
  {
    src: '/am-look-4.webp',
    alt: 'Shimmery eye makeup with elegant updo',
    pos: 'object-top',
  },
]

export default function SocialGrid() {
  return (
    <section className="w-full bg-surface py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              Visual Diary
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Follow the Amarpali Look
            </h3>
          </div>
          <a
            className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface hover:text-primary transition-colors"
            href="https://instagram.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>@AmarpaliBeautyStudio</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {POSTS.map((p) => (
            <div
              key={p.src}
              className="relative group overflow-hidden rounded-2xl aspect-square bg-surface-container"
            >
              <img
                className={`w-full h-full object-cover ${p.pos ?? 'object-center'} transition-transform duration-500 group-hover:scale-105`}
                src={p.src}
                alt={p.alt}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-2xl">favorite</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
