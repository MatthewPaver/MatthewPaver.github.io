import { readFile, writeFile } from "node:fs/promises";

const outputUrl = new URL("../src/data/github-metrics.json", import.meta.url);
const current = JSON.parse(await readFile(outputUrl, "utf8"));
const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "matthew-paver-product-store",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function request(url) {
  const response = await fetch(url, { headers });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
}

const next = {};
for (const repo of Object.keys(current)) {
  try {
    const [metadata, runs, release] = await Promise.all([
      request(`https://api.github.com/repos/${repo}`),
      request(`https://api.github.com/repos/${repo}/actions/runs?per_page=1`),
      request(`https://api.github.com/repos/${repo}/releases/latest`),
    ]);
    next[repo] = {
      stars: metadata?.stargazers_count ?? current[repo].stars ?? 0,
      updatedAt: metadata?.pushed_at ?? current[repo].updatedAt,
      ciStatus: runs?.workflow_runs?.[0]?.conclusion ?? current[repo].ciStatus ?? "unknown",
      release: release?.tag_name ?? null,
    };
  } catch (error) {
    process.stderr.write(`Metrics fallback for ${repo}: ${error.message}\n`);
    next[repo] = current[repo];
  }
}

await writeFile(outputUrl, `${JSON.stringify(next, null, 2)}\n`);
process.stdout.write(`Updated ${Object.keys(next).length} GitHub metric records.\n`);
