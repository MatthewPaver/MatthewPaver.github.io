// Live smoke checks for the deployed portfolio and the Output Gate adoption path.
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
await expect200("Output Gate app 200", "https://matthewpaver.github.io/ai-workflow-evaluator/app/");
await expect200("Output Gate Pages root 200", "https://matthewpaver.github.io/ai-workflow-evaluator/");
await expect200("ADOPTION.md on main 200", "https://raw.githubusercontent.com/MatthewPaver/ai-workflow-evaluator/main/ADOPTION.md");
await expect200(
  "examples/consumer-repo on main 200",
  "https://raw.githubusercontent.com/MatthewPaver/ai-workflow-evaluator/main/examples/consumer-repo/README.md"
);
await expect200(
  "Marketing ML Lakehouse store page 200",
  "https://matthewpaver.github.io/store/apps/marketing-ml-lakehouse/"
);
await expect200(
  "Marketing ML Lakehouse demo console 200",
  "https://matthewpaver.github.io/marketing-ml-lakehouse/"
);

try {
  const html = await (await fetch(`${HOME}?smoke=${Date.now()}`, { cache: "no-store" })).text();
  record("homepage contains 'Add to your CI'", html.includes("Add to your CI"));
  record("homepage links ADOPTION.md", html.includes("ADOPTION.md"));
  record("homepage has no MeetingProof", !/MeetingProof|meetingproof/i.test(html));
  const privateMarkers =
    (html.match(/class="status private"/g) || []).length + (html.match(/data-status="Private/gi) || []).length;
  record("zero private product cards", privateMarkers === 0, `${privateMarkers} marker(s)`);
} catch (err) {
  record("homepage content checks", false, err.message);
}

console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
if (failed > 0) process.exit(1);
