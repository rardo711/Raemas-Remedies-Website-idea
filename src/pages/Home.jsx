import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { site, stockist, whyChoose } from '../data/site'
import { usePageTitle } from '../components/Layout'
import { BrandMark } from '../components/BrandMark'
import { ProductCard } from '../components/ProductCard'
import {
  BotanicalDivider,
  HeartAndArrow,
  InkRule,
  LeafBullet,
  Sprig,
} from '../components/Ornaments'

export function Home() {
  usePageTitle('')

  function scrollToRemedies() {
    document.getElementById('remedies')?.scrollIntoView({ block: 'start' })
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_-10%,#F7F1E6_0%,#EFE7D8_52%,#E5DAC6_100%)]">
        {/* Laurel sprigs from the emblem, stood up either side of the
            headline. They're bounded to their own column rather than to the
            viewport, so on a wide monitor they stay beside the words instead
            of drifting off to the far edges — and below `lg` they go
            entirely, because at that width there is no margin to put them in.
            The right-hand one hangs lower than the left; a matched pair would
            give the trick away. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-32 mx-auto hidden max-w-5xl px-6 lg:block"
        >
          <Sprig className="absolute left-6 h-44 w-16 text-espresso/20" />
          <Sprig className="absolute right-6 top-10 h-44 w-16 -scale-x-100 text-espresso/[0.17]" />
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <BrandMark size={190} className="mx-auto sm:hidden" />
          <BrandMark size={280} className="mx-auto hidden sm:block" />

          <p className="motto mt-8">{site.motto}</p>

          {/* "old way" carries the line, so it's the part set in italic —
              the stress a person puts there reading it out loud. */}
          <h1 className="mt-5 font-serif text-4xl leading-[1.08] sm:text-6xl">
            Made by hand,
            <br />
            the <em>old way</em>.
          </h1>

          <InkRule className="mx-auto mt-7 max-w-[9rem] text-espresso/30" />

          <p className="mx-auto mt-6 max-w-prose text-base leading-relaxed text-espresso/75 sm:text-lg">
            {site.tagline}, rendered and infused in small batches in{' '}
            {site.location} by {site.maker}.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
        className="grain border-y border-espresso/10 bg-sage/10"
      >
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-y-6 px-4 py-9 sm:px-6 lg:grid-cols-4">
          {whyChoose.map((item, index) => (
            <li
              key={item}
              className={`flex items-center justify-center gap-2.5 text-center ${
                ['set-a', 'set-b', 'set-c', 'set-d'][index % 4]
              }`}
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
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-[5.5rem]">
          <div className="text-center">
            <p className="eyebrow">Small batch, made to order</p>
            <h2
              id="remedies-heading"
              className="mt-3 font-serif text-3xl sm:text-4xl"
            >
              The Remedies
            </h2>
            <BotanicalDivider className="mt-6 text-espresso/45" />
          </div>

          <ul className="mt-11 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <li key={product.id} className="flex">
                <div className="flex w-full">
                  <ProductCard
                    product={product}
                    index={index}
                    priority={index < 2}
                  />
                </div>
              </li>
            ))}
          </ul>

          <p className="handnote mx-auto mt-11 max-w-md text-center">
            Everything is made to order in her own kitchen, so what&rsquo;s
            ready to go changes week to week.
          </p>
        </div>
      </section>

      {/* ── Meet RaeMa teaser ────────────────────────────────────────── */}
      <section
        aria-labelledby="meet-teaser-heading"
        className="grain border-y border-espresso/10 bg-parchment"
      >
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-[5.25rem]">
          <p className="eyebrow">The hands behind the jar</p>
          <h2
            id="meet-teaser-heading"
            className="mt-3 font-serif text-3xl sm:text-4xl"
          >
            Meet RaeMa
          </h2>

          <p className="mx-auto mt-6 max-w-prose text-base leading-relaxed text-espresso/75 sm:text-lg">
            Rachael Harrelson was born and raised right here in Tattnall County.
            She&rsquo;s a mother of four and RaeMa to two grandbabies, and
            she&rsquo;s spent close to twenty years making clean, natural
            remedies for her own family &mdash; first for her children, now for
            her grandchildren.
          </p>

          <Link to="/meet-raema" className="btn-secondary mt-9">
            Read her story
          </Link>
        </div>
      </section>

      {/* ── Stockist ─────────────────────────────────────────────────── */}
      <section aria-labelledby="stockist-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-[5.5rem]">
          <div className="double-rule grain set-c mx-auto max-w-2xl bg-parchment px-6 py-11 text-center sm:px-10">
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

            <Link to="/order" className="btn-primary mt-8">
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
