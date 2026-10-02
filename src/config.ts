// Site-wide settings: your name, links, navigation, note topics and order.
// Posts themselves never need to be registered here; they appear by
// existing in src/content/.

export const SITE = {
  title: 'Jakub Adamek',
  description: 'Mathematics, probability, puzzles, and things I build.',
  author: 'Jakub Adamek',
};

// Links shown in the footer, e.g. { label: 'Email', href: 'mailto:...' }.
export const LINKS: { label: string; href: string }[] = [];

export const NAV = [
  { label: 'Projects', href: '/projects/' },
  { label: 'Notes', href: '/notes/' },
  { label: 'Puzzles', href: '/puzzles/' },
  { label: 'Other', href: '/other/' },
];

// Short descriptions on the site. All hidden for now; set any to true to show
// it again. The texts themselves stay: INTROS and NOTE_TOPICS below, and the
// `description:` line of each post.
export const SHOW = {
  sectionIntros: false, // the line under "Projects", "Notes", "Puzzles", "Other"
  topicDescriptions: false, // the line under each note topic, e.g. under "Blackjack"
  postDescriptions: false, // a post's description, in lists and under its title
};

// The line under each section's heading (shown if SHOW.sectionIntros).
export const INTROS = {
  projects: 'Things I have built.',
  notes: 'Notes on topics I am studying, written as I go.',
  puzzles: 'Competition problems, puzzles, and my Project Euler progress.',
  other: 'Everything else.',
};

// Note topics, in display order. Each topic is a folder in src/content/notes/.
// A folder that is not listed here still appears (at the end, named after
// the folder), so this list only matters for nice names and order.
export const NOTE_TOPICS = [
  { slug: 'blackjack', label: 'Blackjack', description: 'Card counting, optimal strategy, and the mathematics of beating the house.' },
  { slug: 'casino-games', label: 'Mathematics of Casino Games', description: 'Expected values, house edges, and probability behind gambling.' },
  { slug: 'game-theoretic-probability', label: 'Game Theoretic Probability and Finance', description: 'Probability through the lens of prediction and betting.' },
  { slug: 'combinatorial-game-theory', label: 'Combinatorial Game Theory', description: 'Nim, minimax, and the mathematics of perfect-information games.' },
  { slug: 'ml-in-finance', label: 'ML in Finance', description: 'Neural networks, deep learning, and quantitative models.' },
];

// Optional: the reading order of notes inside a topic (file names without
// .mdx). Notes not listed come after the listed ones, oldest first.
export const NOTE_ORDER: Record<string, string[]> = {
  'blackjack': ['resources', 'different-rules', 'deriving-basic-strategy'],
  'casino-games': ['resources', 'expected-value-roulette'],
  'game-theoretic-probability': ['resources', 'martingales'],
  'combinatorial-game-theory': ['resources'],
  'ml-in-finance': ['resources', 'neural-option-pricing'],
};

// Your Project Euler username (for the progress badge).
export const PROJECT_EULER_USER = 'KrolKubaV';
