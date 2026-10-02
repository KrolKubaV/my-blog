// "Jane Street: October 2026" → "jane-street-october-2026". Used for tag
// addresses on the site and for file names in `npm run new`.

/** @param {string} text */
export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // accents: é → e
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
