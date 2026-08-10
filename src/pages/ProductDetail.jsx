import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatPrice, getProduct, products } from '../data/products'
import { site, whyChoose } from '../data/site'
import { usePageTitle } from '../components/Layout'
import { Accordion } from '../components/Accordion'
import { BuyButton } from '../components/BuyButton'
import { DarkLabelArt, ProductGallery } from '../components/ProductImage'
import { ProductCard } from '../components/ProductCard'
import { HeartRule, LeafBullet, SeedDivider } from '../components/Ornaments'
import { NotFound } from './NotFound'

export function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)

  // Assume the dark label exists, then let DarkLabelArt correct us if the file
  // isn't there — the section reflows to a centred single column instead of
  // holding an empty half.
  const [hasDarkLabel, setHasDarkLabel] = useState(true)
  const noteMissingLabel = useCallback(() => setHasDarkLabel(false), [])

  usePageTitle(product ? product.name : 'Not found')

  // Navigating between two products keeps this component mounted, so the
  // assumption has to be restored by hand.
  useEffect(() => setHasDarkLabel(true), [id])

  if (!product) return <NotFound />

  const others = products.filter((item) => item.id !== product.id)

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Link to="/" className="eyebrow inline-block hover:text-espresso">
          &larr; All remedies
        </Link>
      </div>

      {/* Keyed on the product so the gallery index and open accordions reset
          when moving between two products without unmounting the page. */}
      <article
        key={product.id}
        className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-11"
      >
        <div className="grid gap-11 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
          {/* Gallery — first in the DOM, so it reads first on mobile too. */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* Info column, sticky from `lg` up where there's room for it. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="motto">{site.motto}</p>

            <h1 className="mt-3 font-serif text-4xl leading-[1.12] sm:text-[2.75rem]">
              {product.name}
            </h1>

            {/* Reference order from here down: the description sits open
                directly under the name — ingredients folded into it as one
                plain line — and only then price, size, and the buy button,
                with "How to Use" tucked below the lot. */}
            <div className="mt-4 border-t border-espresso/15">
              <Accordion title="Description" defaultOpen>
                <p className="max-w-prose leading-relaxed">
                  {product.description}
                </p>
                {/* Her plain list, exactly as written, joined with commas,
                    under the heading her flyer gives it — "Made with" on
                    the tallow products, "Ingredients" on the rest. */}
                <p className="mt-4 max-w-prose leading-relaxed">
                  <strong className="font-sans font-medium">
                    {product.ingredientsLabel || 'Ingredients'}:
                  </strong>{' '}
                  {product.ingredients.join(', ')}.
                </p>
              </Accordion>
            </div>

            {/* Required notices, given the prominence they're due. */}
            {product.notice ? (
              <p
                role="note"
                className="double-rule-sage mt-6 bg-sage/10 px-5 py-4 text-sm leading-relaxed text-espresso/85"
              >
                {product.notice}
              </p>
            ) : null}

            {/* Green price over a heart-broken rule — both straight off her
                flyer, which prices everything in green and rests a small
                heart beneath. */}
            <p className="mt-7 font-sans text-3xl text-moss">
              {formatPrice(product.price)}
            </p>
            <HeartRule className="mt-2 text-espresso/45" />

            {product.size ? (
              <p className="mt-4 flex items-center gap-3 text-sm">
                <span className="text-espresso/70">Size:</span>
                <span className="border border-espresso/40 px-3.5 py-1.5">
                  {product.size}
                </span>
              </p>
            ) : null}

            <div className="mt-6">
              <BuyButton product={product} className="w-full sm:w-auto" />
              {!product.checkoutUrl && (
                <p className="handnote mt-4 max-w-sm origin-left">
                  Online checkout isn&rsquo;t open yet &mdash; send a note and
                  we&rsquo;ll hold one for pickup or arrange shipping.
                </p>
              )}
            </div>

            {product.howToUse ? (
              <div className="mt-9 border-t border-espresso/15">
                <Accordion title="How to Use">
                  <p className="max-w-prose leading-relaxed">
                    {product.howToUse}
                  </p>
                </Accordion>
              </div>
            ) : null}
          </div>
        </div>
      </article>

      {/* ── The four things that are true of every jar ───────────────── */}
      <section
        aria-label={`Why choose ${site.name}`}
        className="grain border-y border-espresso/10 bg-oat/50"
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

      {/* ── The one dark-label section on the page ───────────────────── */}
      <section className="on-dark grain-light bg-espresso text-cream">
        <div
          className={`mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-14 sm:px-6 sm:py-[4.75rem] ${
            hasDarkLabel ? 'text-center md:flex-row md:text-left' : 'text-center'
          }`}
        >
          <DarkLabelArt
            key={product.id}
            product={product}
            onUnavailable={noteMissingLabel}
            className="set-a mx-auto md:mx-0 md:w-1/2"
          />

          <div className={hasDarkLabel ? 'md:flex-1' : 'mx-auto max-w-2xl'}>
            <p className="motto">{site.motto}</p>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl">
              Made in small batches, by hand
            </h2>
            <p
              className={`mt-5 max-w-prose leading-relaxed text-cream/75 ${
                hasDarkLabel ? 'mx-auto md:mx-0' : 'mx-auto'
              }`}
            >
              Every jar and bottle is mixed, poured, and labelled by{' '}
              {site.maker} in {site.location} &mdash; in batches small enough
              that she knows what went into each one.
            </p>
            <Link to="/meet-raema" className="btn-on-dark mt-8">
              Meet RaeMa
            </Link>
          </div>
        </div>
      </section>

      {/* ── More remedies ────────────────────────────────────────────── */}
      <section aria-labelledby="more-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-[5.5rem]">
          <div className="text-center">
            <h2 id="more-heading" className="font-serif text-2xl sm:text-3xl">
              More remedies
            </h2>
            <SeedDivider className="mt-5 text-sage" />
          </div>

          <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item, index) => (
              <li key={item.id} className="flex">
                <div className="flex w-full">
                  <ProductCard product={item} index={index} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
