# Brand artwork — drop the real files here

Product photography is now in place. **The emblem and the label scans are still
missing.** The site is already wired to the exact paths below: add a file and it
appears on the next build, with no code change. Until then each slot falls back
to a plain typographic stand-in, so nothing ever renders as a broken image.

Do not replace these with stock photography or hotlinked images.

## Required — still missing

| File | Used for |
| --- | --- |
| `logo-main.png` | The circular engraved emblem. Header, footer, hero, Meet RaeMa. Transparent PNG, at least 400×400. |
| `favicon.png` | A square crop of just the emblem from `logo-main.png`, 180×180. Referenced from `index.html`. |

The emblem appears on the lid in the Cowboy Cream photo, but that is a sunlit
shot of a curved lid — it is not usable as the site's identity mark. A clean
export of the original artwork is what's needed.

## Label artwork — still missing

Goes in `labels/`. Filenames are read from the `labelArt` field in
`src/data/products.js` — rename there if yours differ.

Now that real photography exists, these are used only for the dark section on
each product detail page. Cards and galleries use the photos.

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

These live under `src/assets/`, not here, so Vite can compress and hash them.

**Product photos — done.** One shot per product is in place:

```
src/assets/products/cowboy-cream/01-jar.webp
src/assets/products/not-your-mamas-whipped-tallow/01-jar.webp
src/assets/products/raemas-fire-cider/01-bottle.webp
src/assets/products/mullein-tincture/01-bottle.webp
```

To add more angles, drop extra files into the same folder. `.jpg`, `.jpeg`,
`.png`, and `.webp` all work. They sort by filename, so prefix with `01-`,
`02-` to control gallery order, and a thumbnail strip appears automatically
once a product has more than one. The folder name must match the product `id`
in `src/data/products.js`.

Frames are 3:4 portrait to match how these were shot. Anything squarer or wider
will be centre-cropped to fit — see `PRODUCT_ASPECT` in
`src/components/ProductImage.jsx` if that ever needs changing.

Keep files under roughly 300 KB. The originals here were 1.4–2.6 MB straight
off the phone and were resized to 1400px on the long edge and converted to
WebP, which held quality at around 120–200 KB each.

**Still missing:** `src/assets/brand/raema-family.jpg` — the family photo on
Meet RaeMa. The page runs full width until this exists.
