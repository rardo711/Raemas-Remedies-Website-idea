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

The emblem, three label variants, and one photo per product are all in place.
Remaining slots fall back to typographic stand-ins, so nothing renders as a
broken image, and no stock photography or external image URL is used anywhere.

**`public/assets/brand/README.md` lists every expected filename.** The short
version:

| File | Status |
| --- | --- |
| `public/assets/brand/logo-main.png` + `logo-cream.png` + `favicon.png` | ✅ The emblem, in her ink, in cream for the footer, and as a tab icon |
| `src/assets/products/<product-id>/…` | ✅ One photo per product |
| `public/assets/brand/labels/…` | ◐ Cowboy Cream dark, Fire Cider dark and cream |
| `src/assets/brand/raema-family.jpg` | ❌ Needed — the family photo on Meet RaeMa |

Both the emblem and the labels arrived on solid backgrounds — warm cream and
white respectively — which would have shown as visible boxes against the
site's `#F5F0E6` and against the espresso sections. Both were keyed to
transparency. `public/assets/brand/README.md` explains the method, which
matters if you ever supply replacement artwork.

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

**`deploy.yml` must stay the only workflow that publishes to Pages.** GitHub's
Settings → Pages screen offers to add starter workflows for you — "Deploy
static content to Pages" and "Deploy Jekyll…". Neither runs `npm run build`:
they publish the repository as it sits, which serves the unbuilt `index.html`
and produces a blank page. They also share the `pages` concurrency group with
this workflow, so adding one means whichever finishes last wins the deploy.
Decline the offer.

One-time setup: **Settings → Pages → Build and deployment → Source →
GitHub Actions**.

The site is served from `https://<user>.github.io/<repo>/`, so the build needs
to know the repo name. The workflow passes it automatically via `BASE_PATH`,
which means renaming the repository does not break the build.

**Moving to a custom domain?** Set `BASE_PATH: /` in the workflow, and add a
`public/CNAME` file containing the domain.

### Troubleshooting: the live site is a blank white page

Two causes, both of which end with the repository being served instead of the
built output.

**1. A second workflow won the deploy.** Check the Actions tab: if a run named
"Deploy Jekyll…" or "Deploy static content to Pages" succeeded while "Deploy
to GitHub Pages" shows *cancelled*, that is it — see the warning under
Deploying above. Delete the extra workflow file and re-run `deploy.yml`.

**2. Pages is set to "Deploy from a branch" instead of "GitHub Actions".**

On "Deploy from a branch", GitHub serves the repository itself — so visitors
get the unbuilt `index.html`, whose `<script src="/src/main.jsx">` is raw JSX
that no browser can run. Nothing renders, and the page is white.

The tell is in the Actions tab: a **"pages build and deployment"** run
succeeding while **"Deploy to GitHub Pages"** fails with

> Get Pages site failed. Please verify that the repository has Pages enabled
> and configured to build using GitHub Actions.

The fix is the one-time setup above — **Settings → Pages → Build and
deployment → Source → GitHub Actions** — then re-run "Deploy to GitHub Pages"
from the Actions tab. This setting cannot be changed from inside the workflow;
it has to be set in the repository settings.

If instead the page shows "Loading…" and stops there, the HTML reached the
browser but the JavaScript bundle did not — check the browser console for a
404 and confirm `BASE_PATH` matches the repository name.

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
