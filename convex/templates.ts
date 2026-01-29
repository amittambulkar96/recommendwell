import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./authComponent";

export const getTemplateBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const template = await ctx.db
      .query("templates")
      .withIndex("slug", (q) => q.eq("slug", args.slug))
      .unique();

    return template;
  },
});

export const getAllTemplates = query({
  handler: async (ctx) => {
    const templates = await ctx.db.query("templates").collect();
    return templates;
  },
});

export const getTemplatesByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const templates = await ctx.db
      .query("templates")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();

    return templates;
  },
});

export const CreateTemplate = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
    templateInfo: v.string(),
    tags: v.array(v.string()),
    category: v.string(),
    isPro: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Check if user is authenticated and is an admin
    // For now, we'll allow any authenticated user to create templates
    // In production, you should add admin role checking
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      return { ok: false as const, type: "NOT_AUTHENTICATED" as const };
    }

    // Check if slug already exists
    const existingTemplate = await ctx.db
      .query("templates")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .unique();

    if (existingTemplate) {
      return { ok: false as const, type: "SLUG_EXISTS" as const };
    }

    const templateId = await ctx.db.insert("templates", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      content: args.content,
      templateInfo: args.templateInfo,
      tags: args.tags,
      category: args.category,
      isPro: args.isPro,
    });

    return { ok: true as const, templateId };
  },
});

export const CreateTemplateInternal = internalMutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
    templateInfo: v.string(),
    tags: v.array(v.string()),
    category: v.string(),
    isPro: v.boolean(),
  },
  handler: async () => {
    // TODO: Implement internal template creation for cron jobs.
    // This should bypass auth and enforce slug uniqueness.
    throw new Error("CreateTemplateInternal not implemented");
  },
});

export const UpdateTemplate = mutation({
  args: {
    _id: v.id("templates"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    templateInfo: v.optional(v.string()),
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

    await ctx.db.patch(_id, updates);

    return { ok: true as const };
  },
});

export const DeleteTemplate = mutation({
  args: { _id: v.id("templates") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      return { ok: false as const, type: "NOT_AUTHENTICATED" as const };
    }

    await ctx.db.delete(args._id);

    return { ok: true as const };
  },
});
