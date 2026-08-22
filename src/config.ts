export const SITE = {
  title: 'Jakub Adamek',
  description: 'Personal website — mathematics, puzzles, and more.',
  author: 'Jakub Adamek',
  url: 'https://krolkubav.github.io/my-blog',
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Notes', href: '/notes/' },
  { label: 'Puzzles', href: '/puzzles/' },
  { label: 'Miscellaneous', href: '/misc/' },
];

export const SECTIONS = {
  'notes': {
    label: 'Notes',
    href: '/notes/',
    subsections: [
      { label: 'Blackjack', slug: 'blackjack' },
      { label: 'Mathematics of Casino Games', slug: 'casino-games' },
      { label: 'Game Theoretic Probability and Finance', slug: 'game-theoretic-probability' },
      { label: 'Combinatorial Game Theory', slug: 'combinatorial-game-theory' },
      { label: 'ML in Finance', slug: 'ml-in-finance' },
    ],
  },
  'puzzles': {
    label: 'Puzzles',
    href: '/puzzles/',
    subsections: [
      { label: 'Project Euler', slug: 'project-euler' },
      { label: 'Mathematical Competitions', slug: 'mathematical-competitions' },
      { label: 'Jane Street Puzzles', slug: 'jane-street' },
      { label: 'Miscellaneous', slug: 'miscellaneous' },
    ],
  },
  'misc': {
    label: 'Misc',
    href: '/misc/',
    subsections: [],
  },
};

// Article ordering per listing page. Keys are '<collection>/<subsection>'
// ('misc' has no subsection); values list article slugs in display order,
// relative to the subsection folder. Articles not listed appear after the
// listed ones, sorted by date (newest first).
export const POST_ORDER: Record<string, string[]> = {
  'notes/blackjack': ['resources', 'different-rules', 'deriving-basic-strategy'],
  'notes/casino-games': ['resources', 'expected-value-roulette'],
  'notes/game-theoretic-probability': ['resources', 'martingales'],
  'notes/combinatorial-game-theory': ['resources'],
  'notes/ml-in-finance': ['resources', 'neural-option-pricing'],
  'puzzles/mathematical-competitions': [
    'imo/imo-2026',
    'imo/imo-2025',
    'polish-olympiad/2026-third-round',
    'polish-olympiad/2026-second-round',
  ],
  'puzzles/jane-street': ['dropped-coin'],
  'puzzles/miscellaneous': ['blue-eyes'],
  'misc': ['my-running-routes'],
};

export function postRank(key: string, id: string): number {
  const list = POST_ORDER[key];
  if (!list) return Number.MAX_SAFE_INTEGER;
  const slash = key.indexOf('/');
  const prefix = slash === -1 ? '' : key.slice(slash + 1) + '/';
  const rel = id.startsWith(prefix) ? id.slice(prefix.length) : id;
  const i = list.indexOf(rel);
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
}
