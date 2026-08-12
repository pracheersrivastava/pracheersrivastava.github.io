/**
 * One-shot scroll reveal. Matched elements fade and rise into place the first
 * time they enter the viewport, then stop being observed so nothing competes
 * with the WebGL render loop for main-thread time.
 *
 * Elements are tagged from here rather than in the markup to keep index.html
 * readable. That happens before anything below the hero is on screen (`main`
 * starts at 200vh, and the boot overlay is still up), so there is no flash.
 *
 * The project cards are deliberately excluded — cardStack.ts drives their
 * transform, and a second one here would fight it.
 */
type Group = { selector: string; stagger?: number };

const GROUPS: Group[] = [
  { selector: "main section > h1" },
  { selector: "main section > hr" },
  { selector: "main section > p" },
  { selector: ".achievement-item", stagger: 110 },
  { selector: ".certification-badge", stagger: 90 },
  { selector: ".contact-card", stagger: 90 },
  { selector: ".see-all-projects" },
];

export default function initReveal() {
  const targets: HTMLElement[] = [];

  for (const group of GROUPS) {
    const found = document.querySelectorAll<HTMLElement>(group.selector);
    found.forEach((el, i) => {
      el.dataset.reveal = "";
      if (group.stagger) el.dataset.revealDelay = String(i * group.stagger);
      targets.push(el);
    });
  }

  if (!targets.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const delay = Number(el.dataset.revealDelay ?? 0);
        window.setTimeout(() => el.classList.add("is-revealed"), delay);
        observer.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
}
