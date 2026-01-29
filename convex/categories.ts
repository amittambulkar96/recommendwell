import { query } from "./_generated/server";
import { v } from "convex/values";

type CategoryGroup = {
  normalizedKey: string;
  slug: string;
  label: string;
  templateCount: number;
  exampleCount: number;
};

function normalizeCategory(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function slugifyCategory(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function labelizeCategory(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildCategoryIndex({
  templates,
  examples,
}: {
  templates: Array<{ category: string }>;
  examples: Array<{ category: string }>;
}) {
  const categories = new Map<string, CategoryGroup>();

  const registerCategory = (rawCategory: string, type: "template" | "example") => {
    if (!rawCategory?.trim()) return;
    const normalizedKey = normalizeCategory(rawCategory);
    const slug = slugifyCategory(normalizedKey);
    const label = labelizeCategory(normalizedKey);

    if (!slug) return;

    if (!categories.has(normalizedKey)) {
      categories.set(normalizedKey, {
        normalizedKey,
        slug,
        label,
        templateCount: 0,
        exampleCount: 0,
      });
    }

    const group = categories.get(normalizedKey);
    if (!group) return;

    if (type === "template") {
      group.templateCount += 1;
    } else {
      group.exampleCount += 1;
    }
  };

  templates.forEach((template) => registerCategory(template.category, "template"));
  examples.forEach((example) => registerCategory(example.category, "example"));

  return categories;
}

export const getCategoryIndex = query({
  handler: async (ctx) => {
    const templates = await ctx.db.query("templates").collect();
    const examples = await ctx.db.query("examples").collect();

    const categories = buildCategoryIndex({ templates, examples });

    return Array.from(categories.values())
      .map((item) => ({
        slug: item.slug,
        label: item.label,
        templateCount: item.templateCount,
        exampleCount: item.exampleCount,
        totalCount: item.templateCount + item.exampleCount,
      }))
      .sort(
        (a, b) =>
          b.totalCount - a.totalCount || a.label.localeCompare(b.label)
      );
  },
});

export const getCategoryContent = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const templates = await ctx.db.query("templates").collect();
    const examples = await ctx.db.query("examples").collect();

    const categories = buildCategoryIndex({ templates, examples });
    const group = Array.from(categories.values()).find(
      (item) => item.slug === args.slug
    );

    if (!group) {
      return null;
    }

    const categoryTemplates = templates
      .filter(
        (template) =>
          normalizeCategory(template.category) === group.normalizedKey
      )
      .map((template) => ({
        _id: template._id,
        slug: template.slug,
        name: template.name,
        description: template.description,
        tags: template.tags,
        category: template.category,
        isPro: template.isPro,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const categoryExamples = examples
      .filter(
        (example) =>
          normalizeCategory(example.category) === group.normalizedKey
      )
      .map((example) => ({
        _id: example._id,
        slug: example.slug,
        name: example.name,
        description: example.description,
        tags: example.tags,
        category: example.category,
        isPro: example.isPro,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      slug: group.slug,
      label: group.label,
      templateCount: categoryTemplates.length,
      exampleCount: categoryExamples.length,
      totalCount: categoryTemplates.length + categoryExamples.length,
      templates: categoryTemplates,
      examples: categoryExamples,
    };
  },
});
