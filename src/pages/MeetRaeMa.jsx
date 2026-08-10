import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { getFamilyPhoto } from '../lib/assets'
import { usePageTitle } from '../components/Layout'
import { BrandMark } from '../components/BrandMark'
import {
  BotanicalDivider,
  HeartAndArrow,
  Sprig,
  TinyHeart,
} from '../components/Ornaments'

export function MeetRaeMa() {
  usePageTitle('Meet RaeMa')

  // Drop a file at src/assets/brand/raema-family.jpg and the portrait appears.
  // While it's missing the story simply runs full width — no empty frame.
  const familyPhoto = getFamilyPhoto()

  return (
    <>
      <section className="grain relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_-10%,#F6F4E9_0%,#EDEBDC_70%)]">
        {/* The same laurel margins as the home hero — right one lower, one
            mirrored, gone below lg where there's no margin for them. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-16 mx-auto hidden max-w-4xl px-6 lg:block"
        >
          <Sprig className="absolute left-6 h-36 w-14 text-espresso/[0.16]" />
          <Sprig className="absolute right-6 top-8 h-36 w-14 -scale-x-100 text-espresso/[0.13]" />
        </div>

        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <BrandMark size={104} className="set-a mx-auto" />
          <p className="eyebrow mt-6">Tattnall County, Georgia</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Meet RaeMa</h1>
          <p className="motto mt-4">{site.motto}</p>
          <BotanicalDivider className="mt-7 text-espresso/50" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div
          className={
            familyPhoto
              ? 'grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14'
              : ''
          }
        >
          {familyPhoto ? (
            /* Framed like a print in the family album: a parchment mat
               inside the ruled frame, the whole thing set down a touch
               crooked, with the caption pencilled underneath rather than
               typeset. */
            <figure className="set-b lg:sticky lg:top-24">
              <div className="double-rule grain bg-parchment p-2 sm:p-3">
                <img
                  src={familyPhoto}
                  alt={`${site.maker} with her family`}
                  className="block h-auto w-full"
                  decoding="async"
                />
              </div>
              <figcaption className="handnote mt-4 text-center">
                {site.maker} and family{' '}
                <TinyHeart className="text-espresso/60" />
              </figcaption>
            </figure>
          ) : null}

          <div className={familyPhoto ? '' : 'mx-auto max-w-prose'}>
            <div className="max-w-prose space-y-5 text-base leading-relaxed text-espresso/85 sm:text-lg">
              <p className="font-serif text-xl italic text-espresso sm:text-2xl">
                Hey y&rsquo;all &mdash; I&rsquo;m Rachael Harrelson, and this is
                my little kitchen operation.
              </p>

              <p>
                I was born and raised right here in Tattnall County, Georgia,
                and I never did find a reason to leave. I&rsquo;m a mother of
                four, and RaeMa to two grandbabies &mdash; which is where the
                name on the jar comes from.
              </p>

              <p>
                For close to twenty years now I&rsquo;ve been making clean,
                natural remedies at home. It started with my own children,
                wanting to know exactly what I was putting on their skin and
                handing them when they weren&rsquo;t feeling their best. These
                days I&rsquo;m making the same things for my grandbabies.
              </p>

              <p>
                Somewhere along the way I had a hard time sourcing ingredients I
                felt good about, so I started growing many of my own organic
                ones instead. It turned out I loved that part just as much.
              </p>

              <p>
                Farming, family, and Jesus &mdash; that&rsquo;s about the whole
                of it. Everything that leaves this kitchen is made the same way
                I&rsquo;d make it for my own.
              </p>
            </div>

            <HeartAndArrow className="mt-9 text-espresso/35" />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/order" className="btn-primary">
                Place an order
              </Link>

              {/*
                TODO: paste the real Facebook page URL into `facebookUrl` in
                src/data/site.js. The button stays hidden until it's set, so no
                dead link ever ships.
              */}
              {site.facebookUrl ? (
                <a
                  href={site.facebookUrl}
                  className="btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on Facebook
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
