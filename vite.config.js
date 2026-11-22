import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { HERO_SIZES } from "./src/components/hero/heroImage.js";

/* The hero portrait is the largest thing on the first screen, but the browser
   only learns about it once React has run. This writes a preload for it into
   index.html at build time, using the hashed file names from the bundle, so
   the photo downloads alongside the JavaScript instead of after it. */
function preloadHeroImage() {
  return {
    name: "preload-hero-image",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const files = Object.keys(ctx.bundle ?? {});
        const full = files.find((f) => /hero-cutout-[\w-]{8}\.webp$/.test(f));
        const small = files.find((f) => /hero-cutout-400-[\w-]{8}\.webp$/.test(f));
        if (!full || !small) return html;
        return {
          html,
          tags: [
            {
              tag: "link",
              attrs: {
                rel: "preload",
                as: "image",
                href: `/${full}`,
                imagesrcset: `/${small} 400w, /${full} 638w`,
                imagesizes: HERO_SIZES,
                fetchpriority: "high",
              },
              injectTo: "head",
            },
          ],
        };
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    preloadHeroImage(),
  ],
})
