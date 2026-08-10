import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { formatPrice, products } from '../data/products'
import { site, stockist } from '../data/site'
import { usePageTitle } from '../components/Layout'
import { HeartAndArrow, SeedDivider } from '../components/Ornaments'

const emptyQuantities = Object.fromEntries(products.map((p) => [p.id, 0]))

function QuantityStepper({ product, quantity, onChange }) {
  const inputId = `qty-${product.id}`

  return (
    <div className="flex items-center gap-1">
      <label htmlFor={inputId} className="sr-only">
        Quantity of {product.name}
      </label>

      <button
        type="button"
        onClick={() => onChange(Math.max(0, quantity - 1))}
        disabled={quantity === 0}
        aria-label={`Remove one ${product.name}`}
        className="flex h-9 w-9 items-center justify-center border border-espresso/30 text-lg leading-none transition-colors enabled:hover:border-espresso enabled:hover:bg-espresso/5 disabled:opacity-30"
      >
        <span aria-hidden="true">&minus;</span>
      </button>

      <input
        id={inputId}
        type="number"
        inputMode="numeric"
        min="0"
        max="99"
        value={quantity}
        onChange={(event) => {
          const next = Number.parseInt(event.target.value, 10)
          onChange(Number.isNaN(next) ? 0 : Math.min(99, Math.max(0, next)))
        }}
        className="h-9 w-12 border border-espresso/30 bg-parchment text-center font-sans text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

      <button
        type="button"
        onClick={() => onChange(Math.min(99, quantity + 1))}
        disabled={quantity >= 99}
        aria-label={`Add one ${product.name}`}
        className="flex h-9 w-9 items-center justify-center border border-espresso/30 text-lg leading-none transition-colors enabled:hover:border-espresso enabled:hover:bg-espresso/5 disabled:opacity-30"
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  )
}

