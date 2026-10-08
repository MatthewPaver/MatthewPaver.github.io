import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("installed portfolio opens at the public site root", () => {
  const manifest = JSON.parse(readFileSync(new URL("../store/manifest.webmanifest", import.meta.url), "utf8"));
  assert.equal(manifest.start_url, "/");
  assert.equal(manifest.scope, "/");
});
