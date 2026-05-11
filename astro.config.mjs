import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sinmaplewing.github.io',
  base: '/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
    gfm: true,
    smartypants: false,
  },
});
