import assert from "node:assert/strict";

const hiddenProjects = ["NewCo", "Architexa", "Happening", "Paper Trading", "AI Study Companion", "Smart Job Market", "University of Liverpool"];

export function assertPublicCatalogueText({ projectContent, siteContent }) {
  for (const name of hiddenProjects) {
    // The institution is valid biography; its retired repository is not a project.
    const content = name === "University of Liverpool" ? projectContent : `${projectContent}${siteContent}`;
    assert.ok(!content.includes(name),
      `Private or removed work must not appear in the public catalogue: ${name}`);
  }
}
