import assert from "node:assert/strict";
import test from "node:test";
import { assertPublicCatalogueText } from "../scripts/catalogue-visibility.mjs";

test("education may name a university without listing its retired repository", () => {
  assert.doesNotThrow(() => assertPublicCatalogueText({
    projectContent: "PolicyLens QuickSupply",
    siteContent: "Education: University of Liverpool",
  }));
});

test("the university repository cannot reappear as a project", () => {
  assert.throws(() => assertPublicCatalogueText({
    projectContent: "University of Liverpool",
    siteContent: "Education: University of Liverpool",
  }), /University of Liverpool/);
});

test("private projects remain forbidden outside the catalogue too", () => {
  assert.throws(() => assertPublicCatalogueText({
    projectContent: "PolicyLens",
    siteContent: "About my NewCo work",
  }), /NewCo/);
});
