/**
 * The single source of truth for everything on the site's product pages.
 *
 * EDITING RULES — please keep these, they are not stylistic preferences:
 *
 *  1. Always write "local pasture-raised tallow". Never "grass-fed".
 *  2. Never invent ingredients, benefits, reviews, ratings, or claims.
 *     Ingredient lists render exactly as written here, as plain lists —
 *     no per-ingredient benefit breakdowns.
 *  3. If you don't know a value, leave it as an empty string. The UI is
 *     built to hide empty fields. Do not guess.
 *
 * FIELDS
 *  id          slug used in the URL (#/product/<id>) and as the folder name
 *              for photography at src/assets/products/<id>/
 *  price       number, USD. Rendered by formatPrice().
 *  size        e.g. "4 oz". Empty string hides the size entirely.
 *  summary     one line, used on cards and in the detail-page intro.
 *  description longer paragraph for the Description accordion.
 *  howToUse    Description accordion's sibling. See the TODO below.
 *  ingredients plain array of strings, rendered as a plain list.
 *  notice      shown prominently on the detail page in a ruled callout.
 *  checkoutUrl EMPTY until a Stripe Payment Link exists. When you paste a
 *              link in, that product's button flips from
 *              "Set one aside for me" to "Buy now" on its own.
 *  labelArt    filenames in public/assets/brand/labels/. null when the
 *              product has no label artwork yet.
 *
 * TODO (Rachael): the `howToUse` text below only repeats what was already
 * written on the labels — no directions were invented. If you use different
 * wording or want to add amounts/frequency, replace these strings.
 */

export const products = [
  {
    id: 'cowboy-cream',
    name: 'Cowboy Cream',
    price: 25,
    size: '4 oz',
    summary: 'A tallow and herb balm for aches, pains, and sprains.',
    description:
      'Cowboy Cream is made in small batches for aches, pains, and sprains. Local pasture-raised tallow and shea butter are blended with comfrey-infused olive oil, jojoba oil, and frankincense.',
    howToUse:
      'Massage a small amount into the area you need it. For external use only.',
    ingredients: [
      'Local pasture-raised tallow',
      'Shea butter',
      'Comfrey-infused olive oil',
      'Jojoba oil',
      'Frankincense essential oil',
    ],
    notice:
      'For external use only. Do not use on puncture wounds or bones not professionally set.',
    checkoutUrl: '',
    labelArt: {
      cream: 'cowboy-cream-cream.png',
      dark: 'cowboy-cream-dark.png',
    },
  },
  {
    id: 'not-your-mamas-whipped-tallow',
    name: "Not Your Mama's Whipped Tallow",
    price: 20,
    // Size not confirmed yet — leave empty rather than guessing.
    size: '',
    summary: 'A light whipped moisturizer that leaves skin soft and nourished.',
    description:
      "A light whipped moisturizer made from rendered local pasture-raised tallow blended with nourishing oils and herbs. It leaves skin soft, moisturized, and nourished.",
    howToUse:
      'Smooth a small amount over skin as often as you like. For external use only.',
    ingredients: [
      'Local pasture-raised tallow',
      'Jojoba oil',
      'Rosemary',
      'Goldenrod',
      "Lamb's ear",
      'Lemon essential oil',
      'Vitamin E',
    ],
    notice: 'For external use only.',
    checkoutUrl: '',
    labelArt: null,
  },
  {
    id: 'raemas-fire-cider',
    name: "RaeMa's Fire Cider",
    price: 25,
    size: '8 oz',
    summary:
      'A handcrafted apple cider vinegar herbal infusion, made the traditional way.',
    description:
      'A handcrafted apple cider vinegar herbal infusion inspired by traditional fire cider recipes. Enjoy it as part of a daily wellness routine, or use it in marinades, dressings, and recipes.',
    howToUse:
      'Shake well before use. Enjoy as part of a daily wellness routine, or use it in marinades, dressings, and recipes.',
    ingredients: [
      'Apple cider vinegar',
      'Onion',
      'Jalapeño',
      'Serrano pepper',
      'Turmeric',
      'Garlic',
      'Ginger',
      'Horseradish',
      'Sage',
      'Rosemary',
      'Thyme',
      'Lemon',
      'Cranberries',
    ],
    notice: 'Shake well before use.',
    checkoutUrl: '',
    labelArt: {
      cream: 'fire-cider-cream.png',
      dark: 'fire-cider-dark.png',
    },
  },
  {
    id: 'mullein-tincture',
    name: 'Mullein Tincture',
    price: 10,
    size: '4 oz',
    summary: 'A handcrafted mullein tincture made using traditional methods.',
    description:
      'A handcrafted mullein tincture made using traditional herbal methods. Many people choose mullein as part of their wellness routine.',
    // TODO (Rachael): no directions were given for the tincture, and none were
    // invented. Add your wording here and the "How to Use" section appears.
    howToUse: '',
    ingredients: ['Mullein', 'Alcohol'],
    notice:
      'Consult your healthcare provider before using herbal products if pregnant, nursing, taking medications, or under medical care.',
    checkoutUrl: '',
    labelArt: {
      cream: 'mullein-tincture-cream.png',
      dark: 'mullein-tincture-dark.png',
    },
  },
]

export function getProduct(id) {
  return products.find((product) => product.id === id)
}

export function formatPrice(price) {
  return `$${price.toFixed(2)}`
}
