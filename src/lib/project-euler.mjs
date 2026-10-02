// Project Euler progress: the solved list in src/data/project-euler.txt plus
// the number of problems on projecteuler.net. Used by the Project Euler pages
// and by `npm run solved` (scripts/solved.mjs).
import fs from 'node:fs';

export const EULER_FILE = 'src/data/project-euler.txt';

// Used when projecteuler.net can't be reached. Bump it now and then; the live
// count is fetched automatically whenever possible.
export const FALLBACK_TOTAL = 1011;
// Offline, solved numbers up to this are trusted (problems released since the
// last bump), but not typos like 69420.
export const OFFLINE_LIMIT = FALLBACK_TOTAL + 100;

/** The solved list, one line per problem (`602##2026-09-26 15:38:50`), as id → date solved. */
export function readSolved() {
  /** @type {Map<number, Date>} */
  const solved = new Map();
  for (const line of fs.readFileSync(EULER_FILE, 'utf8').split('\n')) {
    const [id, date = ''] = line.trim().split('##');
    if (/^\d+$/.test(id)) solved.set(Number(id), new Date(`${date.trim().replace(' ', 'T')}Z`));
  }
  return solved;
}

/** How many problems exist right now, or null if projecteuler.net can't be reached. */
export async function fetchProblemCount() {
  try {
    const res = await fetch('https://projecteuler.net/minimal=problems;csv', { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const rows = (await res.text()).trim().split('\n').length - 1; // minus the header row
    return rows > 0 ? rows : null;
  } catch {
    return null;
  }
}

/** @type {ReturnType<typeof load> | undefined} */
let cached;

/** Everything the Project Euler pages show, computed once per build. */
export function getEulerStats() {
  return (cached ??= load());
}

async function load() {
  const dates = readSolved();
  const live = await fetchProblemCount();
  if (live === null) console.warn(`[project-euler] couldn't fetch the problem count, using ${FALLBACK_TOTAL}.`);
  const total = live ?? Math.max(FALLBACK_TOTAL, ...[...dates.keys()].filter(id => id <= OFFLINE_LIMIT));

  const time = (/** @type {number} */ id) => dates.get(id)?.valueOf() || 0; // undated: last
  const recent = [...dates.keys()].filter(id => id <= total).sort((a, b) => time(b) - time(a)); // newest first
  return {
    solved: new Set(recent),
    recent,
    total,
    count: recent.length,
    percent: Math.round((recent.length / total) * 100),
  };
}
