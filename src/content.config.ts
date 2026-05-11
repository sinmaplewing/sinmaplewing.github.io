import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    private: z.boolean().default(false),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
    featured_image: z.string().optional(),
    permalink: z.string().optional(),
    wp_status: z.string(),
    wp_type: z.literal('post'),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    private: z.boolean().default(false),
    excerpt: z.string().optional(),
    featured_image: z.string().optional(),
    wp_status: z.string(),
    wp_type: z.literal('page'),
  }),
});

export const collections = { posts, pages };
