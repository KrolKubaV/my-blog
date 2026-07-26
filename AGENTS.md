## How to use this blog

Everything is on GitHub at `https://github.com/KrolKubaV/my-blog`. Push to deploy.

### Adding a blog post

Run the script:
```
bash new-post.sh
```
It asks section, subsection, title — creates the file automatically. Then edit the file, write your content, and `git push`.

### Adding a Project Euler solved problem

Just append a line to `src/data/project-euler.txt`:
```
999: 2026-07-26 17:00:00,
```
Or run:
```
bash new-solved.sh
```

### Changing navigation / section order

Edit `src/config.ts`.

### Local preview

```
astro dev --background
astro dev stop
astro dev status
astro dev logs
```

### Key files

| What | File |
|---|---|
| Solved PE problems | `src/data/project-euler.txt` |
| Blog posts | `src/content/notes/*/*.mdx`, `src/content/puzzles/*/*.mdx`, `src/content/misc/*.mdx` |
| Navigation & sections | `src/config.ts` |
| Header (your name) | `src/components/Header.astro` |
| Project Euler page | `src/pages/puzzles/project-euler.astro` |
| Homepage | `src/pages/index.astro` |
| Styles | `src/styles/global.css` |
