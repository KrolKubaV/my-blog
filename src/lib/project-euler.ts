import fs from 'node:fs';

// Used when projecteuler.net can't be reached during a build. Bump it now
// and then; the live count is fetched automatically whenever possible.
const FALLBACK_TOTAL = 1011;

export type Solve = { id: number; date: Date };

export type EulerStats = {
  solved: Map<number, Date>;
  recent: Solve[]; // newest first
  total: number;
  count: number;
  percent: number;
  level: number; // Project Euler awards a level per 25 problems solved
};

let cached: Promise<EulerStats> | undefined;

export function getEulerStats(): Promise<EulerStats> {
  cached ??= load();
  return cached;
}

async function load(): Promise<EulerStats> {
  // One line per problem: `123##2026-08-21 14:00:00`
  const raw = fs.readFileSync('src/data/project-euler.txt', 'utf-8');
  const solved = new Map<number, Date>();
  for (const line of raw.split('\n')) {
    const [id, date] = line.trim().split('##');
    if (!id) continue;
    solved.set(Number(id), new Date(`${date?.trim().replace(' ', 'T')}Z`));
  }

  const total = Math.max(await fetchTotal(), ...solved.keys());
  const count = solved.size;
  const recent = [...solved]
    .map(([id, date]) => ({ id, date }))
    .filter(s => !isNaN(s.date.valueOf()))
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());

  return {
    solved,
    recent,
    total,
    count,
    percent: Math.round((count / total) * 100),
    level: Math.floor(count / 25),
  };
}

async function fetchTotal(): Promise<number> {
  try {
    const res = await fetch('https://projecteuler.net/minimal=problems;csv', {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = (await res.text()).trim().split('\n').length - 1;
    if (rows > 0) return rows;
  } catch (e) {
    console.warn(`[project-euler] using fallback total (${FALLBACK_TOTAL}):`, (e as Error).message);
  }
  return FALLBACK_TOTAL;
}
