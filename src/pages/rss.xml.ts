import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config';
import { getPosts, postUrl, SECTION_LABELS, type Section } from '../lib/posts';

export async function GET(context: APIContext) {
  const sections: Section[] = ['projects', 'notes', 'puzzles', 'other'];
  const posts = (await Promise.all(sections.map(s => getPosts(s)))).flat();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts
      .filter(p => !p.data.draft)
      .sort((a, b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0))
      .map(p => ({
        title: p.data.title,
        description: p.data.description ?? '',
        link: postUrl(p),
        pubDate: p.data.date,
        categories: [SECTION_LABELS[p.collection as Section], ...p.data.tags],
      })),
  });
}
