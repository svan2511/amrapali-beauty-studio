import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import BrandIntro from './components/BrandIntro.jsx'
import SignatureServices from './components/SignatureServices.jsx'
import FeaturedExperience from './components/FeaturedExperience.jsx'
import WhyAmarpali from './components/WhyAmarpali.jsx'
import Transformation from './components/Transformation.jsx'
import LookGallery from './components/LookGallery.jsx'
import Testimonials from './components/Testimonials.jsx'
import MomentsStrip from './components/MomentsStrip.jsx'
import SocialGrid from './components/SocialGrid.jsx'
import AppointmentCTA from './components/AppointmentCTA.jsx'
import Footer from './components/Footer.jsx'
import Preloader from './components/Preloader.jsx'
import BookingModal from './components/BookingModal.jsx'
import { BookingProvider } from './lib/booking.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'

const FIRST_LOAD_MS = 2000
const NAV_LOAD_MS = 900
const FADE_MS = 500

function Shell() {
  const { pathname } = useLocation()
  const [phase, setPhase] = useState('loading') // loading | leaving | done
  const [full, setFull] = useState(true)
  const [runId, setRunId] = useState(0)
  const first = useRef(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    const dur = first.current ? FIRST_LOAD_MS : NAV_LOAD_MS
    setFull(first.current)
    first.current = false
    setRunId((n) => n + 1)
    setPhase('loading')
    const t1 = setTimeout(() => setPhase('leaving'), dur)
    const t2 = setTimeout(() => setPhase('done'), dur + FADE_MS)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname])

  return (
    <>
      <Preloader phase={phase} full={full} runId={runId} />
      <div className="min-h-full bg-background font-body-md text-body-md text-on-surface antialiased">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        <BookingModal />
      </div>
    </>
  )
}

function Home() {
  return (
    <main className="w-full bg-background">
      <div className="flex flex-col w-full">
        <Hero />
        <BrandIntro />
        <SignatureServices />
        <FeaturedExperience />
        <WhyAmarpali />
        <Transformation />
        <LookGallery />
        <Testimonials />
        <MomentsStrip />
        <SocialGrid />
        <AppointmentCTA />
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Shell />
      </BookingProvider>
    </BrowserRouter>
  )
}
