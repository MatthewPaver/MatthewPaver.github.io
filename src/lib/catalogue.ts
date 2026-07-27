import type { CollectionEntry } from "astro:content";
import metrics from "../data/github-metrics.json";

export type AppEntry = CollectionEntry<"apps">;
export type GithubMetric = {
  stars: number;
  updatedAt: string;
  ciStatus: "success" | "failure" | "pending" | "unknown";
  release: string | null;
};

export function sortApps(apps: AppEntry[]) {
  return [...apps].sort((a, b) => a.data.order - b.data.order);
}

export function metricFor(app: AppEntry): GithubMetric | null {
  if (!app.data.metricsRepo) return null;
  return (metrics as Record<string, GithubMetric>)[app.data.metricsRepo] ?? null;
}

export function appUrl(app: AppEntry) {
  return `/store/apps/${app.id}/`;
}

export function displayDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function searchableText(app: AppEntry) {
  return [
    app.data.title,
    app.data.category,
    app.data.tagline,
    app.data.problem,
    app.data.outcome,
    ...app.data.stack,
    ...app.data.proof,
  ]
    .join(" ")
    .toLowerCase();
}
