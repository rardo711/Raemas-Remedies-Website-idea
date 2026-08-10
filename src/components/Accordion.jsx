/**
 * Built on <details>/<summary> so keyboard behaviour, screen-reader
 * announcement, and in-page find all work without any JavaScript of our own.
 */
export function Accordion({ title, children, defaultOpen = false }) {
  return (
    <details
      className="group border-b border-espresso/15 [&_summary::-webkit-details-marker]:hidden"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 transition-colors hover:text-espresso/70">
        <span className="font-serif text-lg sm:text-xl">{title}</span>
        {/* A plus drawn with a pen rather than set with rectangles: both
            strokes bow a little and they don't cross dead-centre. The
            vertical stroke fades when open, leaving the dash. */}
        <svg
          viewBox="0 0 14 14"
          className="h-3.5 w-3.5 shrink-0 text-espresso/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M1.2 7.3C5 6.8 9 7.1 12.8 6.9" />
          <path
            d="M7.2 1.2C6.8 5 7.1 9 6.9 12.8"
            className="transition-opacity duration-200 group-open:opacity-0"
          />
        </svg>
      </summary>
      <div className="pb-5 pr-2 text-espresso/80">{children}</div>
    </details>
  )
}
