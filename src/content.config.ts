import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Every post has the same few fields. Only `title` is required.
const common = {
  title: z.string(),
  description: z.string().optional(), // one line, shown in lists and link previews
  date: z.coerce.date().optional(), // when it was added; `npm run new` fills it in
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false), // visible locally, hidden on the live site
};

const posts = (folder: string) => glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${folder}` });

const projects = defineCollection({
  loader: posts('projects'),
  schema: ({ image }) =>
    z.object({
      ...common,
      cover: image().optional(), // a picture next to the .mdx file, e.g. ./cover.png
      repo: z.url().optional(), // source code link
      link: z.url().optional(), // live demo / video / shop page
      status: z.string().optional(), // e.g. "In progress"
    }),
});

const notes = defineCollection({ loader: posts('notes'), schema: z.object(common) });
const puzzles = defineCollection({ loader: posts('puzzles'), schema: z.object(common) });
const other = defineCollection({ loader: posts('other'), schema: z.object(common) });

export const collections = { projects, notes, puzzles, other };
