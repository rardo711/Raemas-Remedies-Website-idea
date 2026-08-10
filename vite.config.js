import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project sites are served from https://<user>.github.io/<repo>/,
// so every asset URL needs the repo name in front of it. The deploy workflow
// sets BASE_PATH from the repo name automatically; the fallback below keeps
// `npm run build` correct when you run it by hand.
//
// Moving to a custom domain or a <user>.github.io repo? Set BASE_PATH=/ .
const base = process.env.BASE_PATH ?? '/Raemas-Remedies-Website-idea/'

export default defineConfig({
  base,
  plugins: [react()],
})
