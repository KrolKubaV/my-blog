export const SITE = {
  title: 'Jakub Adamek',
  description: 'Personal website — mathematics, puzzles, and more.',
  author: 'Jakub Adamek',
  url: 'https://krolkubav.github.io/my-blog',
};

const BASE = '/my-blog';

export const NAV = [
  { label: 'Home', href: `${BASE}/` },
  { label: 'Maths Notes', href: `${BASE}/maths-notes/` },
  { label: 'Casino Games', href: `${BASE}/casino-games/` },
  { label: 'Puzzles', href: `${BASE}/puzzles/` },
  { label: 'Misc', href: `${BASE}/misc/` },
];

export const SECTIONS = {
  'maths-notes': {
    label: 'Maths Notes',
    href: `${BASE}/maths-notes/`,
    subsections: [
      { label: 'Financial Mathematics', slug: 'financial-mathematics' },
      { label: 'Combinatorial Game Theory', slug: 'combinatorial-game-theory' },
    ],
  },
  'casino-games': {
    label: 'Casino Games',
    href: `${BASE}/casino-games/`,
    subsections: [
      { label: 'Blackjack', slug: 'blackjack' },
    ],
  },
  'puzzles': {
    label: 'Puzzles',
    href: `${BASE}/puzzles/`,
    subsections: [
      { label: 'Project Euler', slug: 'project-euler' },
      { label: 'Mathematical Competitions', slug: 'mathematical-competitions' },
      { label: 'Jane Street Puzzles', slug: 'jane-street' },
      { label: 'Miscellaneous', slug: 'miscellaneous' },
    ],
  },
  'misc': {
    label: 'Misc',
    href: `${BASE}/misc/`,
    subsections: [],
  },
};
