// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import expressiveCode from 'astro-expressive-code';
import remarkDisplayMath from './src/plugins/remark-display-math.mjs';
import { notebookCells } from './src/plugins/notebook-cells.mjs';
import { redirects } from './src/redirects.mjs';

// Shortcuts usable in any formula, e.g. $x \in \R$ or $\E[X]$.
const katexMacros = {
  '\\R': '\\mathbb{R}',
  '\\N': '\\mathbb{N}',
  '\\Z': '\\mathbb{Z}',
  '\\Q': '\\mathbb{Q}',
  '\\E': '\\operatorname{\\mathbb{E}}',
  '\\Var': '\\operatorname{Var}',
};

// Code block colours: [light, dark], switched by the theme button (data-theme on <html>).
const light = (/** @type {any} */ { theme }) => theme.type === 'light';

export default defineConfig({
  site: 'https://jadamek.com',
  redirects,
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark-dimmed'],
      useDarkModeMediaQuery: false,
      themeCssSelector: theme => `[data-theme='${theme.type}']`,
      plugins: [notebookCells()],
      styleOverrides: {
        borderRadius: '10px',
        borderColor: ctx => (light(ctx) ? '#e4e6eb' : '#272b33'),
        codeBackground: ctx => (light(ctx) ? '#f7f8fa' : '#161a20'),
        codeFontFamily: "'CMU Typewriter Text', ui-monospace, monospace",
        codeFontSize: '0.95rem',
        codeLineHeight: '1.7',
        codePaddingBlock: '0.95rem',
        codePaddingInline: '1.15rem',
        uiFontFamily: "'CMU Serif', Georgia, serif",
        uiFontSize: '0.9rem',
        frames: {
          shadowColor: 'transparent',
          frameBoxShadowCssValue: 'none',
          editorTabBarBackground: ctx => (light(ctx) ? '#eef0f3' : '#1b1f26'),
          editorTabBarBorderBottomColor: ctx => (light(ctx) ? '#e4e6eb' : '#272b33'),
          editorActiveTabBackground: ctx => (light(ctx) ? '#f7f8fa' : '#161a20'),
          editorActiveTabIndicatorTopColor: 'transparent',
          editorActiveTabIndicatorBottomColor: 'transparent',
          terminalTitlebarBackground: ctx => (light(ctx) ? '#eef0f3' : '#1b1f26'),
          terminalBackground: ctx => (light(ctx) ? '#f7f8fa' : '#161a20'),
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkDisplayMath],
      rehypePlugins: [[rehypeKatex, { macros: katexMacros }]],
    }),
  },
  devToolbar: {
    enabled: false,
  },
});
