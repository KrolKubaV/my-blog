#!/usr/bin/env bash
# Usage: bash new-post.sh
# Creates a new MDX post with proper frontmatter

set -e

echo "=== Create New Post ==="
echo

# Section
echo "Section:"
echo "  1) Notes"
echo "  2) Puzzles"
echo "  3) Misc"
read -p "Choose [1-3]: " section_num

case $section_num in
  1) folder="notes"; section="notes";;
  2) folder="puzzles"; section="puzzles";;
  3)
    read -p "Title: " title
    slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g; s/[^a-z0-9-]//g')
    cat > "src/content/misc/$slug.mdx" <<EOF
---
title: "$title"
description: ""
pubDate: $(date +%Y-%m-%d)
---
EOF
    echo "Created src/content/misc/$slug.mdx"
    exit 0;;
  *) echo "Invalid"; exit 1;;
esac

# Subsection
echo "Subsections for $section:"
case $section in
  notes)
    echo "  1) Blackjack"
    echo "  2) Mathematics of Casino Games"
    echo "  3) Measure Theory"
    echo "  4) Game Theoretic Probability"
    echo "  5) ML in Finance";;
  puzzles)
    echo "  1) Mathematical Competitions"
    echo "  2) Jane Street Puzzles"
    echo "  3) Project Euler"
    echo "  4) Miscellaneous";;
esac
read -p "Choose: " sub_num

case "$section-$sub_num" in
  notes-1) sub="blackjack"; sublabel="blackjack";;
  notes-2) sub="casino-games"; sublabel="casino-games";;
  notes-3) sub="measure-theory"; sublabel="measure-theory";;
  notes-4) sub="game-theoretic-probability"; sublabel="game-theoretic-probability";;
  notes-5) sub="ml-in-finance"; sublabel="ml-in-finance";;
  puzzles-1) sub="mathematical-competitions"; sublabel="mathematical-competitions";;
  puzzles-2) sub="jane-street"; sublabel="jane-street";;
  puzzles-3) sub="project-euler"; sublabel="project-euler";;
  puzzles-4) sub="miscellaneous"; sublabel="miscellaneous";;
  *) echo "Invalid"; exit 1;;
esac

read -p "Title: " title
slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g; s/[^a-z0-9-]//g')

dir="src/content/$folder/$sub"
mkdir -p "$dir"

cat > "$dir/$slug.mdx" <<EOF
---
title: "$title"
description: ""
pubDate: $(date +%Y-%m-%d)
subsection: "$sublabel"
---
EOF

echo "Created $dir/$slug.mdx"
