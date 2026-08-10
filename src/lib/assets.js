/**
 * Image resolution for a site whose real artwork arrives in stages.
 *
 * Two different mechanisms, on purpose:
 *
 *  - Brand art (emblem, label scans) lives in `public/assets/brand/`. It is
 *    referenced by URL, so dropping a file in makes it appear with no code
 *    change and no rebuild of an import graph.
 *
 *  - Photography lives in `src/assets/...` so Vite can hash and optimise it.
 *    It is picked up with import.meta.glob, which — unlike a static import —
 *    does not fail the build when the folder is empty. That matters today:
 *    none of these files exist yet.
 *
 * Anything that comes back undefined is handled by the components, which fall
 * back to a typographic placeholder rather than a broken image.
 */

/** Prefix a public-folder path with Vite's base so it survives GitHub Pages. */
export function publicAsset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export const brandAsset = {
  logo: publicAsset('assets/brand/logo-main.png'),
  label: (filename) => publicAsset(`assets/brand/labels/${filename}`),
}

// Eagerly globbed so lookups are synchronous during render.
const productPhotos = import.meta.glob(
  '../assets/products/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default' },
)

const familyPhotos = import.meta.glob(
  '../assets/brand/raema-family.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
)

/**
 * Every photo found for a product, sorted by filename so the gallery order is
 * controlled by naming them 01-…, 02-… etc. Empty array until photos land.
 */
export function getProductPhotos(productId) {
  const prefix = `../assets/products/${productId}/`
  return Object.entries(productPhotos)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url)
}

/** The family photo for the Meet RaeMa page, or undefined if not added yet. */
export function getFamilyPhoto() {
  return Object.values(familyPhotos)[0]
}
