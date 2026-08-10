import { useState } from 'react'
import { brandAsset } from '../lib/assets'
import { site } from '../data/site'

/**
 * The circular engraved emblem — the site's identity mark.
 *
 * The real artwork is logo-main.png. Until that file is added to
 * public/assets/brand/, this renders a plain typographic stand-in inside the
 * same circular footprint, so layout never shifts when the art lands and no
 * broken-image icon is ever shown. The stand-in deliberately makes no attempt
 * to imitate the engraving.
 */
export function BrandMark({ size = 96, className = '', tone = 'light' }) {
  const [failed, setFailed] = useState(false)
  const onDark = tone === 'dark'

  if (failed) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-full border text-center ${
          onDark
            ? 'border-cream/40 text-cream'
            : 'border-espresso/30 text-espresso'
        } ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="px-2">
          <span
            className="block font-serif leading-tight"
            style={{ fontSize: Math.max(11, size * 0.16) }}
          >
            RaeMa&rsquo;s
          </span>
          <span
            className="block font-serif leading-tight"
            style={{ fontSize: Math.max(10, size * 0.13) }}
          >
            Remedies
          </span>
        </span>
      </span>
    )
  }

  return (
    <img
      src={onDark ? brandAsset.logoOnDark : brandAsset.logo}
      onError={() => setFailed(true)}
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
      alt={`${site.name} emblem: a grazing cow, mason jar, and mortar and pestle framed by botanical laurels, with the motto ${site.motto}`}
    />
  )
}
