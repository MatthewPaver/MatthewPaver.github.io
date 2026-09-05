export const MODES = ['all', 'browser', 'local', 'case', 'pattern'];
export const SUBJECTS = ['all', 'decision', 'product', 'data', 'analytics', 'experiment'];

export function readCatalogueState(search) {
  const params = new URLSearchParams(search);
  return {
    mode: MODES.includes(params.get('mode')) ? params.get('mode') : 'all',
    category: SUBJECTS.includes(params.get('category')) ? params.get('category') : 'all',
    q: (params.get('q') || '').slice(0, 120),
  };
}

export function catalogueHref(state) {
  const params = new URLSearchParams();
  if (MODES.includes(state.mode) && state.mode !== 'all') params.set('mode', state.mode);
  if (SUBJECTS.includes(state.category) && state.category !== 'all') params.set('category', state.category);
  if (state.q?.trim()) params.set('q', state.q.slice(0, 120));
  return `/work/${params.size ? `?${params}` : ''}#catalogue`;
}

// A return link is navigation within the catalogue, never an arbitrary redirect.
export function safeCatalogueReturn(raw, origin) {
  try {
    const url = new URL(raw || '/work/', origin);
    if (url.origin === origin && ['/work/', '/work/index.html'].includes(url.pathname)) {
      return catalogueHref(readCatalogueState(url.search));
    }
  } catch { /* Invalid URLs fall back to the unfiltered catalogue. */ }
  return '/work/';
}
