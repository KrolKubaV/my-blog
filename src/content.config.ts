import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const mathsNotes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/maths-notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    subsection: z.string().optional(),

    draft: z.boolean().default(false),
  }),
});

const casinoGames = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/casino-games' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    subsection: z.string().optional(),

    draft: z.boolean().default(false),
  }),
});

const puzzles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/puzzles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    subsection: z.string().optional(),

    draft: z.boolean().default(false),
  }),
});

const misc = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/misc' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    draft: z.boolean().default(false),
  }),
});

export const collections = { mathsNotes, casinoGames, puzzles, misc };
