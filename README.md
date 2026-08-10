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

1. **Product copy is her flyer, word for word** — descriptions, ingredient
   lists in her order, and whether a product says "Made with" or
   "Ingredients". That includes "Grass-fed tallow", which is how she prints
   it. Don't paraphrase; if the flyer changes, retranscribe.
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
site's `#EDEBDC` and against the espresso sections. Both were keyed to
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

## Look and feel

Two decisions drive everything visual, and both are worth knowing before you
change anything.

**The page is not white.** The ground is `#EDEBDC` — the warm oat of the
Fire Cider label nudged toward sage, so the whole page carries a mild green
cast without any section being "the green one". Card
faces lift half a step to `#F6F4E9` (`parchment`), bands that need to recede
drop to `#E0DEC8` (`oat`), and the ink stays `#211C16` (`espresso`) with
`#8A9B7C` (`sage`) and `#D9C7A9` (`tan`) as the only accents — plus
`#5C694D` (`moss`), sage taken down to where cream text passes contrast,
worn only by the buy button. All six live in
`theme.extend.colors` in `tailwind.config.js`; nothing hard-codes a hex except
the three hero gradients, which are noted where they sit.

**It is meant to look made, not generated.** A page where every rule is
straight, every card is square to the grid, and every fill is a flat hex reads
as software output, which is the wrong impression for a kitchen operation in
Tattnall County. So, deliberately:

- `.grain` and `.grain-light` (`src/index.css`) lay a speckle of ink over
  whatever background an element already has. It is a background-image, not a
  blended overlay — no `mix-blend-mode`, no fixed layer, nothing that repaints
  while an old phone is scrolling.
- `.set-a` through `.set-d` tilt things by fractions of a degree. The angles
  are **fixed and chosen by position**, never random, so the page looks
  identical on every load — it just doesn't look ruled. `ProductCard` takes an
  `index` prop for this; a card rendered without one sits straight, which is
  the right default anywhere a card appears alone.
- The inner hairline of `.double-rule` is inset unevenly (4px one side, 5px the
  other), the way a rule drawn by eye is.
- `InkRule` in `Ornaments.jsx` is a line that wasn't drawn against a straight
  edge. The ornaments in that file are all slightly asymmetric — one leaf
  fatter than its partner, a seed dot further out than the one opposite. That
  is the whole reason they read as engraving rather than clip art.
- `.handnote` is a pencilled aside: serif italic, a degree off axis, used for
  the sort of remark added after the page was already laid out.

Keep these subtle if you extend them. Nothing here should be noticeable on its
own — the tilts are under a degree and the grain is a few percent alpha. The
moment one of them announces itself it stops reading as a hand and starts
reading as an effect.

## Notes on the build

- **Fonts are self-hosted** (Lora and Jost, via `@fontsource`),
  so the site makes no third-party requests at runtime. Both are declared in
  one place — `fontFamily` in `tailwind.config.js` — with the matching
  `@import` lines at the top of `src/index.css`. Swapping either one is those
  two edits and nothing else.
- **Accessibility**: skip link, visible keyboard focus throughout, semantic
  landmarks, labelled form controls, alt text on every image, and
  `prefers-reduced-motion` respected.
- **Mobile-first**, verified at 375px.
- **Old phones are covered.** `@vitejs/plugin-legacy` emits a second ES5 build
  next to the modern one, reaching back to iOS 12 and Android 6. Current
  phones download the modern bundle exactly as before and are unaffected;
  only an old browser fetches the heavier legacy pair. Without it, Vite's
  default target assumes Safari 14 and Chrome 87, and anything older sits on
  the "Loading…" fallback forever, because a browser that cannot parse a
  module script fails silently.
- The FDA disclaimer renders in the footer, so it appears on every page.
