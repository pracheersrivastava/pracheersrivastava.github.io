/**
 * Depth for the sticky project cards: as the next card slides up and covers
 * the current one, the covered card scales down and dims, so the stack reads
 * as receding into the page rather than as flat sheets of paper.
 *
 * Driven off a passive scroll listener throttled to one rAF, because the
 * WebGL scene already owns the animation frame budget.
 */
export default function initCardStack() {
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>("#cards .card")
  );
  if (cards.length < 2) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const contents = cards.map(
    (c) => c.querySelector<HTMLElement>(".card-content") as HTMLElement
  );
  if (contents.some((c) => !c)) return;

  // Matches --card-top-offset in cards.css.
  const STACK_OFFSET = 20;
  const MAX_SCALE_DROP = 0.08;
  const MAX_DIM = 0.28;

  let queued = false;

  function clear() {
    for (const el of contents) {
      el.style.transform = "";
      el.style.filter = "";
    }
  }

  function update() {
    queued = false;

    // Below 900px the cards are full-width blocks, not a stack.
    if (window.innerWidth <= 900) {
      clear();
      return;
    }

    for (let i = 0; i < cards.length - 1; i++) {
      const rect = cards[i].getBoundingClientRect();
      const next = cards[i + 1].getBoundingClientRect();

      const range = rect.height - STACK_OFFSET;
      if (range <= 0) continue;

      const raw = (rect.top + rect.height - next.top) / range;
      const covered = raw < 0 ? 0 : raw > 1 ? 1 : raw;

      contents[i].style.transform = `scale(${(
        1 -
        covered * MAX_SCALE_DROP
      ).toFixed(4)})`;
      contents[i].style.filter = `brightness(${(1 - covered * MAX_DIM).toFixed(
        3
      )})`;
    }

    const last = contents[contents.length - 1];
    last.style.transform = "";
    last.style.filter = "";
  }

  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}
