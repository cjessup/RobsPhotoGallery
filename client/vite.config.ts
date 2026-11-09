import { copyFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function spaFallback(): Plugin {
  return {
    name: 'spa-fallback',
    apply: 'build',
    closeBundle() {
      copyFileSync(new URL('./dist/index.html', import.meta.url), new URL('./dist/404.html', import.meta.url))
    },
  }
}

// GitHub Pages serves the site from /RobsPhotoGallery/. Local dev stays at /.
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/RobsPhotoGallery/' : '/',
  plugins: [react(), spaFallback()],
})
