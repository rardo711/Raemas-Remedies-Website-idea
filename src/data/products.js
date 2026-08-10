/**
 * The single source of truth for everything on the site's product pages.
 *
 * EDITING RULES — please keep these, they are not stylistic preferences:
 *
 *  1. Product copy is transcribed verbatim from Rachael's printed flyer —
 *     descriptions, ingredient lists (order included), and the "Made with"
 *     vs "Ingredients" label each product uses. Don't paraphrase her; if
 *     the flyer changes, retranscribe it.
 *  2. Never invent ingredients, benefits, reviews, ratings, or claims.
 *     Ingredient lists render exactly as written here, as one plain
 *     comma-separated line inside the description — no per-ingredient
 *     benefit breakdowns.
 *  3. If you don't know a value, leave it as an empty string. The UI is
 *     built to hide empty fields. Do not guess.
 *
 * TODO (Rachael): the flyer's Fire Cider ingredient list doesn't mention
 * ginger, but the printed bottle label does. The site follows the flyer for
 * now — say the word and we'll add ginger back.
 *
 * FIELDS
 *  id          slug used in the URL (#/product/<id>) and as the folder name
 *              for photography at src/assets/products/<id>/
 *  price       number, USD. Rendered by formatPrice().
 *  size        e.g. "4 oz". Empty string hides the size entirely.
 *  summary     one line, used on cards. The flyer's opening sentence.
 *  description the flyer copy for the Description accordion.
 *  ingredientsLabel  the heading her flyer uses for the list — she writes
 *              "Made with" on the tallow products and "Ingredients" on the
 *              tincture and fire cider.
 *  howToUse    Description accordion's sibling; hidden when empty.
 *  ingredients plain array of strings in the flyer's order, rendered
 *              comma-separated in the Description section.
 *  notice      shown prominently on the detail page in a ruled callout.
 *  checkoutUrl EMPTY until a Stripe Payment Link exists. When you paste a
 *              link in, that product's button flips from
 *              "Set one aside for me" to "Buy now" on its own.
 *  labelArt    filenames in public/assets/brand/labels/. null when the
 *              product has no label artwork yet.
 */

export const products = [
  {
    id: 'cowboy-cream',
    name: 'Cowboy Cream',
    price: 25,
    size: '4 oz',
    summary:
      'A rich, handcrafted tallow cream made with nourishing ingredients to deeply moisturize and leave skin feeling soft and cared for.',
    description:
      'A rich, handcrafted tallow cream made with nourishing ingredients to deeply moisturize and leave skin feeling soft and cared for.',
    howToUse:
      'Massage a small amount into the area you need it. For external use only.',
    ingredientsLabel: 'Made with',
    ingredients: [
      'Grass-fed tallow',
      'Shea butter',
      'Comfrey-infused olive oil',
      'Jojoba oil',
      'Frankincense essential oil',
    ],
    notice:
      'For external use only. Do not use on puncture wounds or bones not professionally set.',
    checkoutUrl: '',
    labelArt: {
      // No cream scan yet — add the file and name it here.
      cream: null,
      dark: 'cowboy-cream-dark.png',
    },
  },
  {
    id: 'not-your-mamas-whipped-tallow',
    name: "Not Your Mama's Whipped Tallow",
    price: 20,
    // Size not confirmed yet — leave empty rather than guessing.
    size: '',
    summary:
      'A light, whipped moisturizer made from rendered beef tallow blended with nourishing oils and herbs.',
    description:
      'A light, whipped moisturizer made from rendered beef tallow blended with nourishing oils and herbs. Leaves skin feeling soft, moisturized, and nourished.',
    howToUse:
      'Smooth a small amount over skin as often as you like. For external use only.',
    ingredientsLabel: 'Made with',
    ingredients: [
      'Grass-fed tallow',
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
      'A handcrafted apple cider vinegar herbal infusion inspired by traditional fire cider recipes.',
    description:
      'A handcrafted apple cider vinegar herbal infusion inspired by traditional fire cider recipes. Enjoy as part of your daily wellness routine or use in marinades, dressings and recipes.',
    howToUse:
      'Shake well before use. Enjoy as part of your daily wellness routine or use in marinades, dressings and recipes.',
    ingredientsLabel: 'Ingredients',
    ingredients: [
      'Apple cider vinegar',
      'Onion',
      'Serrano pepper',
      'Jalapeño',
      'Horseradish',
      'Turmeric',
      'Garlic',
      'Lemon',
      'Cranberries',
      'Sage',
      'Thyme',
      'Rosemary',
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
    summary: 'A handcrafted mullein tincture made using traditional herbal methods.',
    description:
      'A handcrafted mullein tincture made using traditional herbal methods. Many people choose mullein as part of their wellness routine.',
    // TODO (Rachael): no directions were given for the tincture, and none were
    // invented. Add your wording here and the "How to Use" section appears.
    howToUse: '',
    ingredientsLabel: 'Ingredients',
    ingredients: ['Mullein', 'Alcohol'],
    notice:
      'Consult your healthcare provider before using herbal products if pregnant, nursing, taking medications, or under medical care.',
    checkoutUrl: '',
    // No label scans yet. Add them to public/assets/brand/labels/ and set
    // this to { cream: '…', dark: '…' } to light up the dark section.
    labelArt: null,
  },
]

export function getProduct(id) {
  return products.find((product) => product.id === id)
}

export function formatPrice(price) {
  return `$${price.toFixed(2)}`
}
