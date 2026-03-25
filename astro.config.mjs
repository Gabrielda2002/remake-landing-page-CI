// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.dev/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@services': '/public/content/servicios',
        '@professional': '/public/content/profesionales',
        '@map': '/public/content/mapa-mental',
        '@banner': '/public/content/banners',
        '@Logo': '/public/content/logos',
        '@styles': '/src/styles',
      },
    },
    ssr: {
      noExternal: ['primereact']
    }
  }
});