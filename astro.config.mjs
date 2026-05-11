import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://knightzone.studio',
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
