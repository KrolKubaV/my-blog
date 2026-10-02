#!/usr/bin/env node
// `npm run new`: create a post, or log a solved Project Euler problem.
// Asks a few questions, writes the file with everything filled in, and
// opens it in VS Code.

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { spawn, spawnSync } from 'node:child_process';
import { slugify } from '../src/lib/slugify.mjs';
import { addSolved, checkIds, parseIds } from './solved.mjs';

const CONTENT = 'src/content';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const lines = rl[Symbol.asyncIterator](); // queues answers, so pasted/piped input works too
const bold = s => `\x1b[1m${s}\x1b[0m`;
const dim = s => `\x1b[2m${s}\x1b[0m`;

async function prompt(text) {
  process.stdout.write(text);
  const { value, done } = await lines.next();
  if (done) process.exit(0);
  return value.trim();
}

async function ask(question, fallback = '') {
  const hint = fallback ? dim(` (${fallback})`) : '';
  return (await prompt(`${question}${hint}: `)) || fallback;
}

async function choose(question, options) {
  console.log(`\n${bold(question)}`);
  options.forEach((o, i) => console.log(`  ${i + 1}) ${o}`));
  for (;;) {
    const n = Number(await prompt('> '));
    if (Number.isInteger(n) && n >= 1 && n <= options.length) return n - 1;
    console.log(`Type a number from 1 to ${options.length}.`);
  }
}

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const quote = s => `"${s.replace(/"/g, '\\"')}"`;

function frontmatter({ title, description, tags, extra = [] }) {
  const lines = ['---', `title: ${quote(title)}`];
  if (description) lines.push(`description: ${quote(description)}`);
  lines.push(`date: ${today()}`);
  if (tags?.length) lines.push(`tags: [${tags.join(', ')}]`);
  lines.push(...extra, '---', '');
  return lines.join('\n');
}

// Tags already used in a section, so the same spelling gets reused.
function existingTags(section) {
  const dir = path.join(CONTENT, section);
  const tags = new Map();
  for (const file of fs.readdirSync(dir, { recursive: true })) {
    if (!/\.mdx?$/.test(file)) continue;
    const match = fs.readFileSync(path.join(dir, file), 'utf8').match(/^tags:\s*\[(.*)\]/m);
    for (const tag of match?.[1].split(',') ?? []) {
      const t = tag.trim().replace(/^["']|["']$/g, '');
      if (t) tags.set(t.toLowerCase(), t);
    }
  }
  return tags;
}

async function askTags(section) {
  const known = existingTags(section);
  if (known.size) console.log(dim(`Existing tags: ${[...known.values()].join(', ')}`));
  const answer = await ask('Tags, comma separated (new ones are fine)');
  return answer
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
    .map(t => known.get(t.toLowerCase()) ?? t);
}

function write(file, text, url) {
  if (fs.existsSync(file)) {
    console.log(`\n${file} already exists. Pick another title.`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
  console.log(`\n${bold('Created')} ${file}`);
  console.log(`Preview: http://localhost:4321${url}  ${dim('(start the preview with: npm run dev)')}`);
  console.log(dim('When you are happy with it: git add -A && git commit -m "..." && git push'));
  // Open in VS Code when available.
  if (spawnSync('code', ['--version'], { stdio: 'ignore' }).status === 0) {
    spawn('code', [file], { stdio: 'ignore', detached: true }).unref();
  }
}

const HELP = '{/* Boxes, maths and code cells: see the Style Guide post (npm run dev → /other/style-guide/). */}';

async function newProject() {
  const title = await ask('Project name');
  const description = await ask('One line about it (optional)');
  const repo = await ask('Link to the code (optional)');
  const slug = slugify(title);
  const extra = [];
  if (repo) extra.push(`repo: ${repo}`);
  extra.push('# cover: ./' + slug + '.jpg   ← put a picture next to this file and remove the #');
  const body = `What it is, why you built it, and how it works.

## How it works

${HELP}
`;
  write(path.join(CONTENT, 'projects', `${slug}.mdx`), frontmatter({ title, description, extra }) + '\n' + body, `/projects/${slug}/`);
}

async function newNote() {
  const dir = path.join(CONTENT, 'notes');
  const topics = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
  const i = await choose('Which topic?', [...topics, '+ New topic']);
  let topic = topics[i];
  if (!topic) {
    topic = slugify(await ask('New topic name'));
    console.log(dim(`Optional: give it a nice name and description in src/config.ts (NOTE_TOPICS).`));
  }
  const title = await ask('Title');
  const description = await ask('One line about it (optional)');
  const slug = slugify(title);
  const body = `Start writing here.

## First section

${HELP}
`;
  write(path.join(dir, topic, `${slug}.mdx`), frontmatter({ title, description }) + '\n' + body, `/notes/${topic}/${slug}/`);
}

async function newPuzzle() {
  const title = await ask('Title, e.g. "IMO 2027" or "Jane Street: October 2026"');
  const description = await ask('One line about it (optional)');
  const tags = await askTags('puzzles');
  const slug = slugify(title);
  const body = `<Problem numbered={false}>
State the puzzle here.
</Problem>

<Solution>
Your solution. Leave this empty to show "Solution coming soon".
</Solution>

${HELP}
`;
  write(path.join(CONTENT, 'puzzles', `${slug}.mdx`), frontmatter({ title, description, tags }) + '\n' + body, `/puzzles/${slug}/`);
}

async function newOther() {
  const title = await ask('Title');
  const description = await ask('One line about it (optional)');
  const slug = slugify(title);
  write(path.join(CONTENT, 'other', `${slug}.mdx`), frontmatter({ title, description }) + '\nStart writing here.\n', `/other/${slug}/`);
}

async function solvedEuler() {
  const answer = await ask('Which problems did you solve? (numbers, e.g. 602 143)');
  try {
    addSolved(await checkIds(parseIds(answer)));
  } catch (e) {
    console.log(e.message);
  }
}

const actions = [
  ['Project', newProject],
  ['Note', newNote],
  ['Puzzle', newPuzzle],
  ['Other post', newOther],
  ['Solved Project Euler problem', solvedEuler],
];

try {
  const i = await choose('What do you want to add?', actions.map(a => a[0]));
  await actions[i][1]();
} finally {
  rl.close();
}
