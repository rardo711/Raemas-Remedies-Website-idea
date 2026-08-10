/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * Sampled off the printed labels rather than picked in a colour
         * wheel. The ground of the Fire Cider label is a warm oat, not white
         * — the site now sits on that same ground instead of on paper-white,
         * so the label scans stop looking like bright rectangles pasted onto
         * a page.
         */
        cream: '#EFE7D8',
        // A half-step lighter, for card faces that need to lift off the page
        // without introducing a second hue.
        parchment: '#F6F0E4',
        // Deeper still, for bands that need to recede.
        oat: '#E5DAC6',
        espresso: '#211C16',
        tan: '#D9C7A9',
        sage: '#8A9B7C',
        // Sage taken down to where cream text passes contrast on it — the
        // add-to-cart green. Sage itself stays a tint-and-border colour.
        moss: '#5C694D',
      },
      fontFamily: {
        // Lora for headings — sturdy and bookish, the same register as the
        // serif on the reference storefront. Jost for everything else.
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        motto: '0.3em',
        eyebrow: '0.22em',
      },
      maxWidth: {
        prose: '64ch',
      },
      // Rotations small enough to read as a hand setting something down
      // slightly crooked, never as a design decision.
      rotate: {
        0.3: '0.3deg',
        0.5: '0.5deg',
        0.75: '0.75deg',
      },
    },
  },
  plugins: [],
}
