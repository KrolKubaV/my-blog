# Writing guide

How to add and structure content on the blog. Everything here is Markdown/MDX
in `src/content/` — push to deploy.

## Adding a post

```bash
bash new-post.sh        # asks section, subsection, title; creates the file
```

The file lands in `src/content/<section>/<subsection>/<slug>.mdx`. The slug
comes from the title, and it is the article's URL.

## Frontmatter

```yaml
---
title: "My Post"            # required — shown everywhere
description: "One-liner"    # optional — SEO / link previews only
subsection: "blackjack"     # optional (notes/puzzles) — must exist in config.ts
draft: true                 # optional — hides the post from all listings
---
```

No dates needed anywhere.

## Ordering articles

Article order is controlled centrally in `POST_ORDER` at the bottom of
`src/config.ts`, not in each post:

```ts
'notes/blackjack': ['resources', 'different-rules', 'deriving-basic-strategy'],
```

List slugs in the order you want them displayed. Anything not listed appears
after the listed ones. New sections are added to `SECTIONS` in the same file
(order of the array = order on the site).

## Math

Inline math `$p(1 + b)$`, display math:

```latex
$$f^* = \frac{bp - q}{b}$$
```

## Boxes: theorem, definition, remark

Import once at the top of the post (after the frontmatter):

```mdx
import Theorem from '../../../components/Theorem.astro';
import Definition from '../../../components/Definition.astro';
import Remark from '../../../components/Remark.astro';
```

Then use them like quotes with a title:

```mdx
<Definition title="Setup">
Consider a gamble with probability $p$ of winning.
</Definition>

<Theorem title="Kelly Fraction">
The optimal fraction is $f^* = \frac{bp - q}{b}$.
</Theorem>

<Remark>
This assumes an infinite bankroll.
</Remark>
```

All three accept an optional `title`.

## Puzzles

Start a puzzle post with the statement inside the `Problem` box:

```mdx
import Problem from '../../../components/Problem.astro';

<Problem title="Dropped Coin">
A coin is dropped ...
</Problem>
```

Then put your reasoning below under a `## Solution` heading. For a step-by-step
reveal use HTML details:

```mdx
<details>
<summary>Hint 1</summary>
Think about parity.
</details>
```

## Code / fake Jupyter notebook cells

Fenced code blocks work out of the box. To make one look like a notebook cell,
give it a cell-style title:

````mdx
```python title="In [1]"
cards = [2, 3, 4, 5, 6, 7, 8, 9, 10] + [10, 10, 10]

def p_bust(hard_total):
    return sum(c > 21 - hard_total for c in cards) / len(cards)
```
````

Show output in its own block:

````mdx
```text title="Out [1]"
hard 16: p(bust) = 0.615
```
````

See `src/content/notes/blackjack/deriving-basic-strategy.mdx` for a live example.

## Project Euler

Append one line per solved problem to `src/data/project-euler.txt`
(or run `bash new-solved.sh`):

```
123: 2026-08-21 14:00:00,
```

## Workflow

1. `npm run dev` → http://localhost:4321 (auto-reloads as you edit)
2. Write, preview, repeat
3. `git add -A && git commit -m "..." && git push` — push deploys
