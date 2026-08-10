import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatPrice, getProduct, products } from '../data/products'
import { site, whyChoose } from '../data/site'
import { usePageTitle } from '../components/Layout'
import { Accordion } from '../components/Accordion'
import { BuyButton } from '../components/BuyButton'
import { DarkLabelArt, ProductGallery } from '../components/ProductImage'
import { ProductCard } from '../components/ProductCard'
import { BotanicalDivider, InkRule, LeafBullet } from '../components/Ornaments'
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

            <h1 className="mt-4 font-serif text-[2.6rem] leading-[1.05] sm:text-5xl">
              {product.name}
            </h1>

            {/* The rule under the name is drawn, not ruled. It sits a little
                short of the column on purpose. */}
            <InkRule className="mt-5 max-w-[13rem] text-espresso/35" />

            <p className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-serif text-3xl">
                {formatPrice(product.price)}
              </span>
              {product.size ? (
                <span className="eyebrow">{product.size}</span>
              ) : null}
            </p>

            {/* The one line that has to land. Set in the serif, a size up
                from the body, the way the opening line of a letter is. */}
            <p className="mt-6 max-w-prose font-serif text-xl leading-relaxed text-espresso/85 sm:text-[1.4rem]">
              {product.summary}
            </p>

            {/* Required notices, given the prominence they're due. */}
            {product.notice ? (
              <p
                role="note"
                className="double-rule-sage mt-7 bg-sage/10 px-5 py-4 text-sm leading-relaxed text-espresso/85"
              >
                {product.notice}
              </p>
            ) : null}

            <div className="mt-8">
              <BuyButton product={product} className="w-full sm:w-auto" />
              {!product.checkoutUrl && (
                <p className="handnote mt-4 max-w-sm origin-left">
                  Online checkout isn&rsquo;t open yet &mdash; send a note and
                  we&rsquo;ll hold one for pickup or arrange shipping.
                </p>
              )}
            </div>

            <div className="mt-10">
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

              <Accordion title="What’s in it">
                {/* Her plain list, exactly as written. No per-ingredient
                    benefit breakdowns. */}
                <ul className="space-y-2.5">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient} className="flex items-start gap-3">
                      <LeafBullet className="mt-[0.4rem] text-sage" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
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
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
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
            <h2 id="more-heading" className="font-serif text-3xl sm:text-4xl">
              More remedies
            </h2>
            <BotanicalDivider className="mt-5 text-espresso/45" />
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
