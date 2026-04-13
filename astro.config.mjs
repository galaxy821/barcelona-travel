import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://galaxy821.github.io',
  base: '/barcelona-travel',
  integrations: [react()],
  output: 'static',
});
