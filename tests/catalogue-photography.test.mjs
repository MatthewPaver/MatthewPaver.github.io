import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('catalogue photography stays self-hosted, credited and within the added image budget', () => {
  const manifest = JSON.parse(fs.readFileSync('store/assets/photography/sources.json', 'utf8'));
  const html = fs.readFileSync('store/work/index.html', 'utf8');
  assert.equal(manifest.license, 'https://unsplash.com/license');
  assert.equal(manifest.images.length, 3);
  let total = 0;
  for (const image of manifest.images) {
    assert.ok(image.author && image.context && image.width && image.height);
    assert.ok(html.includes(`href="${image.source}"`));
    assert.ok(html.includes(`src="../assets/photography/${image.file}"`));
    const bytes = fs.readFileSync(`store/assets/photography/${image.file}`);
    assert.equal(bytes.readUInt16BE(0), 0xffd8, 'download must be a JPEG, not an error page');
    total += bytes.length;
  }
  assert.ok(total < 600 * 1024, `Photos total ${total} bytes, exceeding the 600 KiB budget`);
  assert.ok(!/<img[^>]+src="https?:/i.test(html), 'catalogue images must not call third-party hosts at runtime');
});
