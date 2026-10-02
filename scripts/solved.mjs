#!/usr/bin/env node
// `npm run solved 602 143`: mark Project Euler problems as solved.
// Any number of problems at once; already-listed ones and numbers that
// aren't real problems are skipped.

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { EULER_FILE, OFFLINE_LIMIT, fetchProblemCount, readSolved } from '../src/lib/project-euler.mjs';

/** Keeps only numbers that are real problems; explains the rest. */
export async function checkIds(ids) {
  const total = await fetchProblemCount();
  if (total === null) console.log("(Couldn't reach projecteuler.net to check the numbers.)");
  return ids.filter(id => {
    if (id <= (total ?? OFFLINE_LIMIT)) return true;
    console.log(`#${id} isn't a Project Euler problem${total ? ` (there are ${total})` : ''}. Skipped.`);
    return false;
  });
}

/** Adds problems to the top of the list (newest first). Returns what was added. */
export function addSolved(ids) {
  const known = readSolved();
  const added = [];
  for (const id of ids) {
    if (known.has(id) || added.includes(id)) console.log(`#${id} is already in the list.`);
    else added.push(id);
  }
  if (!added.length) return added;

  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${d.toTimeString().slice(0, 8)}`;
  // The last one typed counts as the most recent.
  const fresh = [...added].reverse().map(id => `${id}##${stamp}\n`).join('');
  fs.writeFileSync(EULER_FILE, fresh + fs.readFileSync(EULER_FILE, 'utf8').trimStart());
  console.log(`Added ${added.map(id => `#${id}`).join(', ')}. Solved so far: ${known.size + added.length}.`);
  return added;
}

export function parseIds(text) {
  const words = String(text).split(/[\s,]+/).filter(Boolean);
  const bad = words.filter(w => !/^\d+$/.test(w) || Number(w) < 1);
  if (bad.length) throw new Error(`Not problem numbers: ${bad.join(', ')}`);
  return words.map(Number);
}

// Run directly: npm run solved 602 143
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2).join(' ');
  if (!args) {
    console.log('Usage: npm run solved 602 143   (one or more problem numbers)');
    process.exit(1);
  }
  try {
    addSolved(await checkIds(parseIds(args)));
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}
