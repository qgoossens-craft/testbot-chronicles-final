// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://titusconsulting.be',
  output: 'server', // Server mode for admin functionality
  adapter: netlify(), // Netlify Functions adapter
});
