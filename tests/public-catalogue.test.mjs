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

test("the marketplace contains only entries backed by public repository evidence", () => {
  assert.equal(entries.length, 8);
  for (const entry of entries) {
    assert.doesNotMatch(entry.source, /^status:\s+private$/m, entry.name);
    const repo = entry.source.match(/^repo:\s+https:\/\/github\.com\/([^\s]+)$/m)?.[1];
    const metricsRepo = entry.source.match(/^metricsRepo:\s+([^\s]+)$/m)?.[1];
    assert.ok(repo, `${entry.name} must link to a GitHub repository`);
    assert.equal(metricsRepo, repo, `${entry.name} metrics must use its displayed repository`);
    assert.ok(metrics[metricsRepo], `${entry.name} must have public repository evidence`);
  }
});
