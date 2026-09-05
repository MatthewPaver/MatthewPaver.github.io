// Live smoke checks for the deployed portfolio.
// Fails (exit 1) if any stranger-path invariant breaks. No dependencies; Node 18+.
import { inspectPublicPages } from './portfolio-smoke-contract.mjs';

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
await expect200("public catalogue 200", `${HOME}work/`);
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
await expect200("Recommender public source 200", "https://github.com/MatthewPaver/dating-app-recommendation-system");

try {
  const [home, catalogue] = await Promise.all(['', 'work/'].map(async (route) => {
    const response = await fetch(`${HOME}${route}?smoke=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${route || 'homepage'} returned ${response.status}`);
    return response.text();
  }));
  for (const check of inspectPublicPages(home, catalogue)) record(check.name, check.pass);
} catch (err) {
  record("homepage content checks", false, err.message);
}

console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
if (failed > 0) process.exit(1);
