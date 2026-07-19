// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeMathjaxRestore from './src/plugins/rehype-mathjax-restore.js';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: 'https://krolkubav.github.io',
  integrations: [
    expressiveCode(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjaxRestore],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
});
