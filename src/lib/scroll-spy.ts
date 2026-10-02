// Highlights the contents link of the section being read: the last heading
// that has scrolled past the top quarter of the window. Used by the notes
// sidebar (NoteNav) and "On this page" (Toc).
export function scrollSpy(links: HTMLAnchorElement[]) {
  if (!links.length) return;
  const targetOf = (a: HTMLAnchorElement) => decodeURIComponent(a.hash.slice(1));
  const targets = [...new Set(links.map(targetOf))].map(id => document.getElementById(id));
  let queued = false;
  const update = () => {
    queued = false;
    let current: string | undefined;
    for (const t of targets) if (t && t.getBoundingClientRect().top < innerHeight * 0.25) current = t.id;
    for (const a of links) a.classList.toggle('active', targetOf(a) === current);
  };
  addEventListener('scroll', () => queued || ((queued = true), requestAnimationFrame(update)), { passive: true });
  update();
}
