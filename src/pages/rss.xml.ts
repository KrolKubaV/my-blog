import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

const SECTIONS_BY_COLLECTION = [
  ['notes', 'Notes'],
  ['puzzles', 'Puzzles'],
  ['misc', 'Misc'],
] as const;

export async function GET(context) {
  const all = [];
  for (const [collection, label] of SECTIONS_BY_COLLECTION) {
    for (const p of await getCollection(collection)) {
      if (p.data.draft) continue;
      const prefix = `${collection}/read`;
      all.push({
        title: p.data.title,
        description: p.data.description ?? '',
        link: `/${prefix}/${p.id}/`,
        pubDate: p.data.pubDate,
        categories: [label],
      });
    }
  }
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: all.sort(
      (a, b) => (b.pubDate?.valueOf() ?? 0) - (a.pubDate?.valueOf() ?? 0)
    ),
  });
}
