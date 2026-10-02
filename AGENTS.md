# my-blog

Jakub Adamek's personal website (domain **jadamek.com**). Astro 7 static site,
deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to
`master`. Sections: **Projects · Notes · Puzzles · Other**. The owner's
writing guide is [WRITING.md](WRITING.md). Keep it in sync with any change to
how content is added.

> **The live site is OFFLINE (since 2026-10-02).** Pushes publish only
> `offline/index.html` ("This site is offline for now"). Work happens locally
> (`npm run dev`). To go live again, set `SITE_ONLINE: 'true'` in
> `.github/workflows/deploy.yml`, but only when the owner asks. The GitHub repo
> itself is still public. Making it private is a GitHub settings change only
> the owner can make; on a free plan that also turns Pages off.

## Owner decisions (follow these)

- **Not a web developer.** Adding content must stay trivial: `npm run new`,
  minimal frontmatter, no imports in posts, nothing to register.
- **LaTeX look everywhere:** Computer Modern (CMU Serif, CMU Typewriter Text
  for code), self-hosted in `public/fonts/` (subset to Latin, Greek and maths).
  Maths at 1em, the same size as the text.
- **Light/dark toggle** in the header (sun/moon). Default follows the OS; the
  choice is saved in localStorage. Implemented via `data-theme` on `<html>`.
- **No dates shown anywhere on posts.** Frontmatter `date` exists only to
  sort lists newest first. Project Euler solve dates are still shown (progress).
- **Never link the owner's GitHub** (or other profiles) unless asked.
- **Homepage = greeting only** ("Hi, I'm Jakub." + one line). No projects,
  latest posts or progress there. The owner will redesign it later.
- **Lists, not grids:** Notes topics and Projects are listed one under another.
- **Content kept as examples:** puzzles `imo-2026`, `blue-eyes`; projects
  `blackjack-lab` (real) and `arduboy-game` (draft placeholder). No Arduino projects.
- The five "Resources" notes are drafts (approved by the owner).
- **Git:** commit or push only when asked. Never add `Co-Authored-By` or other
  AI-attribution lines.

## Commands

```bash
npm run dev            # http://localhost:4321 (or npx astro dev --background / stop / status / logs)
npm run new            # interactive: project / note / puzzle / other / solved PE problem
npm run build          # production build into dist/ (drafts excluded)
```

Check UI changes by rendering them in both themes and at 390px width. If the
dev server shows stale styles or deleted posts, run `npx astro dev stop`,
`rm -rf .astro node_modules/.vite`, and start it again.

## How content works

| Section | Files | URL |
|---|---|---|
| Projects | `src/content/projects/<slug>.mdx` (+ cover image next to it) | `/projects/<slug>/` |
| Notes | `src/content/notes/<topic>/<slug>.mdx`; folder = topic | `/notes/<topic>/<slug>/` |
| Puzzles | `src/content/puzzles/<slug>.mdx`, grouped by `tags:` | `/puzzles/<slug>/`, `/puzzles/tag/<tag>/` |
| Other | `src/content/other/<slug>.mdx` | `/other/<slug>/` |
| Project Euler | `src/data/project-euler.txt`, `id##YYYY-MM-DD HH:MM:SS` per line, newest first | `/puzzles/project-euler/` |

- Frontmatter (`src/content.config.ts`): `title` (required), `description`,
  `date`, `tags`, `draft`. Projects add `cover`, `repo`, `link`, `status`.
- Sort order: newest `date` first. Notes in a topic follow `NOTE_ORDER` in
  `src/config.ts`, then date.
- `draft: true` = visible locally with a badge, excluded from the build.
  `other/style-guide.mdx` is a permanent draft: the owner's cheat sheet of
  every component. Update it when components change.
- Tags are free text; each new tag gets a filter chip and a page automatically.
- Topic folders missing from `NOTE_TOPICS` still show (named after the folder).

## Code map

| Path | What |
|---|---|
| `src/config.ts` | Name, footer links (empty), nav, section intros, note topics and order, PE username |
| `src/styles/global.css` | `@font-face`, design tokens (light + `[data-theme='dark']`), prose, boxes, reveals, code cells, lists |
| `src/layouts/BaseLayout.astro` | Page shell; inline theme script in `<head>` |
| `src/layouts/PostLayout.astro` | Every post page: crumbs, title, tags/status, prose, TOC, prev/next |
| `src/components/Header.astro` | Nav + theme toggle button |
| `src/components/mdx/` | Import-free post components: Theorem, Lemma, Proposition, Corollary, Definition, Example, Remark, Proof, Problem, Solution, Hint (registered in `index.ts`) |
| `src/components/` | PostList, ProjectCard (list row), PuzzleBrowser (PE card + tag chips + list), EulerCard, EulerChart (cumulative solves, hover tooltip), Toc, PrevNext |
| `src/lib/posts.ts` | getPosts (drafts only in dev), topics, tags, URLs, formatDate |
| `src/lib/project-euler.ts` | Parses PE file; fetches total from projecteuler.net with fallback `FALLBACK_TOTAL` |
| `src/plugins/remark-display-math.mjs` | One-line `$$…$$` → display maths |
| `src/plugins/notebook-cells.mjs` | Expressive Code plugin: ```` ```python in ```` / ```` ```text out ```` → auto-numbered Jupyter cells |
| `src/redirects.mjs` | Pre-redesign URLs → new URLs (keep) |
| `astro.config.mjs` | KaTeX macros (`\R \N \Z \Q \E \Var`), code theme (github-light / github-dark-dimmed, follows `data-theme`) |
| `scripts/new.mjs` | `npm run new` (reuses tag spellings, creates topic folders, inserts PE solves at top) |
| `offline/` | The placeholder page published while the site is offline |
| `.vscode/blog.code-snippets` | `thm def lem prop cor ex rem proof prob probsol sol hint cell code $$` |

## Invariants

1. Posts never need imports. New post components go in `src/components/mdx/`,
   then get registered in `index.ts`, the style guide and the snippets.
2. No CSS framework (Tailwind was removed). Use the tokens in `global.css`;
   component styles live in scoped `<style>` blocks.
3. `rehype-katex` is forced (`overrides` in package.json) onto the same KaTeX
   version whose CSS is bundled (`katex/dist/katex.min.css`). No CDN CSS.
4. The build must not depend on projecteuler.net being reachable.
5. Chart marks use `--chart` (validated for contrast in both themes).

## History

- **2026-10-02, redesign v1:** new section structure and URLs (with
  redirects), puzzle tags, Projects with covers, PE page with chart, new boxes,
  solution/hint reveals, notebook cells, display-maths fix, KaTeX version fix,
  `npm run new`, VS Code snippets, style guide, removed Tailwind.
- **2026-10-02, v2 (owner feedback):** LaTeX font everywhere, light/dark
  toggle, minimal homepage, list layouts, no dates, no GitHub link, examples
  trimmed to 2 puzzles + 2 projects, site taken offline.

## Next / open

- Owner will rewrite the homepage (bio, maybe photo, links).
- Real Arduboy project details and picture; real Resources notes.
- Blackjack repo is private, so the project page has no source link (owner's call).
- Going live again: flip `SITE_ONLINE`, push, check jadamek.com.
