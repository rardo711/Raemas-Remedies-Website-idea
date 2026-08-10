import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { PRODUCT_ASPECT, ProductImage } from './ProductImage'
import { BuyButton } from './BuyButton'

/*
 * The tilt cycle. Four fixed angles, picked by position in the grid rather
 * than at random, so the page looks identical on every load — it just doesn't
 * look ruled. `index` is the card's place in whatever list is rendering it;
 * without one every card sits straight, which is the right default anywhere a
 * card appears on its own.
 */
const TILTS = ['set-a', 'set-b', 'set-c', 'set-d']

export function ProductCard({ product, priority = false, index = null }) {
  const tilt = index === null ? '' : TILTS[index % TILTS.length]

  return (
    <article
      className={`double-rule grain group flex flex-col bg-parchment transition-[transform,box-shadow] duration-300
                  hover:!rotate-0 hover:shadow-[0_3px_22px_rgba(33,28,22,0.09)] ${tilt}`}
    >
      <Link
        to={`/product/${product.id}`}
        className="block"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProductImage
          product={product}
          priority={priority}
          className={`w-full ${PRODUCT_ASPECT}`}
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 pt-4">
        <h3 className="font-serif text-xl leading-snug">
          <Link
            to={`/product/${product.id}`}
            className="transition-colors hover:text-espresso/65"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso/70">
          {product.summary}
        </p>

        <p className="mt-4 flex items-baseline gap-2.5 font-sans text-lg">
          {formatPrice(product.price)}
          {product.size ? <span className="motto">{product.size}</span> : null}
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <BuyButton product={product} className="btn-compact w-full" />
          <Link
            to={`/product/${product.id}`}
            className="btn-secondary btn-compact w-full"
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  )
}
