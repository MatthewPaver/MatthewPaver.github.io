import test from 'node:test';
import assert from 'node:assert/strict';
import { readCatalogueState, catalogueHref, safeCatalogueReturn } from '../store/catalogue-state.js';

test('catalogue URLs round-trip the supported state', () => {
  const state = { mode:'browser', category:'decision', q:'ProjectLens & evidence' };
  const url = new URL(catalogueHref(state), 'https://portfolio.example');
  assert.deepEqual(readCatalogueState(url.search), state);
  assert.equal(url.hash, '#catalogue');
});

test('unknown values and oversized search strings do not enter the filter state', () => {
  assert.deepEqual(readCatalogueState('?mode=private&category=secret&q=' + 'x'.repeat(140)), { mode:'all', category:'all', q:'x'.repeat(120) });
  assert.equal(catalogueHref({ mode:'all', category:'all', q:'  ' }), '/work/#catalogue');
});

test('return links only navigate to this site’s catalogue and strip unrelated parameters', () => {
  const origin = 'https://portfolio.example';
  for (const value of ['https://evil.example/work/', '//evil.example/work/', 'javascript:alert(1)', '/admin/', 'https://portfolio.example.evil.example/work/']) {
    assert.equal(safeCatalogueReturn(value, origin), '/work/');
  }
  assert.equal(safeCatalogueReturn('/work/index.html?mode=pattern&q=Kafka&tracking=ignore#other', origin), '/work/?mode=pattern&q=Kafka#catalogue');
});
