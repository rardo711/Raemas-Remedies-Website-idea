import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { PRODUCT_ASPECT, ProductImage } from './ProductImage'
import { BuyButton } from './BuyButton'

export function ProductCard({ product, priority = false }) {
  return (
    <article className="double-rule group flex flex-col bg-parchment transition-shadow duration-200 hover:shadow-[0_2px_20px_rgba(33,28,22,0.08)]">
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
            className="transition-colors hover:text-espresso/70"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso/70">
          {product.summary}
        </p>

        <p className="mt-4 flex items-baseline gap-2 font-serif text-lg">
          {formatPrice(product.price)}
          {product.size ? (
            <span className="motto">{product.size}</span>
          ) : null}
        </p>

        <div className="mt-4 flex flex-col gap-2">
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
