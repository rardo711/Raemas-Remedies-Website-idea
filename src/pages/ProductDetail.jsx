import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatPrice, getProduct, products } from '../data/products'
import { site } from '../data/site'
import { usePageTitle } from '../components/Layout'
import { Accordion } from '../components/Accordion'
import { BuyButton } from '../components/BuyButton'
import { DarkLabelArt, ProductGallery } from '../components/ProductImage'
import { ProductCard } from '../components/ProductCard'
import { BotanicalDivider, LeafBullet } from '../components/Ornaments'
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
        className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery — first in the DOM, so it reads first on mobile too. */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* Info column, sticky from `lg` up where there's room for it. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="motto">{site.motto}</p>

            <h1 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-serif text-2xl">
                {formatPrice(product.price)}
              </span>
              {product.size ? (
                <span className="eyebrow">{product.size}</span>
              ) : null}
            </p>

            <p className="mt-5 max-w-prose leading-relaxed text-espresso/80">
              {product.summary}
            </p>

            {/* Required notices, given the prominence they're due. */}
            {product.notice ? (
              <p
                role="note"
                className="double-rule-sage mt-6 bg-sage/10 px-5 py-4 text-sm leading-relaxed text-espresso/85"
              >
                {product.notice}
              </p>
            ) : null}

            <div className="mt-7">
              <BuyButton product={product} className="w-full sm:w-auto" />
              {!product.checkoutUrl && (
                <p className="mt-3 text-xs leading-relaxed text-espresso/70">
                  Online checkout isn&rsquo;t open yet. Send a note and
                  we&rsquo;ll hold one for pickup or arrange shipping.
                </p>
              )}
            </div>

            <div className="mt-9">
              <Accordion title="Description" defaultOpen>
                <p className="max-w-prose leading-relaxed">
                  {product.description}
                </p>
              </Accordion>

              {product.howToUse ? (
                <Accordion title="How to Use">
                  <p className="max-w-prose leading-relaxed">
                    {product.howToUse}
                  </p>
                </Accordion>
              ) : null}

              <Accordion title="Ingredients">
                {/* Her plain list, exactly as written. No per-ingredient
                    benefit breakdowns. */}
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient} className="flex items-start gap-3">
                      <LeafBullet className="mt-1.5 text-sage" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
          </div>
        </div>
      </article>

      {/* ── The one dark-label section on the page ───────────────────── */}
      <section className="on-dark bg-espresso text-cream">
        <div
          className={`mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 ${
            hasDarkLabel ? 'text-center md:flex-row md:text-left' : 'text-center'
          }`}
        >
          <DarkLabelArt
            key={product.id}
            product={product}
            onUnavailable={noteMissingLabel}
            className="mx-auto md:mx-0 md:w-2/5"
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
            <Link to="/meet-raema" className="btn-on-dark mt-7">
              Meet RaeMa
            </Link>
          </div>
        </div>
      </section>

      {/* ── More remedies ────────────────────────────────────────────── */}
      <section aria-labelledby="more-heading">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <h2 id="more-heading" className="font-serif text-2xl sm:text-3xl">
              More remedies
            </h2>
            <BotanicalDivider className="mt-5 text-espresso/50" />
          </div>

          <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.id} className="flex">
                <div className="flex w-full">
                  <ProductCard product={item} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
