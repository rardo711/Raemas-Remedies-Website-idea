import { useEffect, useId, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BrandMark } from './BrandMark'
import { LeafBullet } from './Ornaments'
import { site } from '../data/site'

const navLinks = [
  // "Remedies" is a section of the home page rather than a route, so it
  // scrolls when we're already home and navigates-then-scrolls when we aren't.
  { label: 'Remedies', to: '/', scrollTo: 'remedies' },
  { label: 'Meet RaeMa', to: '/meet-raema' },
  { label: 'Order', to: '/order' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const menuId = useId()

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname, location.search])

  function handleNav(event, link) {
    if (!link.scrollTo) return
    event.preventDefault()
    setOpen(false)

    if (location.pathname === '/') {
      document
        .getElementById(link.scrollTo)
        ?.scrollIntoView({ block: 'start' })
    } else {
      navigate(link.to, { state: { scrollTo: link.scrollTo } })
    }
  }

  // The page you're on keeps a penned underline (see .nav-here) — a shape,
  // not just a colour shift, so orientation survives any kind of vision.
  const linkClass = ({ isActive }) =>
    `eyebrow py-2 transition-colors hover:text-espresso ${
      isActive ? 'nav-here text-espresso' : ''
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-cream/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          {/* A hair off true, like a stamp pressed by hand. */}
          <BrandMark size={48} className="set-b" />
          <span className="leading-none">
            <span className="block font-serif text-lg sm:text-xl">
              RaeMa&rsquo;s Remedies
            </span>
            <span className="motto mt-1 hidden sm:block">{site.motto}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              className={linkClass}
              onClick={(event) => handleNav(event, link)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-4 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 block h-px w-6 bg-espresso transition-transform duration-200 ${
                open ? 'top-2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-px w-6 bg-espresso transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-espresso transition-transform duration-200 ${
                open ? 'top-2 -rotate-45' : 'top-4'
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id={menuId}
          aria-label="Main"
          className="border-t border-espresso/10 bg-cream md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-espresso/10 last:border-0">
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `eyebrow py-2 transition-colors hover:text-espresso ${
                      isActive ? 'text-espresso' : ''
                    }`
                  }
                  onClick={(event) => handleNav(event, link)}
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-2 py-2">
                      {/* Same "you are here" idea as the desktop underline,
                          in the site's own idiom. */}
                      {isActive && <LeafBullet className="text-sage" />}
                      {link.label}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
