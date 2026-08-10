import { Link } from 'react-router-dom'
import { BrandMark } from './BrandMark'
import { HeartAndArrow } from './Ornaments'
import { disclaimer, site, stockist } from '../data/site'

export function Footer() {
  return (
    <footer className="on-dark mt-24 bg-espresso text-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <BrandMark size={80} tone="dark" />
          <p className="mt-4 font-serif text-xl">{site.name}</p>
          <p className="motto mt-2">{site.motto}</p>
          <HeartAndArrow className="mt-5 text-cream/40" />
        </div>

        <div className="mt-10 grid gap-8 border-t border-cream/15 pt-10 text-sm sm:grid-cols-3 sm:text-left">
          <div>
            <h2 className="eyebrow">Browse</h2>
            <ul className="mt-3 space-y-2 text-cream/80">
              <li>
                <Link to="/" className="link-underline decoration-cream/30 hover:decoration-cream">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/meet-raema"
                  className="link-underline decoration-cream/30 hover:decoration-cream"
                >
                  Meet RaeMa
                </Link>
              </li>
              <li>
                <Link
                  to="/order"
                  className="link-underline decoration-cream/30 hover:decoration-cream"
                >
                  Order &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow">Made in</h2>
            <p className="mt-3 text-cream/80">{site.location}</p>
            <p className="mt-1 text-cream/60">Handcrafted by {site.maker}</p>
          </div>

          <div>
            <h2 className="eyebrow">Find us</h2>
            <p className="mt-3 text-cream/80">
              {stockist.name}
              <br />
              {stockist.city}
            </p>
            {site.facebookUrl ? (
              <p className="mt-3">
                <a
                  href={site.facebookUrl}
                  className="link-underline decoration-cream/30 hover:decoration-cream"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Follow on Facebook
                </a>
              </p>
            ) : null}
          </div>
        </div>

        {/* Required on every page. */}
        <p className="mx-auto mt-12 max-w-prose border-t border-cream/15 pt-6 text-center text-xs leading-relaxed text-cream/55">
          {disclaimer}
        </p>

        <p className="mt-6 text-center text-xs text-cream/60">
          &copy; {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
