## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Adding Content

### New blog post

Run the interactive script:
```
bash new-post.sh
```
It will ask for section, subsection, and title, then create the MDX file with proper frontmatter. Edit the file to add your content, then `git push` to deploy.

### New Project Euler solved problem

Run:
```
bash new-solved.sh
```
Enter the problem number and date. It updates `src/data/project-euler.ts` automatically.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
