import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

/**
 * Restores the scroll position on navigation. Skipped when the link asked for
 * a specific section, so "Remedies" from another page lands on the grid
 * instead of the top of the home page.
 */
function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    const target = location.state?.scrollTo

    if (target) {
      const element = document.getElementById(target)
      if (element) {
        element.scrollIntoView({ block: 'start' })
        return
      }
    }

    window.scrollTo(0, 0)
  }, [location])

  return null
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>

      <ScrollManager />
      <Header />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

/** Keeps the browser tab title in step with the route. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | RaeMa's Remedies`
      : "RaeMa's Remedies | Tallow · Herbs · Home · Health"
  }, [title])
}
