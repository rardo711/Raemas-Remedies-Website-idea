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
        <span className="font-serif text-xl">{title}</span>
        <span
          className="relative h-3 w-3 shrink-0 text-espresso/60"
          aria-hidden="true"
        >
          {/* Plus that loses its vertical stroke when open. */}
          <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-opacity duration-200 group-open:opacity-0" />
        </span>
      </summary>
      <div className="pb-5 pr-2 text-espresso/80">{children}</div>
    </details>
  )
}
