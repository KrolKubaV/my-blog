import { getCollection, type CollectionEntry } from 'astro:content';
import { NOTE_ORDER, NOTE_TOPICS } from '../config';
import { slugify } from './slugify.mjs';

export { slugify };

export type Section = 'projects' | 'notes' | 'puzzles' | 'other';
export type Post = CollectionEntry<Section>;

// Drafts are visible while previewing locally, never on the live site.
const showDrafts = import.meta.env.DEV;

/** All posts of a section, newest first (drafts only while previewing). */
export async function getPosts<S extends Section>(section: S): Promise<CollectionEntry<S>[]> {
  const posts = await getCollection(section, p => showDrafts || !p.data.draft);
  return posts.sort(newestFirst);
}

export function postUrl(post: Post): string {
  return `/${post.collection}/${post.id}/`;
}

function newestFirst(a: Post, b: Post): number {
  const byDate = (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0);
  // Same day: "IMO 2026" before "IMO 2025", "Third Round" before "Second".
  return byDate || b.data.title.localeCompare(a.data.title, 'en', { numeric: true });
}

export function neighbours<T extends { id: string }>(list: T[], id: string) {
  const i = list.findIndex(p => p.id === id);
  return { prev: i > 0 ? list[i - 1] : undefined, next: i >= 0 ? list[i + 1] : undefined };
}

// ---------- Notes: topics come from folder names ----------

export type Topic = {
  slug: string;
  label: string;
  description?: string;
  notes: CollectionEntry<'notes'>[];
};

// A note's id is "<topic>/<file name>", e.g. "blackjack/card-counting".
const topicOf = (note: CollectionEntry<'notes'>) => note.id.split('/')[0];
export const noteSlug = (note: CollectionEntry<'notes'>) => note.id.slice(topicOf(note).length + 1);

/** Topics in config order (unlisted folders last), each with its notes in reading order. */
export async function getTopics(): Promise<Topic[]> {
  const notes = await getPosts('notes');
  const slugs = [...new Set([...NOTE_TOPICS.map(t => t.slug), ...notes.map(topicOf)])];
  return slugs
    .map(slug => {
      const config = NOTE_TOPICS.find(t => t.slug === slug);
      return {
        slug,
        label: config?.label ?? titleCase(slug),
        description: config?.description,
        notes: readingOrder(slug, notes.filter(n => topicOf(n) === slug)),
      };
    })
    .filter(t => t.notes.length > 0);
}

function readingOrder(topic: string, notes: CollectionEntry<'notes'>[]) {
  const order = NOTE_ORDER[topic] ?? [];
  const rank = (n: CollectionEntry<'notes'>) => {
    const i = order.indexOf(noteSlug(n));
    return i === -1 ? order.length : i;
  };
  return [...notes].sort(
    (a, b) =>
      rank(a) - rank(b) ||
      (a.data.date?.valueOf() ?? 0) - (b.data.date?.valueOf() ?? 0) ||
      a.data.title.localeCompare(b.data.title)
  );
}

function titleCase(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ---------- Tags ----------

export type Tag = { slug: string; label: string; count: number };

/** Every tag used in a section, most used first. Spelled as first written. */
export function collectTags(posts: Post[]): Tag[] {
  const tags = new Map<string, Tag>();
  for (const post of posts) {
    for (const label of post.data.tags) {
      const slug = slugify(label);
      const tag = tags.get(slug) ?? { slug, label, count: 0 };
      tag.count++;
      tags.set(slug, tag);
    }
  }
  return [...tags.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}
