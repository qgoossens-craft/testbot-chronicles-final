// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://titusconsulting.be',
  output: 'hybrid', // Hybrid mode for better Netlify compatibility
  adapter: netlify(), // Netlify adapter
});
