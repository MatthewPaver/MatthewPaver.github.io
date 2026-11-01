/* Two coordinated checks, then a resting result. No text waits for animation. */
(() => {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  const toggle = hero.querySelector('[data-check-toggle]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const card = hero.querySelector('[data-hero-card]');
  let animations = [], paused = false, visible = false, finished = false;

  function sync() {
    const running = !paused && visible && !document.hidden && !finished;
    animations.forEach(animation => running ? animation.play() : animation.pause());
    hero.dataset.motion = finished ? 'finished' : running ? 'running' : 'paused';
    toggle.hidden = finished;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Resume animation' : 'Pause animation';
  }
  function finish() {
    finished = true;
    animations.forEach(animation => animation.cancel());
    animations = [];
    card.classList.add('is-found');
    sync();
  }
  function start() {
    if (reduce.matches || !Element.prototype.animate) { finish(); return; }
    card.classList.remove('is-found');
    const timing = { duration: 4800, iterations: 2, fill: 'both' };
    const animate = (element, frames) => {
      const animation = element.animate(frames, timing);
      animation.pause();
      animations.push(animation);
      return animation;
    };
    hero.querySelectorAll('.check-strand').forEach(path => animate(path, [
      { strokeDasharray: '1', strokeDashoffset: '1', offset: 0 },
      { strokeDasharray: '1', strokeDashoffset: '0', offset: .24 },
      { strokeDasharray: '1', strokeDashoffset: '0', offset: 1 },
    ]));
    hero.querySelectorAll('.check-pulse').forEach((path, index) => {
      const from = .25 + index * .16, to = from + .16;
      animate(path, [
        { opacity: 0, strokeDasharray: '.12 .88', strokeDashoffset: '1', offset: 0 },
        { opacity: 0, strokeDashoffset: '1', offset: from },
        { opacity: 1, strokeDashoffset: '1', offset: from + .01 },
        { opacity: 1, strokeDashoffset: '-.12', offset: to },
        { opacity: 0, strokeDashoffset: '-.12', offset: to + .01 },
        { opacity: 0, offset: 1 },
      ]);
    });
    const result = animate(card.querySelector('[data-flag]'), [
      { backgroundColor: '#0d1117', borderColor: '#2d3646', offset: 0 },
      { backgroundColor: '#0d1117', borderColor: '#2d3646', offset: .58 },
      { backgroundColor: '#2a1519', borderColor: '#ff4d5e', offset: .64 },
      { backgroundColor: '#2a1519', borderColor: '#ff4d5e', offset: 1 },
    ]);
    result.onfinish = finish;
    sync();
  }
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  document.addEventListener('visibilitychange', sync);
  reduce.addEventListener('change', () => { if (reduce.matches) finish(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(hero);
  } else visible = true;
  start();
})();
