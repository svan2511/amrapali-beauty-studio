import { useLocation, useNavigate } from 'react-router-dom'
import { goHomeSection } from '../lib/nav.js'

export default function Footer() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const goSection = (e, section) => {
    if (goHomeSection(navigate, pathname, section)) e.preventDefault()
  }

  return (
    <footer className="w-full bg-inverse-surface text-inverse-on-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Amarpali Beauty Studio"
                className="h-12 w-12 rounded-full object-contain bg-[#f6efe6] p-0.5 shrink-0 ring-1 ring-primary-fixed/30"
              />
              <span className="w-px h-9 shrink-0 bg-gradient-to-b from-transparent via-primary-fixed/60 to-transparent" />
              <span className="flex flex-col leading-none">
                <span
                  className="font-display-xl text-primary-fixed text-[24px] font-medium"
                  style={{ letterSpacing: '0.045em', lineHeight: 1.1 }}
                >
                  Amarpali
                </span>
                <span className="flex items-center gap-1.5 pt-[6px]">
                  <span className="h-px w-5 shrink-0 bg-primary-fixed-dim/80" />
                  <span
                    className="font-label-sm uppercase text-primary-fixed-dim whitespace-nowrap text-[9px]"
                    style={{ letterSpacing: '0.3em' }}
                  >
                    Beauty Studio · Roorkee
                  </span>
                </span>
              </span>
            </div>
            <p className="font-body-md text-body-md text-outline-variant max-w-md">
              An elevated, luxury unisex sanctuary crafted for holistic hair, skincare, and bespoke
              styling rituals in Roorkee. Rejuvenation designed seamlessly for all genders with
              thoughtful artisanal elegance.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-label-lg text-label-lg uppercase tracking-wider text-primary-fixed">
              Studio Address &amp; Map
            </span>
            <div className="flex items-start gap-3 text-outline-variant">
              <span className="material-symbols-outlined text-primary-fixed shrink-0 mt-0.5">
                location_on
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-body-sm text-body-sm text-inverse-on-surface">
                  Dawarka Apartment, Paniyala Rd, Gandhi Nagar, Roorkee, Uttarakhand
                </p>
                <a
                  className="font-label-md text-label-md text-primary-fixed-dim hover:text-primary-fixed underline transition-colors"
                  href="https://maps.app.goo.gl/jKiBJtGo45hPBVPEA"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 text-outline-variant pt-2">
              <span className="material-symbols-outlined text-primary-fixed shrink-0">schedule</span>
              <span className="font-body-sm text-body-sm text-outline-variant">
                Mon – Sun: 10:00 AM – 08:30 PM
              </span>
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="font-label-lg text-label-lg uppercase tracking-wider text-primary-fixed">
              Reservations &amp; Enquiries
            </span>
            <div className="flex flex-col gap-3">
              <a
                className="flex items-center gap-2.5 text-outline-variant hover:text-inverse-on-surface transition-colors"
                href="tel:+917906783475"
              >
                <span className="material-symbols-outlined text-primary-fixed text-[18px]">call</span>
                <span className="font-body-md text-body-md">+91 79067 83475</span>
              </a>
              <a
                className="flex items-center gap-2.5 text-outline-variant hover:text-inverse-on-surface transition-colors"
                href="tel:+919927955948"
              >
                <span className="material-symbols-outlined text-primary-fixed text-[18px]">call</span>
                <span className="font-body-md text-body-md">+91 99279 55948</span>
              </a>
              <a
                className="flex items-center gap-2.5 text-outline-variant hover:text-inverse-on-surface transition-colors break-all"
                href="mailto:hello@amarpalibeauty.in"
              >
                <span className="material-symbols-outlined text-primary-fixed text-[18px] shrink-0">mail</span>
                <span className="font-body-md text-body-md">hello@amarpalibeauty.in</span>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <p className="font-body-sm text-body-sm text-outline-variant">
            © 2025 Amarpali Beauty Studio. All rights reserved. Roorkee, India.
          </p>
          <div className="flex items-center gap-6">
            <a
              className="font-label-sm text-label-sm text-outline-variant hover:text-inverse-on-surface transition-colors"
              href="#services"
              onClick={(e) => goSection(e, 'services')}
            >
              Rituals &amp; Pricing
            </a>
            <a
              className="font-label-sm text-label-sm text-outline-variant hover:text-inverse-on-surface transition-colors"
              href="/contact"
              onClick={(e) => {
                e.preventDefault()
                navigate('/contact')
              }}
            >
              Concierge
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
