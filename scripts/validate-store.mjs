import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { assertPublicCatalogueText } from "./catalogue-visibility.mjs";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

function parseCsv(source) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        value += character;
      }
      continue;
    }

    if (character === '"') quoted = true;
    else if (character === ",") {
      row.push(value);
      value = "";
    } else if (character === "\n") {
      row.push(value.replace(/\r$/, ""));
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
    } else value += character;
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  const [headers, ...data] = rows;
  return data.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""])));
}

const indexHtml = read("store/index.html");
const workHtml = read("store/work/index.html");
const previewHtml = read("store/preview.html");
const styles = read("store/styles.css");
const sitemap = read("store/sitemap.xml");
const robots = read("store/robots.txt");
const rows = parseCsv(read("store/app-index.csv"));
const tags = parseCsv(read("store/tags.csv"));
const previews = JSON.parse(read("store/previews.json"));
const manifest = JSON.parse(read("store/manifest.webmanifest"));
const siteBase = "https://matthewpaver.github.io";

assert.equal(rows.length, 7, "The visual catalogue should stay distilled to seven public projects");
assert.deepEqual(Object.keys(previews), rows.map((row) => row.slug), "Preview order must match the catalogue CSV");
assert.equal(new Set(rows.map((row) => row.slug)).size, rows.length, "Catalogue slugs must be unique");
assert.equal((workHtml.match(/class="work-card app-card image-card"/g) || []).length, rows.length, "Work page card count must match the catalogue CSV");

