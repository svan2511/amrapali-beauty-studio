// Shared navigation helper for a HashRouter single-page site.
// Section anchors (#services etc.) only exist on the home page, so when
// we're on another route we go home first, then scroll after a tick.
export function goHomeSection(navigate, pathname, section) {
  if (pathname !== '/') {
    navigate('/')
    setTimeout(() => {
      if (!section || section === 'top' || section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
      }
    }, 150)
    return true // caller should preventDefault()
  }
  return false
}
