/**
 * Fine-line ornaments drawn in SVG to echo the engraved detailing on the
 * labels. Everything strokes `currentColor` at hairline weight, so a section
 * only has to set a text colour for these to sit correctly on it.
 *
 * These are decorative: each one is aria-hidden and none carries meaning that
 * isn't already in the surrounding text.
 */

export function BotanicalDivider({ className = '', width = 'w-full' }) {
  return (
    <div
      className={`flex items-center justify-center ${width} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 28"
        className="h-7 w-full max-w-[20rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {/* Tapering rules either side of the sprig */}
        <line x1="0" y1="14" x2="112" y2="14" opacity="0.3" />
        <line x1="208" y1="14" x2="320" y2="14" opacity="0.3" />

        <g transform="translate(160 14)" opacity="0.7">
          {/* Mirrored leaves */}
          <path d="M-40 0C-31 -8 -17 -8 -8 0C-17 8 -31 8 -40 0Z" />
          <path d="M-38 0H-10" opacity="0.5" />
          <path d="M40 0C31 -8 17 -8 8 0C17 8 31 8 40 0Z" />
          <path d="M38 0H10" opacity="0.5" />

          {/* Centre lozenge and seed dots */}
          <path d="M0 -6L4.5 0L0 6L-4.5 0Z" />
          <circle cx="-46" cy="0" r="1.5" />
          <circle cx="46" cy="0" r="1.5" />
        </g>
      </svg>
    </div>
  )
}

/**
 * The small heart-and-arrow mark from the labels. Used as a section break and
 * as a full stop at the end of the footer.
 */
export function HeartAndArrow({ className = '' }) {
  return (
    <svg
      viewBox="0 0 64 20"
      className={`h-4 w-16 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Shaft, fletching, head */}
      <line x1="4" y1="10" x2="22" y2="10" opacity="0.7" />
      <line x1="42" y1="10" x2="58" y2="10" opacity="0.7" />
      <path d="M4 6L8 10L4 14" opacity="0.7" />
      <path d="M58 10L53 7M58 10L53 13" opacity="0.7" />

      <path d="M32 16C26 11 22 8.5 22 5.8C22 3.7 23.7 2 25.8 2C27.6 2 29 3 32 6C35 3 36.4 2 38.2 2C40.3 2 42 3.7 42 5.8C42 8.5 38 11 32 16Z" />
    </svg>
  )
}

/** A single leaf, used as a list bullet in ingredient lists. */
export function LeafBullet({ className = '' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3 w-3 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M2 14C2 7 6 3 14 2C13 10 9 14 2 14Z" />
      <path d="M2 14C5 11 8 8.5 12 6" opacity="0.5" />
    </svg>
  )
}
