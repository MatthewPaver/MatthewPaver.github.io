import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const apps = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/apps" }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    order: z.number().int().positive(),
    featured: z.boolean().default(false),
    kind: z.enum(["flagship", "case-study"]),
    portfolioRole: z.enum([
      "Flagship product",
      "Open-source tool",
      "ProjectLens component",
      "Engineering study",
      "Research study",
      "Public utility",
      "Open-core case study",
      "Private product",
      "ML study",
      "Analytics handoff",
    ]),
    audience: z.string(),
    category: z.string(),
    status: z.enum(["live", "public", "prototype", "private"]),
    shelf: z.enum(["product", "data-ml", "analytics", "automation"]).default("product"),
    tagline: z.string(),
    problem: z.string(),
    outcome: z.string(),
    proof: z.array(z.string()).min(1),
    stack: z.array(z.string()).min(1),
    image: z.string(),
    imageAvif: z.string().optional(),
    imageAlt: z.string(),
    repo: z.url().optional(),
    metricsRepo: z.string().optional(),
    launch: z.url().optional(),
    caseStudy: z.url().optional(),
    primaryAction: z.string(),
    license: z.string(),
    version: z.string(),
    updated: z.coerce.date(),
    since: z.string().optional(),
    requirements: z.array(z.string()).default([]),
    install: z.array(z.string()).default([]),
    validate: z.array(z.string()).default([]),
    limitations: z.array(z.string()).min(1),
  }),
});

export const collections = { apps };
