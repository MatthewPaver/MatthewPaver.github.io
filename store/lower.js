/* The approved rows draw once on entry. No script or reduced motion keeps the finished page. */
(() => {
  const lower = document.querySelector('[data-lower]');
  if (!lower) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const rows = [...lower.querySelectorAll('[data-work-row]')];
  const paths = [...lower.querySelectorAll('[data-strands] path')];
  const steps = lower.querySelector('[data-method]');
  let observer, frame = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  function paint() {
    frame = 0;
    if (reduce.matches || document.hidden) return;
    const box = lower.getBoundingClientRect();
    const progress = clamp((innerHeight * .9 - box.top) / box.height);
    paths.forEach(path => {
      path.setAttribute('pathLength', '1');
      path.style.strokeDasharray = '1';
      path.style.strokeDashoffset = String(1 - progress);
    });
    if (steps) {
      const bounds = steps.getBoundingClientRect();
      steps.style.setProperty('--p', String(clamp((innerHeight * .75 - bounds.top) / bounds.height)));
    }
  }
  const schedule = () => { if (!frame && !reduce.matches && !document.hidden) frame = requestAnimationFrame(paint); };
  function finishRows() {
    observer?.disconnect();
    rows.forEach(row => row.classList.remove('is-armed'));
    paths.forEach(path => { path.style.strokeDasharray = ''; path.style.strokeDashoffset = ''; });
    steps?.style.setProperty('--p', '1');
    // Cancel an in-flight transition when the preference changes.
    lower.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
  }
  if (!reduce.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-drawn');
        observer.unobserve(entry.target);
      });
    }, { threshold: .1 });
    rows.forEach(row => {
      if (row.getBoundingClientRect().top < innerHeight * .7) return;
      row.classList.add('is-armed');
      observer.observe(row);
    });
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    schedule();
  }
  reduce.addEventListener('change', () => { if (reduce.matches) finishRows(); });
  const video = lower.querySelector('[data-row-video]');
  // Playback is always user initiated. Leaving the page never starts it again.
  if (video) {
    document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    }).observe(video);
  }
})();
