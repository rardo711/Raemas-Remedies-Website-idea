# Brand artwork

The emblem, three label variants, and all four product photos are in place.
What's left is listed under "Still missing" below. The site is wired to the
exact paths here: add a file and it appears on the next build, with no code
change. Missing slots fall back to a typographic stand-in, so nothing ever
renders as a broken image.

Do not replace these with stock photography or hotlinked images.

## The emblem — done

| File | Used for |
| --- | --- |
| `logo-main.png` | Her ink, transparent background. Header, hero, Meet RaeMa. |
| `logo-cream.png` | The same mark recoloured cream, for the espresso footer. |
| `favicon.png` | 180×180 browser-tab icon on a solid cream ground. |

All three are derived from the supplied artwork. The original had a warm cream
background (`#F7EBDD`) that would have shown as a visible box against the
site's `#F5F0E6`, so the background was keyed out by mapping luminance to
alpha — the artwork is monochrome line work, so ink coverage and brightness
are the same measurement. That also clears the counters inside letterforms,
which a flood fill would have left as cream specks on the dark footer.

`logo-cream.png` is the identical alpha channel with the ink recoloured, since
dark ink is invisible on espresso. **If you supply new emblem artwork, all
three files need regenerating together** — not just `logo-main.png`.

## Required — still missing

| File | Used for |
| --- | --- |
| `logo-main.png` | The circular engraved emblem. Header, footer, hero, Meet RaeMa. Transparent PNG, at least 400×400. |
| `favicon.png` | A square crop of just the emblem from `logo-main.png`, 180×180. Referenced from `index.html`. |

Only `raema-family.jpg` is still outstanding — see the photography section.

## Label artwork

Goes in `labels/`. Filenames are read from the `labelArt` field in
`src/data/products.js`, so a file only appears once it is named there.

Now that real photography exists, labels are used only in the near-black
section of each product detail page — the **dark** variant. Cards and galleries
use the photos. The **cream** variants are kept as the fallback for a product
that has no photo yet.

| File | Product | Status |
| --- | --- | --- |
| `labels/cowboy-cream-dark.png` | Cowboy Cream, dark | ✅ |
| `labels/fire-cider-dark.png` | RaeMa's Fire Cider, dark | ✅ |
| `labels/fire-cider-cream.png` | RaeMa's Fire Cider, cream | ✅ |
| `labels/cowboy-cream-cream.png` | Cowboy Cream, cream | ❌ |
| `labels/mullein-tincture-dark.png` | Mullein Tincture, dark | ❌ |
| `labels/mullein-tincture-cream.png` | Mullein Tincture, cream | ❌ |
| `labels/whipped-tallow-*.png` | Not Your Mama's Whipped Tallow | ❌ |

A product with no dark label simply gets a centred text-only dark section —
that is what Mullein Tincture and the whipped tallow do today, and it looks
deliberate rather than broken.

### Preparing a new label scan

The supplied labels came on a solid white field, which would show as a white
box on cream and, worse, on the espresso section. That surround was removed by
flooding inward from the border, stopped by the label's own rounded-rect rule
so the label body stays intact.

Two details matter if you redo this by hand: near-white pixels need to go
**fully** transparent rather than keeping a few percent of alpha, or a pale
halo appears against espresso; and the anti-aliased boundary pixels need
un-premultiplying — recovering the ink colour from the white-blended pixel —
or the edge fringes grey instead of dark.

Easiest path: export with a transparent background from the original design
file and skip all of that.

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
