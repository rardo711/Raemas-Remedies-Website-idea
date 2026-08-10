import { Link } from 'react-router-dom'

/**
 * The CTA flips automatically on the presence of a Stripe Payment Link.
 *
 *   checkoutUrl === ''  →  "Set one aside for me", routed to the order form
 *   checkoutUrl set     →  "Buy now", routed to Stripe
 *
 * Nothing else needs changing when payment links go live: paste the URL into
 * src/data/products.js and every button for that product follows.
 */
export function BuyButton({ product, variant = 'primary', className = '' }) {
  const classes = {
    // The buy action wears the green; everything else on the page keeps to
    // espresso, so the one button that matters is the one in colour.
    primary: 'btn-buy',
    secondary: 'btn-secondary',
    dark: 'btn-on-dark',
  }[variant]

  if (product.checkoutUrl) {
    return (
      <a
        href={product.checkoutUrl}
        className={`${classes} ${className}`}
        rel="noopener noreferrer"
      >
        Buy now
      </a>
    )
  }

  return (
    <Link
      to={`/order?product=${encodeURIComponent(product.id)}`}
      className={`${classes} ${className}`}
    >
      Set one aside for me
    </Link>
  )
}
