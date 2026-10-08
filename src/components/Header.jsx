import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { goHomeSection } from '../lib/nav.js'
import { useBooking } from '../lib/booking.jsx'

const LINKS = [
  { label: 'Home', href: '#home', section: 'home', icon: 'home', route: '/' },
  { label: 'About', href: '#about', section: 'about', icon: 'storefront', route: '/' },
  { label: 'Services', href: '#services', section: 'services', icon: 'spa', route: '/' },
  { label: 'Gallery', href: '#gallery', section: 'gallery', icon: 'photo_library', route: '/' },
  { label: 'Contact', href: '/contact', section: null, icon: 'call', route: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { openBooking } = useBooking()
  const onAbout = pathname === '/about'
  const onServicesPage = pathname === '/services'
  const onContactPage = pathname === '/contact'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the menu of the section currently in view (home only).
  // Clicking a link also sets it instantly for immediate feedback.
  useEffect(() => {
    if (onAbout) {
      setActive('About')
      return
    }
    if (onServicesPage) {
      setActive('Services')
      return
    }
    if (onContactPage) {
      setActive('Contact')
      return
    }
    const targets = LINKS.map((l) => l.section && document.getElementById(l.section)).filter(Boolean)
    if (!targets.length) return
    const byId = Object.fromEntries(LINKS.filter((l) => l.section).map((l) => [l.section, l.label]))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(byId[e.target.id])
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [onAbout, onServicesPage, onContactPage, pathname])

  const handleNav = (e, l) => {
    setActive(l.label)
    setOpen(false)
    if (l.route !== '/') {
      e.preventDefault()
      if (pathname !== l.route) navigate(l.route)
      else window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (goHomeSection(navigate, pathname, l.section)) e.preventDefault()
  }

  const goBook = (e) => {
    e.preventDefault()
    setOpen(false)
    openBooking()
  }

  const goHome = (e) => {
    e.preventDefault()
    setActive('Home')
    navigate('/')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-fade-down ${
        scrolled
          ? 'bg-surface/85 backdrop-blur-2xl header-scrolled'
          : 'bg-surface/70 backdrop-blur-xl shadow-[0_8px_32px_-4px_rgba(73,61,53,0.04)]'
      }`}
    >
      {/* premium gold hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-80" />
      {/* slim announcement strip */}
      <div className="hidden md:flex items-center justify-center gap-2 py-1.5 bg-inverse-surface text-inverse-on-surface">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim pulse-dot" />
        <p className="font-label-sm text-label-sm uppercase tracking-[0.18em]">
          Open all 7 days • 10:00 AM – 8:30 PM 
        </p>
      </div>

      <div
        className={`max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6 transition-all duration-500 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <div className="flex items-center gap-3 group">
          <span className="relative">
            <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary-container via-primary-fixed to-primary-container opacity-60 blur-[6px] group-hover:opacity-100 transition-opacity" />
            <img
              alt="Amarpali Beauty Studio Logo"
              className="relative h-12 w-12 rounded-full object-contain bg-[#f6efe6] p-0.5 shadow-sm shrink-0 ring-1 ring-primary/25 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
              src="/logo.webp"
            />
          </span>
          {/* slim gold divider between mark and wordmark */}
          <span className="hidden min-[420px]:block w-px h-9 shrink-0 bg-gradient-to-b from-transparent via-primary-container to-transparent" />
          <a className="flex flex-col leading-none" href="/" onClick={goHome} aria-label="Amarpali Beauty Studio home">
            <span
              className="font-display-xl text-on-surface text-[22px] min-[420px]:text-[25px] font-medium"
              style={{ letterSpacing: '0.045em', lineHeight: 1.1 }}
            >
              Amarpali
            </span>
            <span className="flex items-center gap-1.5 pt-[6px]">
              <span className="h-px w-4 min-[420px]:w-5 shrink-0 bg-primary-container/90" />
              <span
                className="font-label-sm uppercase text-primary whitespace-nowrap text-[8.5px] min-[420px]:text-[9.5px]"
                style={{ letterSpacing: '0.3em' }}
              >
                Beauty Studio
              </span>
            </span>
          </a>
        </div>

        {/* floating glass pill nav */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-surface-container-low/70 backdrop-blur-xl ring-1 ring-primary/15 shadow-[0_10px_30px_-10px_rgba(73,61,53,0.25)]">
          {LINKS.map((l) =>
            active === l.label ? (
              <a
                key={l.label}
                aria-current="page"
                onClick={(e) => handleNav(e, l)}
                className="group inline-flex items-center gap-1.5 py-2 px-4 rounded-full bg-gradient-to-r from-primary to-on-primary-fixed-variant text-on-primary font-title-md text-[15px] shadow-[0_8px_20px_-8px_rgba(118,90,38,0.7)] ring-1 ring-primary-fixed/40 transition-transform duration-300 hover:-translate-y-px"
                href={l.href}
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                {l.label}
              </a>
            ) : (
              <a
                key={l.label}
                onClick={(e) => handleNav(e, l)}
                className="nav-premium group inline-flex items-center gap-1.5 font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-all duration-300 py-2 px-4 rounded-full hover:bg-white/70 hover:shadow-sm"
                href={l.href}
              >
                <span className="material-symbols-outlined text-[16px] text-primary/70 transition-transform duration-300 group-hover:scale-110">
                  {l.icon}
                </span>
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="btn-shine hidden sm:inline-flex items-center justify-center gap-2 font-label-lg text-label-lg px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-container to-[#d8b67e] text-on-primary-container shadow-[0_10px_30px_-8px_rgba(118,90,38,0.5)] ring-1 ring-primary/20 hover:bg-primary hover:text-on-primary hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_rgba(118,90,38,0.55)] transition-all duration-300"
            href="#book"
            onClick={goBook}
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Book Appointment
          </a>
          <div className="hidden sm:flex w-8 h-8 rounded-full bg-primary items-center justify-center ring-2 ring-primary-fixed/60">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
          {/* mobile toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface ring-1 ring-primary/15 hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">
              {open ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-4 mb-4 p-2 flex flex-col gap-1 rounded-2xl bg-surface/95 backdrop-blur-2xl ring-1 ring-primary/15 shadow-[0_20px_50px_-12px_rgba(73,61,53,0.3)]">
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleNav(e, l)}
              style={{ transitionDelay: `${i * 30}ms` }}
              className={`relative flex items-center gap-3 pl-4 pr-3 py-3 rounded-xl font-label-lg text-label-lg transition-all duration-300 overflow-hidden ${
                open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              } ${
                active === l.label
                  ? 'bg-gradient-to-r from-primary-container/50 to-transparent text-primary font-title-md ring-1 ring-primary/15'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              {active === l.label && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-gradient-to-b from-primary-container to-primary" />
              )}
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  active === l.label ? 'bg-primary text-on-primary' : 'bg-surface-container text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">{l.icon}</span>
              </span>
              {l.label}
              <span className="material-symbols-outlined text-sm opacity-50 ml-auto">arrow_forward</span>
            </a>
          ))}
          <a
            href="#book"
            onClick={goBook}
            className="btn-shine mt-2 inline-flex items-center justify-center gap-2 font-label-lg text-label-lg px-5 py-3 rounded-full bg-primary text-on-primary"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Book Appointment
          </a>
        </nav>
      </div>
    </header>
  )
}
