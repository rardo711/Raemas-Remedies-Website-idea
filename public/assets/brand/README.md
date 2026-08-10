# Brand artwork — drop the real files here

These files are **not in the repo yet**. The site is already wired to the exact
paths below: add a file and it appears on the next build, with no code change.
Until then each slot falls back to a plain typographic stand-in, so nothing ever
renders as a broken image.

Do not replace these with stock photography or hotlinked images.

## Required

| File | Used for |
| --- | --- |
| `logo-main.png` | The circular engraved emblem. Header, footer, hero, Meet RaeMa. Transparent PNG, at least 400×400. |
| `favicon.png` | A square crop of just the emblem from `logo-main.png`, 180×180. Referenced from `index.html`. |

## Label artwork

Goes in `labels/`. Filenames are read from the `labelArt` field in
`src/data/products.js` — rename there if yours differ.

| File | Product |
| --- | --- |
| `labels/cowboy-cream-cream.png` | Cowboy Cream, cream variant |
| `labels/cowboy-cream-dark.png` | Cowboy Cream, dark variant |
| `labels/fire-cider-cream.png` | RaeMa's Fire Cider, cream variant |
| `labels/fire-cider-dark.png` | RaeMa's Fire Cider, dark variant |
| `labels/mullein-tincture-cream.png` | Mullein Tincture, cream variant |
| `labels/mullein-tincture-dark.png` | Mullein Tincture, dark variant |

The **cream** variants stand in for product photography on the cards and detail
pages until real photos exist. The **dark** variants appear once per detail
page, in the near-black section.

Not Your Mama's Whipped Tallow has no label artwork yet; its card uses the
typographic treatment. Add `labels/whipped-tallow-cream.png` and point
`labelArt` at it in `src/data/products.js` when one exists.

## Photography and the family photo

These live under `src/assets/`, not here, so Vite can compress and hash them:

- `src/assets/products/<product-id>/01-name.jpg` — real product photos. Any
  number per product; they sort by filename, so prefix with `01-`, `02-`.
  The folder name must match the product `id` in `src/data/products.js`.
- `src/assets/brand/raema-family.jpg` — the family photo on Meet RaeMa. The
  page runs full width until this exists.
