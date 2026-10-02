# my-blog

Jakub Adamek's personal website (domain **jadamek.com**). Astro 7 static site,
deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to
`master`. Sections: **Projects · Notes · Puzzles · Other**. The owner's
step-by-step guide is [TUTORIAL.md](TUTORIAL.md), written for a non-developer.
Keep it in sync with any change to how content is added.

> **The site is LIVE at jadamek.com (again since 2026-10-02):** every push to
> `master` publishes it, so drafts (`draft: true`) are the way to keep
> unfinished work off it. `SITE_ONLINE: 'false'` in
> `.github/workflows/deploy.yml` takes it offline (publishes only
> `offline/index.html`); flip it only when the owner asks.

## Owner decisions (follow these)

- **Not a web developer.** Adding content must stay trivial: `npm run new`,
  minimal frontmatter, no imports in posts, nothing to register.
- **LaTeX look everywhere:** Computer Modern (CMU Serif, CMU Typewriter Text
  for code), self-hosted in `public/fonts/` (subset to Latin, Greek and maths).
  Maths at 1em, the same size as the text.
- **Light mode is the default** (even on a dark-mode OS). The sun/moon button
  in the header switches to dark, and the choice is saved in localStorage.
  Implemented via `data-theme` on `<html>`.
- **No dates shown anywhere**, Project Euler included. Frontmatter `date`
  exists only to sort lists newest first.
- **No descriptive one-liners:** section intros, note topic descriptions and
  post descriptions are hidden via `SHOW` in `src/config.ts` (all `false`).
  The texts are kept so the owner can switch them back on. They still feed
  the invisible `<meta name="description">`.
