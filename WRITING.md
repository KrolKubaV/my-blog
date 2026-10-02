# Writing guide

## Add something

```bash
npm run new
```

Pick **Project**, **Note**, **Puzzle**, **Other post** or **Solved Project
Euler problem**, answer two or three questions, and the file is created (and
opened in VS Code). Then:

```bash
npm run dev        # preview at http://localhost:4321, refreshes as you type
git add -A && git commit -m "new post" && git push    # save to GitHub
```

The live site is switched off for now, so pushing does not publish anything.
To switch it back on, set `SITE_ONLINE: 'true'` in
`.github/workflows/deploy.yml` and push.

That's all. Nothing needs registering anywhere.

## Where things live

```
src/content/
  projects/   blackjack-lab.mdx  blackjack-lab.png   ← picture next to the post
  notes/      blackjack/different-rules.mdx           ← folder = topic
  puzzles/    imo-2026.mdx                            ← grouped by tags
  other/      my-running-routes.mdx
src/data/project-euler.txt                            ← solved PE problems
src/config.ts                                         ← your name, links, topic names
```

## The top of a post

```yaml
---
title: "IMO 2026"                    # the only required line
description: "One line"              # shown in lists
date: 2026-07-26                     # filled in for you; only used for ordering, never shown
tags: [Math Olympiad, IMO]           # puzzles & projects; new tags just work
draft: true                          # optional: only visible on your computer
---
```

Projects can also have `cover: ./photo.jpg`, `repo: https://...` (source
code), `link: https://...` (demo/video) and `status: "In progress"`.

## Writing

Open the **Style Guide** post locally (http://localhost:4321/other/style-guide/)
for every building block with code to copy. The short version:

| You want | Type |
|---|---|
| Maths | `$x^2$` inline, `$$ ... $$` on its own line |
| Theorem, Lemma, Definition, Example, Remark | `<Theorem title="Name"> ... </Theorem>` |
| Proof (ends with ∎) | `<Proof> ... </Proof>` |
| Puzzle statement | `<Problem> ... </Problem>` (`numbered={false}` for a single one) |
| Hidden solution / hint | `<Solution> ... </Solution>`, `<Hint> ... </Hint>` |
| Notebook cell | ```` ```python in ```` then ```` ```text out ```` |

In VS Code, type `thm`, `def`, `proof`, `prob`, `sol`, `hint`, `cell` or
`$$` and press Tab.

## Small changes

- **Order of notes in a topic:** `NOTE_ORDER` in `src/config.ts`.
- **Topic names and descriptions:** `NOTE_TOPICS` in `src/config.ts`.
- **Homepage text:** `src/pages/index.astro`.
- **Colours and fonts:** the top of `src/styles/global.css`.
- **Footer links (email etc.):** `LINKS` in `src/config.ts`.
