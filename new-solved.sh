#!/usr/bin/env bash
# Usage: bash new-solved.sh
# Adds a newly solved Project Euler problem to the data file

set -e

read -p "Problem number: " num
read -p "Date (YYYY-MM-DD HH:MM:SS) [$(date '+%Y-%m-%d %H:%M:%S')]: " date_input

if [ -z "$date_input" ]; then
  date_val=$(date '+%Y-%m-%d %H:%M:%S')
else
  date_val="$date_input"
fi

file="src/data/project-euler.txt"

if grep -q "^$num##" "$file" 2>/dev/null; then
  echo "Problem $num is already in the file!"
  exit 1
fi

echo "$num##$date_val" >> "$file"
echo "Added problem $num solved on $date_val"
echo "Total solved: $(wc -l < "$file")"