export function Order() {
  usePageTitle('Order & Contact')

  const [searchParams] = useSearchParams()
  const [quantities, setQuantities] = useState(emptyQuantities)
  const [fulfilment, setFulfilment] = useState('pickup')
  const [submitted, setSubmitted] = useState(null)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const successRef = useRef(null)

  // Arriving from a "Set one aside for me" button pre-selects that product.
  useEffect(() => {
    const requested = searchParams.get('product')
    if (requested && requested in emptyQuantities) {
      setQuantities((current) => ({
        ...current,
        [requested]: current[requested] || 1,
      }))
    }
  }, [searchParams])

  const selected = useMemo(
    () => products.filter((product) => quantities[product.id] > 0),
    [quantities],
  )

  const total = useMemo(
    () =>
      selected.reduce(
        (sum, product) => sum + product.price * quantities[product.id],
        0,
      ),
    [selected, quantities],
  )

  // Move focus to the confirmation so it's announced, not just painted.
  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  function setQuantity(id, value) {
    setQuantities((current) => ({ ...current, [id]: value }))
    setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (selected.length === 0) {
      setError('Please choose at least one remedy before sending.')
      return
    }

    const form = new FormData(event.currentTarget)

    // Honeypot: bots fill hidden fields, people don't.
    if (form.get('_gotcha')) return

    // The basket lives in React state, not in named inputs, so fold it into
    // the payload here — otherwise Formspree would receive contact details
    // with no order attached.
    form.set(
      'order',
      selected
        .map(
          (product) =>
            `${quantities[product.id]} × ${product.name} — ${formatPrice(
              product.price * quantities[product.id],
            )}`,
        )
        .join('\n'),
    )
    form.set('order_total', formatPrice(total))
    form.set('_subject', `New order from ${form.get('name')}`)

    const order = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      fulfilment: fulfilment === 'pickup' ? 'Local pickup' : 'Shipping',
      notes: form.get('notes'),
      items: selected.map((product) => ({
        name: product.name,
        quantity: quantities[product.id],
        lineTotal: product.price * quantities[product.id],
      })),
      total,
    }

    // TODO (Formspree): set `formspreeEndpoint` in src/data/site.js and this
    // posts the order for real. Until then the form is purely client-side —
    // it confirms on screen and sends nothing anywhere.
    if (site.formspreeEndpoint) {
      setSending(true)
      try {
        const response = await fetch(site.formspreeEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: form,
        })
        if (!response.ok) throw new Error('Request failed')
      } catch {
        setSending(false)
        setError(
          'Something went wrong sending that. Please try again in a moment.',
        )
        return
      }
      setSending(false)
    }

    setSubmitted(order)
  }

  function startOver() {
    setQuantities(emptyQuantities)
    setFulfilment('pickup')
    setSubmitted(null)
    setError('')
  }

  return (
    <>
      <section className="grain bg-[radial-gradient(ellipse_at_50%_-10%,#F6F4E9_0%,#EDEBDC_70%)]">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
          <p className="eyebrow">Local pickup or shipping</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Place an Order
          </h1>
          <p className="mx-auto mt-5 max-w-prose leading-relaxed text-espresso/75">
            Tell RaeMa what you&rsquo;d like and she&rsquo;ll get back to you to
            sort out payment and pickup.
          </p>
          <SeedDivider className="mt-7 text-sage" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6">
        {submitted ? (
          <div
            ref={successRef}
            tabIndex={-1}
            className="double-rule grain bg-parchment px-6 py-12 text-center sm:px-10"
          >
            <HeartAndArrow className="mx-auto text-sage" />
            <h2 className="mt-5 font-serif text-3xl">Thank you kindly</h2>
            <p className="mx-auto mt-4 max-w-prose leading-relaxed text-espresso/75">
              Your note is on its way, {submitted.name}. RaeMa will be in touch
              at {submitted.email} to finish things up.
            </p>

            <ul className="mx-auto mt-8 max-w-sm space-y-2 border-t border-espresso/15 pt-6 text-left text-sm">
              {submitted.items.map((item) => (
                <li key={item.name} className="flex justify-between gap-4">
                  <span>
                    {item.name}{' '}
                    <span className="text-espresso/70">
                      &times;{item.quantity}
                    </span>
                  </span>
                  <span className="tabular-nums">
                    {formatPrice(item.lineTotal)}
                  </span>
                </li>
              ))}
              <li className="flex justify-between gap-4 border-t border-espresso/15 pt-2 font-serif text-base">
                <span>{submitted.fulfilment}</span>
                <span className="tabular-nums">
                  {formatPrice(submitted.total)}
                </span>
              </li>
            </ul>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={startOver}
                className="btn-secondary"
              >
                Send another
              </button>
              <Link to="/" className="btn-primary">
                Back home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* ── Remedies ─────────────────────────────────────────── */}
            <fieldset className="double-rule grain bg-parchment px-5 py-6 sm:px-7">
              <legend className="eyebrow px-2">Choose your remedies</legend>

              <ul className="mt-2 divide-y divide-espresso/10">
                {products.map((product) => {
                  const quantity = quantities[product.id]
                  const checkboxId = `pick-${product.id}`

                  return (
                    <li
                      key={product.id}
                      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-4"
                    >
                      {/* min-w forces the stepper onto its own line on narrow
                          phones rather than squeezing long names to three. */}
                      <div className="flex min-w-[13rem] flex-1 items-start gap-3">
                        <input
                          id={checkboxId}
                          type="checkbox"
                          checked={quantity > 0}
                          onChange={(event) =>
                            setQuantity(product.id, event.target.checked ? 1 : 0)
                          }
                          className="mt-1 h-4 w-4 shrink-0 accent-sage"
                        />
                        <label
                          htmlFor={checkboxId}
                          className="min-w-0 cursor-pointer"
                        >
                          <span className="block font-serif text-lg leading-snug">
                            {product.name}
                          </span>
                          <span className="block text-sm text-espresso/70">
                            {formatPrice(product.price)}
                            {product.size ? ` · ${product.size}` : ''}
                          </span>
                        </label>
                      </div>

                      <QuantityStepper
                        product={product}
                        quantity={quantity}
                        onChange={(value) => setQuantity(product.id, value)}
                      />
                    </li>
                  )
                })}
              </ul>

              {/* Live total, announced politely as it changes. */}
              <div
                aria-live="polite"
                className="mt-5 flex items-baseline justify-between border-t border-espresso/20 pt-5"
              >
                <span className="eyebrow">Product total</span>
                <span className="font-serif text-2xl tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="handnote mt-3 origin-left text-sm">
                Shipping isn&rsquo;t included in this total &mdash; RaeMa will
                confirm everything with you before any payment.
              </p>
            </fieldset>

            {/* ── Pickup or shipping ───────────────────────────────── */}
            <fieldset className="double-rule mt-6 bg-parchment px-5 py-6 sm:px-7">
              <legend className="eyebrow px-2">How would you like it?</legend>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    value: 'pickup',
                    title: 'Local pickup',
                    detail: `Around ${site.location}, or at ${stockist.name} in ${stockist.city}.`,
                  },
                  {
                    value: 'shipping',
                    title: 'Shipping',
                    detail: 'RaeMa will follow up about getting it to you.',
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${
                      fulfilment === option.value
                        ? 'border-espresso bg-sage/10'
                        : 'border-espresso/25 hover:border-espresso/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfilment"
                      value={option.value}
                      checked={fulfilment === option.value}
                      onChange={() => setFulfilment(option.value)}
                      className="mt-1 h-4 w-4 shrink-0 accent-sage"
                    />
                    <span>
                      <span className="block font-serif text-lg leading-snug">
                        {option.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-espresso/65">
                        {option.detail}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* ── Details ──────────────────────────────────────────── */}
            <fieldset className="double-rule mt-6 bg-parchment px-5 py-6 sm:px-7">
              <legend className="eyebrow px-2">Your details</legend>

              <div className="mt-3 grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Name" required />
                <Field id="email" label="Email" type="email" required />
                <Field
                  id="phone"
                  label="Phone"
                  type="tel"
                  hint="Optional"
                  className="sm:col-span-2"
                />

                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="eyebrow block">
                    Notes
                  </label>
                  <p className="mt-1 text-xs text-espresso/70">
                    Anything RaeMa should know — timing, questions, or a
                    different pickup spot.
                  </p>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    className="mt-2 w-full border border-espresso/25 bg-cream px-3 py-2 leading-relaxed transition-colors focus:border-espresso"
                  />
                </div>
              </div>

              {/* Honeypot — hidden from people, tempting to bots. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_gotcha">Leave this field empty</label>
                <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
              </div>
            </fieldset>

            {error ? (
              <p
                role="alert"
                className="mt-5 border-l-2 border-espresso bg-espresso/5 px-4 py-3 text-sm"
              >
                {error}
              </p>
            ) : null}

            <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="text-sm text-espresso/70">
                {selected.length === 0
                  ? 'Nothing selected yet'
                  : `${selected.length} ${
                      selected.length === 1 ? 'remedy' : 'remedies'
                    } · ${formatPrice(total)}`}
              </p>

              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full sm:w-auto"
              >
                {sending ? 'Sending…' : 'Send my order'}
              </button>
            </div>
          </form>
        )}
      </section>
    </>
  )
}

function Field({ id, label, type = 'text', required = false, hint, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow block">
        {label}
        {hint ? (
          <span className="ml-2 normal-case tracking-normal text-espresso/70">
            {hint}
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={
          { name: 'name', email: 'email', phone: 'tel' }[id] ?? 'on'
        }
        className="mt-2 w-full border border-espresso/25 bg-cream px-3 py-2 transition-colors focus:border-espresso"
      />
    </div>
  )
}
