import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import test from "node:test";

const contentDir = new URL("../src/content/apps/", import.meta.url);
const metrics = JSON.parse(
  readFileSync(new URL("../src/data/github-metrics.json", import.meta.url), "utf8"),
);
const entries = readdirSync(contentDir)
  .filter((name) => name.endsWith(".md"))
  .map((name) => ({
    name: basename(name, ".md"),
    source: readFileSync(join(contentDir.pathname, name), "utf8"),
  }));

test("the portfolio contains only entries backed by public repository evidence", () => {
  assert.equal(entries.length, 8);
  let featured = 0;
  for (const entry of entries) {
    assert.doesNotMatch(entry.source, /^status:\s+private$/m, entry.name);
    assert.match(entry.source, /^portfolioRole:\s+.+$/m, `${entry.name} must state its portfolio role`);
    assert.match(entry.source, /^audience:\s+.+$/m, `${entry.name} must name its audience`);
    if (/^featured:\s+true$/m.test(entry.source)) featured += 1;
    const repo = entry.source.match(/^repo:\s+https:\/\/github\.com\/([^\s]+)$/m)?.[1];
    const metricsRepo = entry.source.match(/^metricsRepo:\s+([^\s]+)$/m)?.[1];
    assert.ok(repo, `${entry.name} must link to a GitHub repository`);
    assert.equal(metricsRepo, repo, `${entry.name} metrics must use its displayed repository`);
    assert.ok(metrics[metricsRepo], `${entry.name} must have public repository evidence`);
  }
  assert.equal(featured, 3, "the homepage must lead with exactly three selected projects");
});
