import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function postPath(post: Post): string {
  const d = post.data.date;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `/${y}/${m}/${day}/${post.data.id}/${encodeURIComponent(post.data.slug)}/`;
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft && !data.private);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getCategoryCounts(): Promise<Map<string, number>> {
  const posts = await getPublishedPosts();
  const m = new Map<string, number>();
  for (const p of posts) {
    for (const c of p.data.categories ?? []) {
      m.set(c, (m.get(c) ?? 0) + 1);
    }
  }
  return m;
}

export async function getTagCounts(): Promise<Map<string, number>> {
  const posts = await getPublishedPosts();
  const m = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags ?? []) {
      m.set(t, (m.get(t) ?? 0) + 1);
    }
  }
  return m;
}

export function categoryPath(name: string): string {
  return `/category/${encodeURIComponent(name)}/`;
}

export function tagPath(name: string): string {
  return `/tag/${encodeURIComponent(name)}/`;
}
