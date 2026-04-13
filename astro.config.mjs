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
        '@services': '/src/assets/servicios',
        '@professional': '/src/assets/profesionales',
        '@map': '/src/assets/mapa-mental',
        '@banner': '/src/assets/banners',
        '@logo': '/src/assets/logos',
        '@flag': '/src/assets/banderas',
        '@styles': '/src/styles',
      },
    },
    ssr: {
      noExternal: ['primereact']
    }
  }
});