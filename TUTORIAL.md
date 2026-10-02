# How to use your website

A step-by-step guide. You never need to touch the website's code, only the
text files your posts live in.

> **Tip:** in VS Code, press **Ctrl+Shift+V** to read this file nicely formatted.

**Contents**

1. [Start the preview](#1-start-the-preview-do-this-first)
2. [Add a puzzle](#2-add-a-puzzle)
3. [Add a note](#3-add-a-note)
4. [Add a project](#4-add-a-project)
5. [Add a post to "Other"](#5-add-a-post-to-other)
6. [Mark Project Euler problems as solved](#6-mark-project-euler-problems-as-solved)
7. [Writing toolbox](#7-writing-toolbox): maths, theorems, solutions, code, pictures
8. [Drafts: hide something unfinished](#8-drafts-hide-something-unfinished)
9. [Save your work](#9-save-your-work)
10. [Small changes](#10-small-changes)
11. [If something goes wrong](#11-if-something-goes-wrong)

---

## 1. Start the preview (do this first)

1. Open the `my-blog` folder in VS Code.
2. Open a terminal: menu **Terminal → New Terminal** (or **Ctrl+`**).
3. Type this and press Enter:

   ```bash
   npm run dev
   ```

4. Open **http://localhost:4321** in your browser.

Leave that terminal running. Every time you save a file, the page in the
browser updates by itself. To stop it, click into the terminal and press
**Ctrl+C**.

For the commands below, open a **second** terminal (the **+** button in the
terminal panel), so the preview keeps running in the first one.

---

## 2. Add a puzzle

**Step 1.** In the terminal, type:

```bash
npm run new
```

**Step 2.** Type `3` (Puzzle) and press Enter. Answer the questions:

```
Title: Jane Street: October 2026
One line about it (optional):            ← just press Enter to skip
Existing tags: Math Olympiad, IMO
Tags, comma separated: Jane Street, Probability
```

Tags group your puzzles, and you can invent new ones any time. Each tag
becomes a filter button on the Puzzles page automatically.

**Step 3.** The new file opens in VS Code. It looks like this:

```mdx
---
title: "Jane Street: October 2026"
date: 2026-10-02
tags: [Jane Street, Probability]
---

<Problem numbered={false}>
State the puzzle here.
</Problem>

<Solution>
Your solution. Leave this empty to show "Solution coming soon".
</Solution>
```

Replace "State the puzzle here." with the puzzle, and "Your solution..." with
your solution. Save with **Ctrl+S**, then look at
http://localhost:4321/puzzles/.

**Several problems in one post** (like a whole olympiad): repeat the
`<Problem>` + `<Solution>` pair for each one, and delete `numbered={false}` so
they are numbered Problem 1, Problem 2, and so on. `imo-2026.mdx` is a
complete example.

**No solution yet?** Leave it empty, `<Solution></Solution>`, and the page
shows "Solution coming soon".

**Want hints first?** Put `<Hint>...</Hint>` before the solution. Readers
click to reveal each one.

Where the file lives: `src/content/puzzles/`.

---

## 3. Add a note

Notes are grouped into **topics** (Blackjack, ML in Finance, ...). Each topic
is like a small book: clicking it opens the first note, and a contents
sidebar lets the reader jump between notes.

**Step 1.** Run `npm run new` and type `2` (Note).

**Step 2.** Pick the topic by its number, or pick **+ New topic** and type a
name, e.g. `Graph Theory`.

**Step 3.** Type the title. The file opens:

```mdx
---
title: "Card Counting"
date: 2026-10-02
---

Start writing here.

## First section
```

Write your note. Every `## Heading` becomes a numbered section (1., 2., ...)
and shows up in the contents sidebar.

### Putting notes in order

The order of the notes in a topic is the order of its contents sidebar, of
the Previous/Next buttons, and decides which note opens when someone clicks
the topic (the first one).

**What happens by itself:** a new note goes to the **end** of its topic.

**To choose the order yourself**, say you've just added an Introduction to
Blackjack and want it first:

1. Note the new file's name, without `.mdx`. For
   `src/content/notes/blackjack/introduction.mdx` that's `introduction`.
2. Open `src/config.ts` and find `NOTE_ORDER`. Each topic has one line,
   listing its notes from first to last:

   ```ts
   'blackjack': ['resources', 'different-rules', 'deriving-basic-strategy'],
   ```

3. Add the name where you want the note, in quotes and followed by a comma.
   First place:

   ```ts
   'blackjack': ['introduction', 'resources', 'different-rules', 'deriving-basic-strategy'],
   ```

4. Save. The sidebar shows the new order straight away.

Good to know:

- Notes missing from the line still show, after the listed ones, oldest
  first. So you only need to touch this when the end isn't the right place.
- A misspelt name is simply ignored (that note goes to the end), so if the
  order looks wrong, compare the spelling with the file name.
- A brand-new topic has no line yet. Add one in the same style, using the
  topic's folder name: `'graph-theory': ['introduction', 'trees'],`

**Giving a new topic a nicer name.** A new topic is named after its folder
(`graph-theory` → "Graph Theory"). For a different name, or to put it in a
different place in the list, add it to `NOTE_TOPICS` in `src/config.ts`.

Where the files live: `src/content/notes/<topic>/`.

---

## 4. Add a project

**Step 1.** Run `npm run new` and type `1` (Project).

**Step 2.** Answer the questions:

```
Project name: Arduboy Snake
One line about it (optional):
Link to the code (optional):             ← press Enter to skip
```

**Step 3. Add a picture** (strongly recommended, because the projects list
shows it):

1. Copy your picture (a screenshot or photo, `.jpg` or `.png`) into the
   folder `src/content/projects/`, next to the new `.mdx` file.
2. In the top block of the `.mdx` file you'll find this line:

   ```yaml
   # cover: ./arduboy-snake.jpg   ← put a picture next to this file and remove the #
   ```

   Delete the `#` at the start and write your picture's real file name:

   ```yaml
   cover: ./my-photo.jpg
   ```

**Optional extras** for the top block:

```yaml
status: "In progress"              # a small badge next to the name
link: https://youtu.be/...         # adds an "Open project" button (demo, video, ...)
repo: https://...                  # adds a "Source code" button
```

Then write about the project below the top block, as in any post.

Where the files live: `src/content/projects/`.

---

## 5. Add a post to "Other"

Run `npm run new`, type `4` (Other post), and type a title. The file opens;
write anything you like.

Where the files live: `src/content/other/`.

---

## 6. Mark Project Euler problems as solved

```bash
npm run solved 602
```

Several at once works too:

```bash
npm run solved 602 143 595
```

That's all. The page updates its count, grid and "recently solved" list.

It's safe to make mistakes:

- A problem that's already on the list is skipped, so you can't add one twice.
- A number that isn't a real problem (say `npm run solved 69420`) is
  rejected, because the command checks with projecteuler.net first.
- `npm run solve` (without the d) works too.

Your list lives in `src/data/project-euler.txt`, newest first. You can also
paste a fresh copy into that file.

> Why isn't this fully automatic? Project Euler only shows your solved
> problems after you log in, and the website can't log in as you.

---

## 7. Writing toolbox

Everything below works in any post. Your
[Style Guide](http://localhost:4321/other/style-guide/) page shows each one
next to the code that makes it (only visible on your computer).

**VS Code shortcuts.** In a post, type one of these words and press **Tab**:
`thm` `def` `lem` `prop` `cor` `ex` `rem` `proof` `prob` `probsol` `sol`
`hint` `cell` `code` `$$`. The full block appears, ready to fill in.

### Text

```mdx
**bold**, *italic*, `code`, [a link](https://example.com)

- a bullet point
1. a numbered point

## A section heading
### A smaller heading
```

### Maths

```mdx
Inline maths: $E[X] = \sum_x x\,p(x)$

A formula on its own line:

$$
P(\text{bust}) = \frac{4}{13}
$$
```

Shortcuts: `\R`, `\N`, `\Z`, `\Q`, `\E`, `\Var`.

### Theorems, definitions, examples, remarks, proofs

```mdx
<Definition title="Martingale">
A sequence $(X_n)$ with $\E[X_{n+1} \mid \mathcal F_n] = X_n$.
</Definition>

<Theorem title="Optional stopping">
If $\tau$ is a bounded stopping time, then $\E[X_\tau] = \E[X_0]$.
</Theorem>

<Proof>
Write $X_\tau$ as a telescoping sum and take expectations.
</Proof>
```

You can also use `<Lemma>`, `<Proposition>`, `<Corollary>`, `<Example>` and
`<Remark>`. The `title="..."` part is optional, and numbering is automatic.

### Problems, hints and solutions

```mdx
<Problem>
The question.
</Problem>

<Hint>
A nudge.
</Hint>

<Solution>
The answer.
</Solution>
```

### Code (like a Jupyter notebook)

````mdx
```python in
sum(range(10))
```

```text out
45
```
````

These show up as `In [1]:` and `Out [1]:` and are numbered automatically.
For a plain code block, write just ` ```python ` instead.

### Pictures

Put the picture next to the post's `.mdx` file, then write:

```mdx
![What the picture shows](./my-picture.png)
```

---

## 8. Drafts: hide something unfinished

Add this line to the top block of any post:

```yaml
draft: true
```

You still see the post on your computer, marked with a red **Draft** badge,
but it never appears on the live website. Delete the line when it's ready.

---

## 9. Save your work

When you're happy with your changes, type in the terminal:

```bash
git add -A
git commit -m "Add Jane Street October puzzle"
git push
```

The text in quotes is a short note to yourself about what you changed.

**The live website is switched off for now**, so pushing only saves your work
on GitHub. When you want the site back online, open
`.github/workflows/deploy.yml`, change `SITE_ONLINE: 'false'` to
`SITE_ONLINE: 'true'`, and push. After a couple of minutes it's live at
jadamek.com.

---

## 10. Small changes

| I want to change... | Where |
|---|---|
| The homepage text | `src/pages/index.astro` |
| The order of notes in a topic | `NOTE_ORDER` in `src/config.ts` |
| A topic's name | `NOTE_TOPICS` in `src/config.ts` |
| Show the short descriptions again (under "Notes", under topics, under post titles) | `SHOW` in `src/config.ts`: change `false` to `true` |
| Links in the footer (e.g. email) | `LINKS` in `src/config.ts` |
| Colours | the top of `src/styles/global.css` |

---

## 11. If something goes wrong

**The page shows a red error box.** Read the first line; it names the file
and the line. The usual causes:

- A missing quote in the top block: `title: "My post` instead of `title: "My post"`.
- A box that is opened but never closed: `<Theorem>` without `</Theorem>`.
- A `{` or `<` in normal text (outside maths). The website reads these as
  code. Write `\{` instead of `{`, put the text in `$...$` maths, or put a
  space after `<`. Careful: `{1,2}` in plain text doesn't even show an error,
  it silently shows up as just "2". Inside `$...$` maths, braces are always
  fine.

**The page doesn't update, or a deleted post still shows.** Stop the preview
(**Ctrl+C**) and start it again with `npm run dev`. If that doesn't help:

```bash
npx astro dev stop
rm -rf .astro node_modules/.vite
npm run dev
```

**"command not found" or missing packages** (e.g. on a new computer): run
`npm install` once, then `npm run dev`.