for (const row of rows) {
  assert.match(row.repo, /^https:\/\/github\.com\/MatthewPaver\//, `${row.slug} needs a public MatthewPaver repository`);
  assert.ok(["Public", "Archived"].includes(row.status), `${row.slug} cannot expose a private repository`);
  assert.match(row.asset, /\.(png|jpe?g|webp)$/i, `${row.slug} must use a real screenshot rather than an illustration SVG`);
  assert.ok(fs.existsSync(path.join(root, "store", row.asset)), `Missing screenshot for ${row.slug}: ${row.asset}`);
  assert.ok(previews[row.slug], `Missing preview data for ${row.slug}`);
  assert.ok(workHtml.includes(`data-slug="${row.slug}"`), `Missing work card for ${row.slug}`);
  assert.ok(workHtml.includes(`href="../${row.preview}"`), `Missing preview link for ${row.slug}`);
  assert.ok(workHtml.includes(`src="../${row.asset}"`), `Card screenshot drift for ${row.slug}`);
  assert.ok(workHtml.includes(`data-problem="${row.problem.replaceAll("&", "&amp;").replaceAll('"', "&quot;")}"`), `Problem evidence drift for ${row.slug}`);
  assert.ok(workHtml.includes(`data-solves="${row.solves.replaceAll("&", "&amp;").replaceAll('"', "&quot;")}"`), `Outcome evidence drift for ${row.slug}`);
  assert.ok(workHtml.includes(`data-proof="${row.proof.replaceAll("&", "&amp;").replaceAll('"', "&quot;")}"`), `Proof evidence drift for ${row.slug}`);
  assert.ok(sitemap.includes(`${siteBase}/${row.preview}`), `Sitemap is missing ${row.slug}`);

  const preview = previews[row.slug];
  assert.ok(Number.isInteger(preview.imageWidth) && preview.imageWidth > 0 && Number.isInteger(preview.imageHeight) && preview.imageHeight > 0, `${row.slug} needs intrinsic image dimensions`);
  for (const field of ["kicker", "title", "summary", "image", "imageAlt", "role", "status", "focus", "problem", "note", "choice", "result", "learning", "access", "publication", "mediaCaption"]) {
    assert.equal(typeof preview[field], "string", `${row.slug}.${field} must be a string`);
    assert.ok(preview[field].trim(), `${row.slug}.${field} cannot be empty`);
  }
  assert.ok(Array.isArray(preview.points) && preview.points.length >= 3, `${row.slug} needs three evidence points`);
  assert.ok(Array.isArray(preview.stack) && preview.stack.length >= 3, `${row.slug} needs a stack`);
  assert.ok(Array.isArray(preview.steps) && preview.steps.length >= 3 && preview.steps.every((step) => typeof step === "string" && step.trim()), `${row.slug} needs a usable first-use walkthrough`);
  assert.ok(Array.isArray(preview.links) && preview.links.some((link) => link.primary), `${row.slug} needs one primary action`);
}

assertPublicCatalogueText({
  projectContent: `${indexHtml.split('<section id="about"')[0]}${workHtml}${JSON.stringify(rows)}${JSON.stringify(previews)}`,
  siteContent: `${indexHtml}${workHtml}`,
});

assert.ok(indexHtml.includes('id="selected-heading"'), "The page needs a clear start-here shelf");
assert.equal((indexHtml.match(/<(?:article|div) class="selected-card"/g) || []).length, 3, "The homepage must stay distilled to three selected projects");
assert.ok(workHtml.includes('id="templates"'), "Reusable code must have a separate pattern section");
assert.ok(workHtml.includes("Sentence similarity starter"), "Sentence similarity starter is missing");
assert.ok(workHtml.includes("PySpark and Kafka starter"), "Streaming starter is missing");
assert.ok(workHtml.includes("Offline recommender starter"), "Recommender starter is missing");
assert.ok(!indexHtml.includes("data-catalogue-search"), "Search belongs on the full work page, not the homepage");
assert.ok(workHtml.includes("data-catalogue-search"), "The full work page needs search");
assert.ok(!`${indexHtml}${workHtml}`.includes("scroll-progress"), "The portfolio should not use decorative scroll tracking");
assert.ok(indexHtml.includes("script.js"), "The evidence interaction needs its small progressive-enhancement script");
assert.ok(!styles.includes("content-visibility"), "Cards must render in full-page captures and print output");
assert.equal((workHtml.match(/aria-label="Example and boundary"/g) || []).length, 7, "Every card must expose an example and practical boundary");

assert.ok(indexHtml.includes('rel="canonical"'), "Index needs a canonical URL");
assert.ok(previewHtml.includes('rel="canonical"'), "Preview needs a canonical URL");
assert.ok(indexHtml.includes('application/ld+json'), "Index needs structured data");
assert.ok(indexHtml.includes('http-equiv="Content-Security-Policy"'), "Index needs a CSP");
assert.ok(previewHtml.includes('http-equiv="Content-Security-Policy"'), "Preview needs a CSP");
assert.ok(!previewHtml.includes("inference-brief"), "Preview fallback cannot reference retired artwork");
assert.ok(styles.includes("@media print"), "CSS needs a print mode");
assert.ok(styles.includes("overflow-x: clip"), "CSS must avoid horizontal scroll traps");
assert.ok(sitemap.includes(`${siteBase}/work/`), "Sitemap is missing the full work page");

for (const asset of [
  "store/assets/favicon.svg",
  "store/assets/apple-touch-icon.svg",
  "store/assets/og-image.png",
  "store/manifest.webmanifest",
]) {
  assert.ok(fs.existsSync(path.join(root, asset)), `Missing required asset: ${asset}`);
}
assert.ok(manifest.name && manifest.icons?.length, "Web manifest needs a name and icon");
assert.ok(sitemap.includes(`${siteBase}/`), "Sitemap needs the store root");
assert.ok(sitemap.includes(`${siteBase}/store/apps/marketing-ml-lakehouse/`), "Keep the shared lakehouse deep link");
assert.ok(robots.includes(`Sitemap: ${siteBase}/sitemap.xml`), "robots.txt must point to the sitemap");

const shelfLabels = Object.fromEntries(tags.map((tag) => [tag.tag, tag.label]));
const llms = [
  "# Matthew Paver Portfolio",
  "",
  "> Public decision tools, data products and reproducible engineering case studies.",
  "",
  `Site: ${siteBase}/`,
  "Author: Matthew Paver",
  "Based: London",
  "Rule: do not invent adoption, customer, revenue or accuracy claims",
  "",
  "## Projects",
  "",
];

for (const row of rows) {
  llms.push(`### ${row.title}`);
  llms.push("");
  llms.push(`- Shelf: ${shelfLabels[row.shelf] ?? row.shelf}`);
  llms.push(`- Status: ${row.status}`);
  llms.push(`- Problem: ${row.problem}`);
  llms.push(`- Outcome: ${row.solves}`);
  llms.push(`- Proof: ${row.proof}`);
  llms.push(`- Available now: ${previews[row.slug].access}`);
  llms.push(`- Publication boundary: ${previews[row.slug].publication}`);
  llms.push(`- Preview: ${siteBase}/${row.preview}`);
  llms.push(`- Repo: ${row.repo}`);
  llms.push(`- Stack: ${row.stack.replaceAll(";", ",")}`);
  llms.push("");
}

llms.push("## Reusable templates", "");
llms.push("- Sentence similarity starter (notebook; newer RAG extension is not yet published): https://github.com/MatthewPaver/sentence-similarity-analysis");
llms.push("- PySpark and Kafka starter: https://github.com/MatthewPaver/pyspark-kafka-streaming");
llms.push("- Offline recommender starter (fictional sample): https://github.com/MatthewPaver/dating-app-recommendation-system");
llms.push("");
fs.writeFileSync(path.join(root, "store/llms.txt"), `${llms.join("\n").trimEnd()}\n`);

const status = {
  generatedAt: new Date().toISOString(),
  passing: true,
  checks: [
    { name: "Public catalogue entries", value: String(rows.length), pass: rows.length === 7 },
    { name: "Real screenshots", value: String(rows.length), pass: true },
    { name: "Preview records", value: String(Object.keys(previews).length), pass: true },
    { name: "Private projects exposed", value: "0", pass: true },
    { name: "Reusable templates", value: "3", pass: true },
    { name: "Security headers", value: "CSP meta", pass: true },
  ],
};
fs.writeFileSync(path.join(root, "store/validator-status.json"), `${JSON.stringify(status, null, 2)}\n`);

console.log(`Validated ${rows.length} public projects, ${Object.keys(previews).length} previews and three reusable templates.`);
