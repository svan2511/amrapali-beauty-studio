export default function Location() {
  return (
    <section id="contact" className="w-full bg-surface-container-low py-20 md:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Visit Our Sanctuary
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Conveniently located in Roorkee.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant font-light">
            Nestled along Paniyala Road, our studio features dedicated client parking, private
            bridal and grooming suites, and a soothing ambient lounge.
          </p>
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary mt-1">location_on</span>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface">Dawarka Apartment</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Paniyala Rd, Gandhi Nagar, Roorkee, Shafipur, Uttarakhand — 247667
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary mt-1">call</span>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface">
                  Reservations &amp; Direct Enquiries
                </span>
                <div className="flex flex-wrap gap-4 pt-1">
                  <a className="font-body-sm text-body-sm text-primary hover:underline" href="tel:07906783475">
                    079067 83475
                  </a>
                  <span className="text-outline-variant">•</span>
                  <a className="font-body-sm text-body-sm text-primary hover:underline" href="tel:9927955948">
                    9927955948
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary mt-1">schedule</span>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface">Hours of Operation</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Monday – Sunday: 10:00 AM – 08:30 PM
                </p>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <a
              className="inline-flex items-center gap-2 font-label-lg text-label-lg px-6 py-3 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors"
              href="https://maps.app.goo.gl/jKiBJtGo45hPBVPEA"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Get Directions</span>
              <span className="material-symbols-outlined text-sm">directions</span>
            </a>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_48px_-8px_rgba(73,61,53,0.06)] bg-surface p-2">
            <div
              className="w-full h-80 sm:h-96 rounded-2xl bg-cover bg-center relative"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqWDsj74dIKbbzRS6aTzK5uPEVwlRAscyx3SLrPAa6jmVY_CH2aPJ9YGQG8PyYSX2E2GwnN1FznRgJqSQurtXd8hLUuwg02q5qZc8wrmDBQg3xfANCOFmY64stbI5-V5go4lq389BtrY0EhLXGEW4ieQQtrYYMf7WMxjot44j4aGckUAokI2DSJ49kaktPaia4WshHeEzWXGeyHQg0UjFTX3feascnvZkQZRH4foY')",
              }}
            >
              <div className="absolute inset-0 bg-primary/5"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-surface/95 backdrop-blur shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined text-[20px]">store</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-title-md text-on-surface">
                      Amarpali Beauty Studio
                    </h4>
                    <p className="font-body-sm text-body-sm text-outline">Gandhi Nagar, Roorkee</p>
                  </div>
                </div>
                <a
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors"
                  href="https://maps.app.goo.gl/jKiBJtGo45hPBVPEA"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
