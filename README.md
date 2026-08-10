# RaeMa's Remedies

The website for RaeMa's Remedies — handcrafted tallow skincare and herbal
remedies made in small batches in Tattnall County, Georgia by Rachael
Harrelson.

A static site: Vite + React + Tailwind, no backend and no CMS. Everything that
changes day to day lives in two data files.

---

## Running it locally

```bash
npm install
npm run dev
```

That serves the site at the URL printed in the terminal. Edits appear
immediately.

To check exactly what will be deployed:

```bash
npm run build && npm run preview
```

---

## Editing the products

Everything on the shop pages comes from **`src/data/products.js`** — names,
prices, sizes, descriptions, ingredients, and the required notices. Edit that
file and the cards, detail pages, and order form all follow.

Three rules are worth keeping:

1. **Always write "local pasture-raised tallow".** Never "grass-fed".
2. **Never invent anything** — no ingredients, no benefits, no reviews, no
   ratings, no claims.
3. **Leave unknown fields empty** rather than guessing. The site hides empty
   fields on purpose. `Not Your Mama's Whipped Tallow` has no `size` for
   exactly this reason: add it when it's known.

Brand-level text — the motto, the stockist, the FDA disclaimer, the Facebook
URL — is in **`src/data/site.js`**.

### There is no reviews section

Deliberately. There are no customer reviews yet, so rather than an empty shell
or invented quotes, the section is left out. A commented-out placeholder sits
at the bottom of `src/pages/Home.jsx` for when real, attributable reviews
exist.

---

## Images

Product photography is in place — one shot per product, under
`src/assets/products/<product-id>/`. The rest of the artwork is still missing,
so those slots fall back to typographic stand-ins. Nothing renders as a broken
image, and no stock photography or external image URL is used anywhere.

**`public/assets/brand/README.md` lists every expected filename.** The short
version:

| File | Status |
| --- | --- |
| `src/assets/products/<product-id>/…` | ✅ Done — one photo per product |
| `public/assets/brand/logo-main.png` | ❌ Needed — the emblem, in the header, footer, hero, and Meet RaeMa |
| `public/assets/brand/favicon.png` | ❌ Needed — the browser tab icon, a square crop of the emblem |
| `public/assets/brand/labels/*.png` | ❌ Needed — label artwork in the dark section of each detail page |
| `src/assets/brand/raema-family.jpg` | ❌ Needed — the family photo on Meet RaeMa |

The emblem is the one that matters most: until `logo-main.png` exists, the
header, hero, and footer show a plain typographic circle where the engraved
mark belongs.

To add more photos of a product, drop extra files into its folder. Folders are
named for the product's `id` in `src/data/products.js` (for example
`src/assets/products/cowboy-cream/`), files sort by filename, and a thumbnail
strip appears automatically once a product has more than one. Resize to about
1400px on the long edge first — phone originals are 2–3 MB each, which is far
too heavy to ship.

---

## Turning on payments

Each product in `src/data/products.js` has an empty `checkoutUrl`. While it is
empty, that product's button reads **"Set one aside for me"** and points at the
order form.

Create a [Stripe Payment Link](https://stripe.com/payments/payment-links) for a
product, paste the URL into its `checkoutUrl`, and that button becomes **"Buy
now"** pointing at Stripe. No other change is needed, and products can be
switched over one at a time.

```js
checkoutUrl: 'https://buy.stripe.com/…',
```

---

## Turning on the order form

The order form is client-side only right now: it validates, totals, and shows a
confirmation, but sends nothing anywhere.

To make it deliver email:

1. Create a form at [Formspree](https://formspree.io) and copy its endpoint.
2. Paste it into `formspreeEndpoint` in `src/data/site.js`.

Submissions then post there with the basket, contact details, pickup-or-
shipping choice, and notes. A honeypot field is already in place for spam.

---

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes it to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source →
GitHub Actions**.

The site is served from `https://<user>.github.io/<repo>/`, so the build needs
to know the repo name. The workflow passes it automatically via `BASE_PATH`,
which means renaming the repository does not break the build.

**Moving to a custom domain?** Set `BASE_PATH: /` in the workflow, and add a
`public/CNAME` file containing the domain.

### Why the URLs have a `#` in them

GitHub Pages serves static files with no rewrite rules, so a deep link like
`/product/cowboy-cream` would 404 on refresh. The site uses hash routing —
`#/product/cowboy-cream` — so every link can be shared and reloaded safely.

---

## Notes on the build

- **Fonts are self-hosted** (Playfair Display and Source Sans 3, via
  `@fontsource`), so the site makes no third-party requests at runtime.
- **Accessibility**: skip link, visible keyboard focus throughout, semantic
  landmarks, labelled form controls, alt text on every image, and
  `prefers-reduced-motion` respected.
- **Mobile-first**, verified at 375px.
- The FDA disclaimer renders in the footer, so it appears on every page.
