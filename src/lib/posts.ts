import { getCollection, type CollectionEntry } from 'astro:content';
import { postRank } from '../config';

type Collection = 'notes' | 'puzzles' | 'misc';

export async function orderedPosts(
  collection: Collection,
  orderKey: string,
  subsection?: string
): Promise<CollectionEntry<Collection>[]> {
  return (await getCollection(collection))
    .filter(p => !p.data.draft && (!subsection || p.data.subsection === subsection))
    .sort(
      (a, b) =>
        postRank(orderKey, a.id) - postRank(orderKey, b.id) ||
        (b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0)
    );
}

export function neighbours<T>(list: T[], id: string): { prev?: T; next?: T } {
  const i = list.findIndex(p => (p as any).id === id);
  if (i === -1) return {};
  return { prev: list[i - 1], next: list[i + 1] };
}
