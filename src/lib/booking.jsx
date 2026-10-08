import { createContext, useCallback, useContext, useState } from 'react'

const BookingCtx = createContext(null)

// Global booking-modal state. openBooking(serviceTitle?) opens the popup
// anywhere in the app, optionally pre-selecting a service.
export function BookingProvider({ children }) {
  const [state, setState] = useState({ open: false, service: '' })

  const openBooking = useCallback((service = '') => {
    setState({ open: true, service })
  }, [])

  const closeBooking = useCallback(() => {
    setState((s) => ({ ...s, open: false }))
  }, [])

  return (
    <BookingCtx.Provider value={{ ...state, openBooking, closeBooking }}>
      {children}
    </BookingCtx.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingCtx)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}
