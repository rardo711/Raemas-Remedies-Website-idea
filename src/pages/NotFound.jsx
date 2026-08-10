import { Link } from 'react-router-dom'
import { usePageTitle } from '../components/Layout'
import { BotanicalDivider } from '../components/Ornaments'

export function NotFound() {
  usePageTitle('Page not found')

  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="eyebrow">Nothing on this shelf</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
        We couldn&rsquo;t find that
      </h1>
      <BotanicalDivider className="mt-7 text-espresso/45" />
      <p className="mx-auto mt-7 max-w-prose leading-relaxed text-espresso/75">
        The page you were after isn&rsquo;t here. Have a look at the remedies
        instead.
      </p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className="btn-primary">
          Back home
        </Link>
        <Link to="/order" className="btn-secondary">
          Place an order
        </Link>
      </div>
    </section>
  )
}
