import { readFile, readdir, writeFile } from "node:fs/promises";

const outputUrl = new URL("../src/data/github-metrics.json", import.meta.url);
const contentUrl = new URL("../src/content/apps/", import.meta.url);
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
const contentFiles = (await readdir(contentUrl)).filter((name) => name.endsWith(".md"));
const repositories = new Set();
for (const file of contentFiles) {
  const source = await readFile(new URL(file, contentUrl), "utf8");
  const repo = source.match(/^metricsRepo:\s+([^\s]+)$/m)?.[1];
  if (repo) repositories.add(repo);
}

for (const repo of repositories) {
  try {
    const [metadata, runs, release] = await Promise.all([
      request(`https://api.github.com/repos/${repo}`),
      request(`https://api.github.com/repos/${repo}/actions/runs?per_page=1`),
      request(`https://api.github.com/repos/${repo}/releases/latest`),
    ]);
    if (!metadata || metadata.private || metadata.visibility !== "public") {
      throw new Error(`${repo} is unavailable or not public`);
    }
    next[repo] = {
      stars: metadata?.stargazers_count ?? current[repo]?.stars ?? 0,
      updatedAt: metadata?.pushed_at ?? current[repo]?.updatedAt,
      ciStatus: runs?.workflow_runs?.[0]?.conclusion ?? current[repo]?.ciStatus ?? "unknown",
      release: release?.tag_name ?? null,
    };
  } catch (error) {
    throw new Error(`Public catalogue check failed: ${error.message}`);
  }
}

await writeFile(outputUrl, `${JSON.stringify(next, null, 2)}\n`);
process.stdout.write(`Updated ${Object.keys(next).length} GitHub metric records.\n`);
