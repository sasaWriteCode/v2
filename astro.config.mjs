// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Provisional domain — v1 only evidences ewarranty.irispro.com; the
  // marketing domain needs client confirmation (see README).
  site: 'https://www.irispro.com',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});