- **Project Euler page:** stats (Solved, Complete %, Last solved #id),
  recently solved as `#id` chips, problem grid. No progress-over-time chart,
  no dates, and no "level" (the owner says there is no such thing; don't add it back).
- **Never link the owner's GitHub** (or other profiles) unless asked.
- **Homepage = greeting only** ("Hi, I'm Jakub." + one line), all at body
  text size. No projects, latest posts or progress there. The owner will
  redesign it later.
- **Lists, not grids:** Notes topics and Projects are listed one under another.
  The Notes list shows topic names only (no note counts).
- **Notes read like a book:** clicking a topic opens its first note
  (`/notes/<topic>/` redirects there). The topic's contents (all notes plus
  the current note's `##` sections, with scroll-spy) are always visible: a
  sticky left sidebar from 68rem up, and a sticky "Contents" bar below that.
  Notes pages use the wide layout (64rem); header and footer widen with them.
- **Projects have no tags.** Puzzles keep tags (no "Logic" tag).
- **No RSS feed.**
- **Project Euler can't be automatic.** The solved list sits behind PE's
  login with a CAPTCHA; the PE solutions repo has notebooks for attempts
  too, and its commit messages don't match solves. So adding is one
  command: `npm run solved 602 143` (alias `npm run solve`). It checks the
  live problem count and rejects numbers that aren't problems; the page also
  ignores out-of-range ids. A cookie-based sync is possible only if the owner
  provides a logged-in session; not built.
- **Content kept as examples:** puzzles `imo-2026`, `blue-eyes`; projects
  `blackjack-lab` (real) and `arduboy-game` (draft placeholder). No Arduino projects.
- The five "Resources" notes are drafts (approved by the owner).
- **Git:** commit or push only when asked. Never add `Co-Authored-By` or other
  AI-attribution lines.

## Commands

```bash
npm run dev            # http://localhost:4321 (or npx astro dev --background / stop / status / logs)
npm run new            # interactive: project / note / puzzle / other / solved PE problem
npm run solved 602 143 # mark Project Euler problems solved (any number)
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
| `src/config.ts` | Name, footer links (empty), nav, `SHOW` switches, section intros, note topics and order, PE username |
| `src/styles/global.css` | `@font-face`, design tokens (light + `[data-theme='dark']`), prose, boxes, reveals, code cells, lists |
| `src/layouts/BaseLayout.astro` | Page shell; inline theme script in `<head>` |
| `src/layouts/PostLayout.astro` | Every post page: crumbs, title, tags/status, prose, TOC, prev/next |
| `src/components/Header.astro` | Nav + theme toggle button |
| `src/components/mdx/` | Import-free post components: Theorem, Lemma, Proposition, Corollary, Definition, Example, Remark, Proof, Problem, Solution, Hint (registered in `index.ts`) |
| `src/components/` | NoteNav (notes sidebar + mobile contents bar, both rendering NoteChapters), PostList, ProjectCard (list row), PuzzleBrowser (PE card + tag chips + list), EulerCard, Toc (right-hand, non-notes posts), PrevNext |
| `src/lib/posts.ts` | getPosts (drafts only in dev), topics + reading order, tags, URLs |
| `src/lib/project-euler.mjs` | PE data file, live problem count (fallback `FALLBACK_TOTAL`, offline limit), `getEulerStats`. Plain JS so `scripts/solved.mjs` shares it |
| `src/lib/slugify.mjs` | Tag/file-name slugs, shared by the site and `scripts/new.mjs` |
| `src/lib/scroll-spy.ts` | Highlights the section being read (NoteNav and Toc) |
| `src/plugins/remark-display-math.mjs` | One-line `$$…$$` → display maths |
| `src/plugins/notebook-cells.mjs` | Expressive Code plugin: ```` ```python in ```` / ```` ```text out ```` → auto-numbered Jupyter cells |
| `src/redirects.mjs` | Pre-redesign URLs → new URLs (keep) |
| `astro.config.mjs` | KaTeX macros (`\R \N \Z \Q \E \Var`), code theme (github-light / github-dark-dimmed, follows `data-theme`) |
| `scripts/new.mjs` | `npm run new` (reuses tag spellings, creates topic folders) |
| `scripts/solved.mjs` | `npm run solved <ids>`: validates ids against projecteuler.net, inserts at the top of the data file, skips duplicates |
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
5. `--chart` / `--on-chart` colour the solved PE cells (validated for contrast in both themes).

## History

- **2026-10-02, redesign v1:** new section structure and URLs (with
  redirects), puzzle tags, Projects with covers, PE page with chart, new boxes,
  solution/hint reveals, notebook cells, display-maths fix, KaTeX version fix,
  `npm run new`, VS Code snippets, style guide, removed Tailwind.
- **2026-10-02, v2 (owner feedback):** LaTeX font everywhere, light/dark
  toggle, minimal homepage, list layouts, no dates, no GitHub link, examples
  trimmed to 2 puzzles + 2 projects, site taken offline (pushed as 7defde6).
- **2026-10-02, v3:** light mode default; descriptions hidden behind `SHOW`
  switches; PE page without chart, dates or level.
- **2026-10-02, v4:** notes open their first page and have an always-visible
  contents sidebar or bar; homepage text all one size; no project tags; Logic
  tag removed; RSS removed; `npm run solved`; WRITING.md replaced by
  TUTORIAL.md. (v3 and v4 not committed yet.)
- **2026-10-02, v5 (cleanup, no visual change):** removed dead code
  (formatDate, PostList numbering, unused CSS and tokens, legacy
  `title="In [n]"` cells); one `--font` variable; code-block colours use the
  tokens; shared PE module, slugify and scroll-spy; puzzles heading lives in
  PuzzleBrowser. Fixed: `numbered={false}` theorems no longer skip a number;
  on phones a section jump no longer hides the heading under the Contents bar.
  Checked by pixel-diffing 100 screenshots before/after. Pushed as 91f2187.
- **2026-10-02, live:** owner asked to publish; `SITE_ONLINE: 'true'`.

## Next / open

- Owner will rewrite the homepage (bio, maybe photo, links).
- Real Arduboy project details and picture; real Resources notes.
- Blackjack repo is private, so the project page has no source link (owner's call).
