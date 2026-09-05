import { readCatalogueState, catalogueHref } from '../catalogue-state.js';

const controls = document.querySelector('[data-catalogue-controls]');
const items = [...document.querySelectorAll('[data-catalogue-item]')];
const search = document.querySelector('[data-catalogue-search]');
const subject = document.querySelector('[data-catalogue-subject]');
const mode = document.querySelector('[data-catalogue-mode]');
const filters = [...document.querySelectorAll('[data-work-filter]')];
const count = document.querySelector('[data-catalogue-count]');
const empty = document.querySelector('[data-catalogue-empty]');
const templates = document.querySelector('#templates');
let state = readCatalogueState(location.search);

function render() {
  search.value = state.q;
  subject.value = state.category;
  mode.value = state.mode;
  for (const button of filters) button.setAttribute('aria-pressed', String(button.dataset.workFilter === state.mode));
  let projects = 0;
  let patterns = 0;
  const query = state.q.trim().toLocaleLowerCase('en-GB');
  for (const item of items) {
    const modeMatches = state.mode === 'all' || item.dataset.mode.split(' ').includes(state.mode);
    const subjectMatches = state.category === 'all' || item.dataset.category.split(' ').includes(state.category);
    const text = [item.textContent, item.dataset.problem, item.dataset.solves, item.dataset.proof].filter(Boolean).join(' ').toLocaleLowerCase('en-GB');
    item.hidden = !(modeMatches && subjectMatches && (!query || text.includes(query)));
    if (!item.hidden) item.classList.contains('template-row') ? patterns++ : projects++;
  }
  count.textContent = `${projects} ${projects === 1 ? 'project' : 'projects'} and ${patterns} ${patterns === 1 ? 'pattern' : 'patterns'}`;
  empty.hidden = projects + patterns > 0;
  templates.hidden = patterns === 0;
  document.querySelector('[data-catalogue-grid]').hidden = projects === 0;
  for (const link of document.querySelectorAll('a[href*="preview.html?"]')) {
    const url = new URL(link.href);
    if (url.origin !== location.origin || url.pathname !== '/preview.html') continue;
    url.searchParams.set('returnTo', catalogueHref(state));
    link.href = `${url.pathname}${url.search}${url.hash}`;
  }
}

function change(next, replace = false) {
  state = next;
  history[replace ? 'replaceState' : 'pushState'](null, '', catalogueHref(state));
  render();
}

search.addEventListener('input', () => change({ ...state, q: search.value }, true));
subject.addEventListener('change', () => change({ ...state, category: subject.value }));
mode.addEventListener('change', () => change({ ...state, mode: mode.value }));
filters.forEach((button) => button.addEventListener('click', () => change({ ...state, mode: button.dataset.workFilter })));
const patternJump = document.querySelector('[data-pattern-jump]');
patternJump.href = catalogueHref({ mode:'pattern', category:'all', q:'' });
document.querySelectorAll('[data-catalogue-clear]').forEach((button) => button.addEventListener('click', () => {
  change({ mode:'all', category:'all', q:'' });
  search.focus();
}));
function restore() { state = readCatalogueState(location.search); render(); }
window.addEventListener('popstate', restore);
window.addEventListener('pageshow', restore);
controls.hidden = false;
render();
