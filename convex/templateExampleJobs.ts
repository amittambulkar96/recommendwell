import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const updateTemplateAutoJob = internalMutation({
  args: {
    template: v.object({
      name: v.string(),
      isPro: v.boolean(),
      slug: v.string(),
      description: v.string(),
      content: v.string(),
      templateInfo: v.string(),
      tags: v.array(v.string()),
      category: v.string(),
    }),
  },
  handler: async (ctx, { template }) => {
    console.log("[convex-internal] insert template", {
      slug: template.slug,
      isPro: template.isPro,
      tagsCount: template.tags.length,
    });
    await ctx.db.insert("templates", {
      name: template.name,
      isPro: template.isPro,
      slug: template.slug,
      description: template.description,
      content: template.content,
      templateInfo: template.templateInfo,
      tags: template.tags,
      category: template.category,
    });
  },
});

export const updateExampleAutoJob = internalMutation({
  args: {
    example: v.object({
      name: v.string(),
      isPro: v.boolean(),
      slug: v.string(),
      description: v.string(),
      content: v.string(),
      exampleInfo: v.string(),
      tags: v.array(v.string()),
      category: v.string(),
    }),
  },
  handler: async (ctx, { example }) => {
    console.log("[convex-internal] insert example", {
      slug: example.slug,
      isPro: example.isPro,
      tagsCount: example.tags.length,
    });
    await ctx.db.insert("examples", {
      name: example.name,
      isPro: example.isPro,
      slug: example.slug,
      description: example.description,
      content: example.content,
      exampleInfo: example.exampleInfo,
      tags: example.tags,
      category: example.category,
    });
  },
});
