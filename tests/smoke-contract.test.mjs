import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { inspectPublicPages } from '../scripts/portfolio-smoke-contract.mjs';

const home = fs.readFileSync(new URL('../store/index.html', import.meta.url), 'utf8');
const catalogue = fs.readFileSync(new URL('../store/work/index.html', import.meta.url), 'utf8');

test('live smoke recognises the current homepage and separate catalogue', () => {
  const failures = inspectPublicPages(home, catalogue).filter((check) => !check.pass);
  assert.deepEqual(failures, []);
});

test('live smoke rejects a missing catalogue entry, stale homepage and private cards', () => {
  const changed = catalogue.replace('data-slug="projectlens"', 'data-slug="missing"')
    + '<article data-status="Private"></article>';
  const failures = inspectPublicPages('<html>Old homepage</html>', changed)
    .filter((check) => !check.pass).map((check) => check.name);
  assert.ok(failures.includes('homepage links to all projects'));
  assert.ok(failures.includes('catalogue includes projectlens'));
  assert.ok(failures.includes('no private project cards'));
});
