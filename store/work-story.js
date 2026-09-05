/* Progressive enhancement: every case remains readable without JavaScript. */
(() => {
  const story = document.querySelector('[data-work-story]');
  const tabs = story?.querySelector('[data-case-tabs]');
  const panels = [...(story?.querySelectorAll('.selected-card') ?? [])];
  if (!tabs || !panels.length) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const buttons = panels.map(panel => {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'tab-' + panel.dataset.project;
    button.textContent = panel.querySelector('h3').textContent;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', button.id);
    panel.tabIndex = 0;
    tabs.append(button);
    return button;
  });
  let active = -1;
  let animation;
  function select(index, {focus = false, updateUrl = false, animate = false} = {}) {
    const changed = active !== index;
    active = index;
    animation?.cancel();
    buttons.forEach((button, i) => {
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    story.dataset.activeProject = panels[index].dataset.project;
    if (focus) buttons[index].focus({preventScroll: true});
    if (updateUrl && location.hash !== '#' + panels[index].id) {
      history.pushState(null, '', '#' + panels[index].id);
    }
    if (changed && animate && !motion.matches) {
      animation = panels[index].animate(
        [{opacity: .65, transform: 'translateY(8px)'}, {opacity: 1, transform: 'translateY(0)'}],
        {duration: 240, easing: 'cubic-bezier(.16,1,.3,1)'}
      );
    }
  }
  function indexFromHash() {
    return panels.findIndex(panel => '#' + panel.id === location.hash);
  }
  function restoreHash() {
    const index = indexFromHash();
    if (index !== -1) select(index);
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => select(index, {updateUrl: true, animate: true}));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      select(next, {focus: true, updateUrl: true, animate: true});
    });
  });
  select(Math.max(0, indexFromHash()));
  story.dataset.storyMode = 'tabs';
  tabs.hidden = false;
  window.addEventListener('hashchange', restoreHash);
  window.addEventListener('popstate', restoreHash);
  motion.addEventListener('change', () => { if (motion.matches) animation?.cancel(); });
  // Layout becomes shorter during enhancement; retain existing incoming anchors.
  if (location.hash) requestAnimationFrame(() => {
    document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior: 'instant', block: 'start'});
  });
})();
