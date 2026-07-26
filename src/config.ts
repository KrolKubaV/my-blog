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
      { label: 'Blackjack', slug: 'blackjack', description: 'Card counting, optimal strategy, and the mathematics of beating the house.' },
      { label: 'Mathematics of Casino Games', slug: 'casino-games', description: 'Expected values, house edges, and probability behind gambling.' },
      { label: 'Measure Theory', slug: 'measure-theory', description: 'The formal foundations of integration and probability.' },
      { label: 'Game Theoretic Probability', slug: 'game-theoretic-probability', description: 'Probability through the lens of prediction and betting.' },
      { label: 'ML in Finance', slug: 'ml-in-finance', description: 'Neural networks, deep learning, and quantitative models.' },
    ],
  },
  'puzzles': {
    label: 'Puzzles',
    href: '/puzzles/',
    subsections: [
      { label: 'Mathematical Competitions', slug: 'mathematical-competitions', description: 'Problems from the IMO, Putnam, and other contests.' },
      { label: 'Jane Street Puzzles', slug: 'jane-street', description: 'Monthly puzzles from Jane Street.' },
      { label: 'Project Euler', slug: 'project-euler', description: 'Computational problems requiring mathematical insight.' },
      { label: 'Miscellaneous', slug: 'miscellaneous', description: 'Logic puzzles, riddles, and brain teasers.' },
    ],
  },
  'misc': {
    label: 'Misc',
    href: '/misc/',
    subsections: [],
  },
};
