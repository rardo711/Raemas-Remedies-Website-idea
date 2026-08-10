import { useEffect, useState } from 'react'
import { brandAsset, getProductPhotos } from '../lib/assets'
import { LeafBullet } from './Ornaments'

/**
 * Product imagery, in strict order of preference:
 *
 *   1. Real photography from src/assets/products/<id>/ once it exists.
 *   2. The cream label art on a soft sand ground — the interim treatment.
 *   3. A typographic plate, if even the label scan is missing.
 *
 * No stock photography and no external image URLs, ever.
 */

const SAND = 'bg-[linear-gradient(160deg,#FBF8F1_0%,#F1E9DA_55%,#E8DDC8_100%)]'

/**
 * One frame shape for every product image, so cards stay on a tidy grid
 * whether they're showing a photo or a stand-in. 3:4 because the photography
 * is shot in portrait — a square frame would crop the tops off the bottles.
 */
export const PRODUCT_ASPECT = 'aspect-[3/4]'

/**
 * Shaped like one of her labels rather than like a missing image: a ruled
 * plate carrying the motto, the product name, and the size. It reads as
 * intentional on a live site, and gets replaced the moment art or photography
 * is added.
 */
function TypographicPlate({ name, size }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${SAND} p-5 sm:p-7`}
    >
      <span className="double-rule flex h-full w-full flex-col items-center justify-center px-4 py-6 text-center">
        {/* An ornament rather than the motto: at card width the full motto
            wraps, and a truncated one reads as a mistake. */}
        <LeafBullet className="text-sage" />
        <span className="mt-3 block font-serif text-lg leading-snug text-espresso/80 sm:text-xl">
          {name}
        </span>
        <span className="mt-3 block h-px w-10 bg-espresso/25" aria-hidden="true" />
        {size ? <span className="motto mt-3">{size}</span> : null}
      </span>
    </div>
  )
}

export function ProductImage({ product, className = '', priority = false }) {
  const [labelFailed, setLabelFailed] = useState(false)
  const photos = getProductPhotos(product.id)
  const photo = photos[0]

  if (photo) {
    return (
      <div className={`overflow-hidden ${SAND} ${className}`}>
        <img
          src={photo}
          alt={`${product.name}${product.size ? `, ${product.size}` : ''}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  if (product.labelArt?.cream && !labelFailed) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden p-6 ${SAND} ${className}`}
      >
        <img
          src={brandAsset.label(product.labelArt.cream)}
          onError={() => setLabelFailed(true)}
          alt={`The printed label for ${product.name}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="max-h-full w-auto max-w-full object-contain"
        />
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <TypographicPlate name={product.name} size={product.size} />
    </div>
  )
}

/**
 * The dark label variant, used once per detail page as decorative detail
 * inside the near-black section. Renders nothing at all if the file is
 * missing — the section reads fine without it.
 */
export function DarkLabelArt({ product, onUnavailable, className = '' }) {
  const [failed, setFailed] = useState(false)

  // Tell the parent, so a section built around this art can re-centre itself
  // instead of leaving a hole where the image would have been.
  useEffect(() => {
    if (!product.labelArt?.dark || failed) onUnavailable?.()
  }, [product.labelArt?.dark, failed, onUnavailable])

  if (!product.labelArt?.dark || failed) return null

  return (
    <img
      src={brandAsset.label(product.labelArt.dark)}
      onError={() => setFailed(true)}
      alt={`The dark printed label for ${product.name}`}
      loading="lazy"
      decoding="async"
      className={`w-full max-w-xs object-contain ${className}`}
    />
  )
}

/**
 * Gallery for the detail page. Falls back to the single ProductImage
 * treatment when there is no photography yet, so the layout is identical
 * before and after photos arrive.
 */
export function ProductGallery({ product }) {
  const photos = getProductPhotos(product.id)
  const [active, setActive] = useState(0)

  if (photos.length === 0) {
    return (
      <ProductImage
        product={product}
        priority
        className={`double-rule w-full ${PRODUCT_ASPECT}`}
      />
    )
  }

  return (
    <div>
      <div className={`double-rule w-full overflow-hidden ${PRODUCT_ASPECT}`}>
        <img
          src={photos[active]}
          alt={`${product.name}${product.size ? `, ${product.size}` : ''} — view ${active + 1} of ${photos.length}`}
          className="h-full w-full object-cover"
          decoding="async"
        />
      </div>

      {photos.length > 1 && (
        <ul className="mt-3 flex flex-wrap gap-3">
          {photos.map((photo, index) => (
            <li key={photo}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={index === active}
                className={`block h-16 w-16 overflow-hidden border transition-colors ${
                  index === active
                    ? 'border-espresso'
                    : 'border-espresso/20 hover:border-espresso/60'
                }`}
              >
                <img
                  src={photo}
                  alt={`Show view ${index + 1} of ${product.name}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
