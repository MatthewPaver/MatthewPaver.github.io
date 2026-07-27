import test from "node:test";
import assert from "node:assert/strict";
import {
  itemMatches,
  normalize,
  parseState,
  stateToSearch,
} from "../src/scripts/catalogue-state.mjs";

test("normalize creates a stable lower-case search string", () => {
  assert.equal(normalize("  ProjectLens   XER  "), "projectlens xer");
});

test("URL state preserves repeated facets and stack", () => {
  const state = parseState("?q=project+evidence&facet=live&facet=public&stack=python&sort=updated");
  assert.equal(state.query, "project evidence");
  assert.deepEqual([...state.facets], ["live", "public"]);
  assert.equal(state.stack, "python");
  assert.equal(state.sort, "updated");
  assert.equal(
    stateToSearch(state),
    "?q=project+evidence&facet=live&facet=public&stack=python&sort=updated",
  );
});

test("status facets are inclusive while search and stack remain narrowing filters", () => {
  const item = {
    search: "output gate python workflow quality",
    kind: "flagship",
    status: "live",
    stack: "python|javascript",
  };
  assert.equal(
    itemMatches(item, {
      query: "workflow quality",
      facets: new Set(["live", "public"]),
      stack: "python",
      sort: "curated",
    }),
    true,
  );
  assert.equal(
    itemMatches(item, {
      query: "mortgage",
      facets: new Set(["live"]),
      stack: "",
      sort: "curated",
    }),
    false,
  );
});
