import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./authComponent";

export const getExampleBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const example = await ctx.db
      .query("examples")
      .withIndex("slug", (q) => q.eq("slug", args.slug))
      .unique();

    return example;
  },
});

export const getAllExamples = query({
  handler: async (ctx) => {
    const examples = await ctx.db.query("examples").collect();
    return examples;
  },
});

export const getExamplesByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const examples = await ctx.db
      .query("examples")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();

    return examples;
  },
});

export const CreateExample = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
    exampleInfo: v.string(),
    tags: v.array(v.string()),
    category: v.string(),
    isPro: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Check if user is authenticated and is an admin
    // For now, we'll allow any authenticated user to create examples
    // In production, you should add admin role checking
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      return { ok: false as const, type: "NOT_AUTHENTICATED" as const };
    }

    // Check if slug already exists
    const existingExample = await ctx.db
      .query("examples")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .unique();

    if (existingExample) {
      return { ok: false as const, type: "SLUG_EXISTS" as const };
    }

    const exampleId = await ctx.db.insert("examples", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      content: args.content,
      exampleInfo: args.exampleInfo,
      tags: args.tags,
      category: args.category,
      isPro: args.isPro,
    });

    return { ok: true as const, exampleId };
  },
});

export const CreateExampleInternal = internalMutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
    exampleInfo: v.string(),
    tags: v.array(v.string()),
    category: v.string(),
    isPro: v.boolean(),
  },
  handler: async () => {
    // TODO: Implement internal example creation for cron jobs.
    // This should bypass auth and enforce slug uniqueness.
    throw new Error("CreateExampleInternal not implemented");
  },
});

export const UpdateExample = mutation({
  args: {
    _id: v.id("examples"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    exampleInfo: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    isPro: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      return { ok: false as const, type: "NOT_AUTHENTICATED" as const };
    }

    const { _id, ...updates } = args;

    if (args.slug) {
      const existingExample = await ctx.db
        .query("examples")
        .filter((q) => q.eq(q.field("slug"), args.slug))
        .unique();

      if (existingExample && existingExample._id !== _id) {
        return { ok: false as const, type: "SLUG_ALREADY_EXISTS" as const };
      }
    }

    await ctx.db.patch(_id, updates);

    return { ok: true as const };
  },
});

export const DeleteExample = mutation({
  args: { _id: v.id("examples") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      return { ok: false as const, type: "NOT_AUTHENTICATED" as const };
    }

    await ctx.db.delete(args._id);

    return { ok: true as const };
  },
});
