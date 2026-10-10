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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface hover:text-primary transition-colors"
              href="https://www.instagram.com/amarpalibeautystudio_"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px] shrink-0"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFD600" />
                    <stop offset="35%" stopColor="#FF7A00" />
                    <stop offset="60%" stopColor="#FF0069" />
                    <stop offset="85%" stopColor="#D300C5" />
                    <stop offset="100%" stopColor="#7638FA" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="url(#ig-grad)" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="url(#ig-grad)" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.3" fill="url(#ig-grad)" />
              </svg>
              <span>@AmarpaliBeautyStudio</span>
            </a>
            <span className="w-1 h-1 rounded-full bg-primary/30" aria-hidden="true" />
            <a
              className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface hover:text-primary transition-colors"
              href="https://www.facebook.com/share/19rN5jR5qD/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0" aria-hidden="true" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Amarpali Beauty Studio</span>
            </a>
          </div>
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
