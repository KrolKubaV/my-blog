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

export default defineConfig({
  site: 'https://jadamek.com',
  redirects,
  integrations: [
    expressiveCode({
      // Syntax colours [light, dark], switched by the theme button (data-theme on <html>).
      themes: ['github-light', 'github-dark-dimmed'],
      useDarkModeMediaQuery: false,
      themeCssSelector: theme => `[data-theme='${theme.type}']`,
      plugins: [notebookCells()],
      // Frames and fonts use the site's tokens (src/styles/global.css), so they follow the theme too.
      styleOverrides: {
        borderRadius: '10px',
        borderColor: 'var(--border)',
        codeBackground: 'var(--surface)',
        codeFontFamily: 'var(--font-mono)',
        codeFontSize: '0.95rem',
        codeLineHeight: '1.7',
        codePaddingBlock: '0.95rem',
        codePaddingInline: '1.15rem',
        uiFontFamily: 'var(--font)',
        uiFontSize: '0.9rem',
        frames: {
          shadowColor: 'transparent',
          frameBoxShadowCssValue: 'none',
          editorTabBarBackground: 'var(--surface-2)',
          editorTabBarBorderBottomColor: 'var(--border)',
          editorActiveTabBackground: 'var(--surface)',
          editorActiveTabIndicatorTopColor: 'transparent',
          editorActiveTabIndicatorBottomColor: 'transparent',
          terminalTitlebarBackground: 'var(--surface-2)',
          terminalBackground: 'var(--surface)',
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
