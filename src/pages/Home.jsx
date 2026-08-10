import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { site, stockist, whyChoose } from '../data/site'
import { usePageTitle } from '../components/Layout'
import { BrandMark } from '../components/BrandMark'
import { ProductCard } from '../components/ProductCard'
import { BotanicalDivider, HeartAndArrow, LeafBullet } from '../components/Ornaments'

export function Home() {
  usePageTitle('')

  function scrollToRemedies() {
    document.getElementById('remedies')?.scrollIntoView({ block: 'start' })
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#FBF8F1_0%,#F5F0E6_55%,#EFE7D6_100%)]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <BrandMark size={190} className="mx-auto sm:hidden" />
          <BrandMark size={280} className="mx-auto hidden sm:block" />

          <p className="motto mt-8">{site.motto}</p>

          <h1 className="mt-5 font-serif text-4xl leading-[1.1] sm:text-6xl">
            Made by hand,
            <br />
            the old way.
          </h1>

          <p className="mx-auto mt-6 max-w-prose text-base leading-relaxed text-espresso/75 sm:text-lg">
            {site.tagline}, rendered and infused in small batches in{' '}
            {site.location} by {site.maker}.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToRemedies}
              className="btn-primary w-full sm:w-auto"
            >
              Shop the remedies
            </button>
            <Link to="/meet-raema" className="btn-secondary w-full sm:w-auto">
              Meet RaeMa
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why choose (from her flyer) ──────────────────────────────── */}
      <section
        aria-label="Why choose RaeMa's Remedies"
        className="border-y border-espresso/10 bg-sage/10"
      >
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-y-5 px-4 py-8 sm:px-6 lg:grid-cols-4">
          {whyChoose.map((item) => (
            <li
              key={item}
              className="flex items-center justify-center gap-2 text-center"
            >
              <LeafBullet className="text-sage" />
              <span className="eyebrow !text-espresso/70">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── The remedies ─────────────────────────────────────────────── */}
      <section
        id="remedies"
        aria-labelledby="remedies-heading"
        className="scroll-mt-24"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <p className="eyebrow">Small batch, made to order</p>
            <h2
              id="remedies-heading"
              className="mt-3 font-serif text-3xl sm:text-4xl"
            >
              The Remedies
            </h2>
            <BotanicalDivider className="mt-6 text-espresso/50" />
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <li key={product.id} className="flex">
                <div className="flex w-full">
                  <ProductCard product={product} priority={index < 2} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Meet RaeMa teaser ────────────────────────────────────────── */}
      <section
        aria-labelledby="meet-teaser-heading"
        className="border-y border-espresso/10 bg-parchment"
      >
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="eyebrow">The hands behind the jar</p>
          <h2
            id="meet-teaser-heading"
            className="mt-3 font-serif text-3xl sm:text-4xl"
          >
            Meet RaeMa
          </h2>

          <p className="mx-auto mt-6 max-w-prose text-base leading-relaxed text-espresso/75">
            Rachael Harrelson was born and raised right here in Tattnall County.
            She&rsquo;s a mother of four and RaeMa to two grandbabies, and
            she&rsquo;s spent close to twenty years making clean, natural
            remedies for her own family &mdash; first for her children, now for
            her grandchildren.
          </p>

          <Link to="/meet-raema" className="btn-secondary mt-8">
            Read her story
          </Link>
        </div>
      </section>

      {/* ── Stockist ─────────────────────────────────────────────────── */}
      <section aria-labelledby="stockist-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="double-rule mx-auto max-w-2xl bg-parchment px-6 py-10 text-center sm:px-10">
            <p className="eyebrow">Also available in person</p>
            <h2
              id="stockist-heading"
              className="mt-3 font-serif text-2xl sm:text-3xl"
            >
              Find us at {stockist.name}
            </h2>
            <p className="mt-3 text-espresso/75">{stockist.city}</p>

            <HeartAndArrow className="mx-auto mt-6 text-espresso/35" />

            <p className="mx-auto mt-6 max-w-prose text-sm leading-relaxed text-espresso/70">
              Prefer to pick yours up? Send a note through the order form and
              we&rsquo;ll set one aside for you.
            </p>

            <Link to="/order" className="btn-primary mt-7">
              Place an order
            </Link>
          </div>
        </div>
      </section>

      {/*
        REVIEWS — intentionally not rendered.
        There are no customer reviews yet, and nothing here is fabricated.
        When real, attributable reviews exist, add them to src/data/site.js and
        render the section here. Do not ship placeholder quotes or star ratings.
      */}
    </>
  )
}
