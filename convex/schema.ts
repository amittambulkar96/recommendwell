import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    authId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    pdfDownloadsUsed: v.number(),
    txtDownloadsUsed: v.number(),
    savedDocumentsUsed: v.number(),
    docDownloadsUsed: v.number(),
    jobTitle: v.optional(v.string()),
    company: v.optional(v.string()),
    country: v.optional(v.string()),
    isPro: v.boolean(),
  }),

  letters: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
    userId: v.id("users"),
  }).index("userId", ["userId"]),

  templates: defineTable({
    name: v.string(),
    description: v.string(),
    slug: v.string(),
    content: v.string(),
    templateInfo: v.string(),
    tags: v.array(v.string()),
    category: v.string(),
    isPro: v.boolean(),
  }).index("slug", ["slug"]),

  examples: defineTable({
    name: v.string(),
    description: v.string(),
    slug: v.string(),
    content: v.string(),
    exampleInfo: v.string(),
    tags: v.array(v.string()),
    category: v.string(),
    isPro: v.boolean(),
  }).index("slug", ["slug"]),
});
