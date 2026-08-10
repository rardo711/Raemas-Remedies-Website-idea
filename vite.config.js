import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// GitHub Pages project sites are served from https://<user>.github.io/<repo>/,
// so every asset URL needs the repo name in front of it. The deploy workflow
// sets BASE_PATH from the repo name automatically; the fallback below keeps
// `npm run build` correct when you run it by hand.
//
// Moving to a custom domain or a <user>.github.io repo? Set BASE_PATH=/ .
const base = process.env.BASE_PATH ?? '/Raemas-Remedies-Website-idea/'

export default defineConfig({
  base,
  plugins: [
    react(),
    // Customers arrive on whatever phone they own, and a browser too old to
    // parse the modern bundle does not fail loudly — the script is skipped and
    // the page sits on the fallback in index.html. Vite's default target
    // assumes Safari 14 and Chrome 87, which leaves out iPhones on iOS 13 or
    // older and Androids on an outdated WebView.
    //
    // This emits a second, older build alongside the modern one. New phones
    // load the modern bundle exactly as before; only old ones fetch the
    // heavier legacy pair, so nobody pays for someone else's phone.
    legacy({
      targets: ['iOS >= 12', 'Android >= 6', 'Safari >= 12', 'Chrome >= 61', 'Firefox >= 60'],
    }),
  ],
})
