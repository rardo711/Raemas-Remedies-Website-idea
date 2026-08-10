/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Pulled from the printed labels and flyer.
        cream: '#F5F0E6',
        espresso: '#211C16',
        tan: '#D9C7A9',
        sage: '#8A9B7C',
        // A half-step lighter than cream, for card faces that need to lift
        // off the page without introducing a second hue.
        parchment: '#FBF8F1',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        motto: '0.28em',
        eyebrow: '0.2em',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}
