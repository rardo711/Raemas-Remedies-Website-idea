/**
 * Fine-line ornaments drawn in SVG to echo the engraved detailing on the
 * labels. Everything strokes `currentColor` at hairline weight, so a section
 * only has to set a text colour for these to sit correctly on it.
 *
 * None of these are symmetrical, and that is the point. A divider whose left
 * half is a perfect mirror of its right half is a shape a program made; the
 * engraving on her labels has one leaf fatter than the other and a dot that
 * sits a little too far out. The asymmetries below are hand-placed and fixed
 * — they are the same on every render, they just aren't tidy.
 *
 * These are decorative: each one is aria-hidden and none carries meaning that
 * isn't already in the surrounding text.
 */

/**
 * A ruled line that wasn't drawn against a straight edge. Stretches to any
 * width; the stroke stays hairline because it isn't scaled with the box.
 */
export function InkRule({ className = '' }) {
  return (
    <svg
      viewBox="0 0 600 6"
      preserveAspectRatio="none"
      className={`h-1.5 w-full ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
    >
      <path
        d="M0 3.1C64 2.4 128 3.6 196 2.9C268 2.2 320 3.9 388 3.2C452 2.6 512 2.1 600 2.8"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

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
        {/* Tapering rules either side of the sprig. The right-hand one starts
            two units late and rides a hair high — the sprig is not centred on
            the line, it was placed on it. */}
        <path d="M0 14.4C40 13.9 78 14.5 112 14.1" opacity="0.3" />
        <path d="M210 13.7C248 14.2 286 13.6 320 14.2" opacity="0.3" />

        <g transform="translate(159 14)" opacity="0.7">
          {/* Leaves. The left one is a touch longer and sits a touch lower. */}
          <path d="M-41 0.6C-31.5 -8 -17 -8.4 -8 0.4C-17.5 8.6 -31 8.2 -41 0.6Z" />
          <path d="M-38.5 0.5H-10.5" opacity="0.5" />
          <path d="M39 -0.4C30.5 -7.8 17 -7.6 8 -0.2C16.5 7.4 30 7.6 39 -0.4Z" />
          <path d="M37 -0.3H10" opacity="0.5" />

          {/* Centre lozenge, slightly off-square, and two seed dots that
              aren't the same distance out. */}
          <path d="M0.3 -6.2L4.6 0.1L-0.2 6L-4.4 -0.2Z" />
          <circle cx="-47" cy="0.4" r="1.5" />
          <circle cx="45.5" cy="-0.2" r="1.4" />
        </g>
      </svg>
    </div>
  )
}

/**
 * A quieter section mark for pages that shouldn't repeat the botanical
 * divider: a short rule that stops early, then three seeds scattered after
 * it, none the same size and none on the same line. Two different marks
 * across the site reads like two moments of the same hand; one identical
 * mark everywhere reads like a stamp.
 */
export function SeedDivider({ className = '' }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 12"
        className="h-3 w-40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <path d="M8 6.3C30 5.5 58 6.4 86 5.8" opacity="0.4" />
        <circle cx="104" cy="5.9" r="1.6" fill="currentColor" stroke="none" opacity="0.55" />
        <circle cx="122" cy="6.8" r="1.1" fill="currentColor" stroke="none" opacity="0.45" />
        <circle cx="143" cy="5.4" r="1.4" fill="currentColor" stroke="none" opacity="0.5" />
      </svg>
    </div>
  )
}

/**
 * A pen squaring off a corner: two short strokes that meet and slightly
 * overshoot, the way a drawn frame's corners overshoot. Position it
 * absolutely inside a `relative` plate; flip with rotate utilities for the
 * opposite corner. Reserved for the couple of "framed certificate" moments
 * — on every card it would become a stamp.
 */
export function CornerTick({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-6 w-6 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 21.5C2.2 14 2.6 8.5 3.1 2.8" />
      <path d="M2.8 3.1C9 2.4 15 2.7 21.5 2.5" />
    </svg>
  )
}

/**
 * The hero's "there's more below" arrow — drawn with the same nib as
 * HeartAndArrow, shaft not quite plumb. Static on purpose: a bouncing
 * chevron is the effect everyone ships; an arrow inked at the foot of the
 * page is an invitation.
 */
export function ScrollCue({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 34"
      className={`h-8 w-6 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12.6 2C11.8 9 12.5 16 11.9 27.5" />
      <path d="M6.8 22.6C8.6 24.8 10.4 26.9 11.9 28.6C13.6 26.6 15.4 24.4 17.4 22.2" />
    </svg>
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
      {/* Shaft, fletching, head — the two halves of the shaft don't quite
          agree on where the line is. */}
      <line x1="4" y1="10.2" x2="22" y2="9.8" opacity="0.7" />
      <line x1="42" y1="10.1" x2="58" y2="9.7" opacity="0.7" />
      <path d="M4 6L8 10.2L4 14" opacity="0.7" />
      <path d="M58 9.8L53 6.9M58 9.8L53 12.9" opacity="0.7" />

      {/* One lobe of the heart is fuller than the other. */}
      <path d="M32 16.2C26 11 21.8 8.5 21.8 5.7C21.8 3.6 23.6 1.9 25.7 1.9C27.6 1.9 29.1 3 32 6.1C35.1 3.1 36.5 2.1 38.3 2.1C40.4 2.1 42.1 3.8 42.1 5.9C42.1 8.6 38.2 11.1 32 16.2Z" />
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
      <path d="M2 14C2 7 6 3 14 2C13.2 10 9 14.2 2 14Z" />
      <path d="M2.4 13.8C5.2 10.8 8.1 8.4 12 5.9" opacity="0.5" />
    </svg>
  )
}

/**
 * A sprig of the laurel from the emblem, for the corners of quiet sections.
 * Mirror it with `-scale-x-100` where a matching pair is wanted — the shape
 * itself is uneven enough that a mirrored copy still doesn't read as a copy.
 */
export function Sprig({ className = '' }) {
  return (
    <svg
      viewBox="0 0 40 96"
      className={`h-24 w-10 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
    >
      {/* Stem */}
      <path d="M20 94C18.5 74 18 52 21 30C22.4 19.6 24 11 26 4" />
      {/* Leaf pairs, none of them level with each other */}
      <path d="M19.4 82C13 79.4 9.6 74.2 9 68.4C15.4 69.2 19 73.6 19.4 82Z" />
      <path d="M19.8 78.6C25.4 74.8 27.6 69 27 63.6C21.6 66.6 19.2 71.2 19.8 78.6Z" />
      <path d="M19.2 66.4C13.4 63.2 10.6 57.8 10.8 52.4C16.6 54.4 19.4 58.8 19.2 66.4Z" />
      <path d="M20.6 60.4C26.4 57.2 29 51.4 28.4 46C22.8 48.4 20 52.8 20.6 60.4Z" />
      <path d="M20.8 48.2C15.6 44.4 13.6 38.6 14.4 33.4C19.6 36.2 21.6 40.8 20.8 48.2Z" />
      <path d="M22.6 42.6C28 38.4 29.6 32.4 28.4 27.4C23.4 30.6 21.6 35.4 22.6 42.6Z" />
      <path d="M23.4 30.2C19 25.8 17.8 19.8 19.4 15C23.8 18.4 25 23.2 23.4 30.2Z" />
    </svg>
  )
}
