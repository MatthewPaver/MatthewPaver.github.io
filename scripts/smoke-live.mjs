// Live smoke checks for the deployed portfolio.
// Fails (exit 1) if any stranger-path invariant breaks. No dependencies; Node 18+.

const HOME = "https://matthewpaver.github.io/";
const checks = [];
let failed = 0;

function record(name, pass, detail = "") {
  checks.push({ name, pass, detail });
  if (!pass) failed += 1;
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

async function status(url) {
  const res = await fetch(url, { redirect: "follow", cache: "no-store" });
  return res.status;
}

async function expect200(name, url) {
  try {
    const code = await status(url);
    record(name, code === 200, `${code} ${url}`);
  } catch (err) {
    record(name, false, `${err.message} ${url}`);
  }
}

await expect200("homepage 200", HOME);
await expect200("ProjectLens demo 200", "https://matthewpaver.github.io/ProjectLens/change-assurance.html");
await expect200("QuickSupply preview 200", "https://matthewpaver.github.io/preview.html?app=quicksupply");
await expect200("QuickSupply repo 200", "https://github.com/MatthewPaver/QuickSupply");
await expect200(
  "Marketing ML Lakehouse store page 200",
  "https://matthewpaver.github.io/store/apps/marketing-ml-lakehouse/"
);
await expect200(
  "Marketing ML Lakehouse demo console 200",
  "https://matthewpaver.github.io/marketing-ml-lakehouse/"
);
await expect200("England preview 200", "https://matthewpaver.github.io/preview.html?app=england");
await expect200("Recommender preview 200", "https://matthewpaver.github.io/preview.html?app=recommender");

try {
  const html = await (await fetch(`${HOME}?smoke=${Date.now()}`, { cache: "no-store" })).text();
  record("homepage has ProjectLens", /data-slug="projectlens"/i.test(html));
  record("homepage has QuickSupply public", /data-slug="quicksupply"[^>]*data-status="Public"/i.test(html));
  record("homepage has lakehouse", /data-slug="lakehouse"/i.test(html));
  record("homepage has england on product shelf", /data-slug="england"[^>]*data-tags="[^"]*product/i.test(html));
  record("homepage has recommender", /data-slug="recommender"/i.test(html));
  record("homepage has no Output Gate", !/Output Gate|ai-workflow-evaluator|ADOPTION\.md/i.test(html));
  record("homepage has no MeetingProof", !/MeetingProof|meetingproof/i.test(html));
  record("homepage has no happening-open-core card", !/data-slug="happening-core"/i.test(html));
  record("homepage has no paper-trading card", !/data-slug="paper-trading"/i.test(html));
  const privateMarkers =
    (html.match(/class="status private"/g) || []).length + (html.match(/data-status="Private/gi) || []).length;
  record("zero private product cards", privateMarkers === 0, `${privateMarkers} marker(s)`);
} catch (err) {
  record("homepage content checks", false, err.message);
}

console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
if (failed > 0) process.exit(1);
