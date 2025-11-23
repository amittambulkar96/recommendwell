import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./authComponent";

export const getUserLetters = query({
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) throw new Error("User not authenticated");

    const userProfile = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("authId"), user._id))
      .unique();

    const letters = await ctx.db
      .query("letters")
      .filter((q) => q.eq(q.field("userId"), userProfile?._id))
      .collect();

    return letters;
  },
});

export const getUserLetterById = query({
  args: {
    _id: v.id("letters"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) throw new Error("User not authenticated");

    const userProfile = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("authId"), user._id))
      .unique();

    const letter = await ctx.db
      .query("letters")
      .filter((q) => q.eq(q.field("userId"), userProfile?._id))
      .filter((q) => q.eq(q.field("_id"), args._id))
      .unique();

    return letter;
  },
});

export const AddUserLetter = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user)
      return { ok: false as const, type: "NOT_AUTHENTICATED" as const };

    const userProfile = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("authId"), user._id))
      .unique();

    if (!userProfile)
      return { ok: false as const, type: "USER_NOT_FOUND" as const };

    if (!userProfile.isPro)
      return {
        ok: false as const,
        type: "PRO_REQUIRED" as const,
      };

    const letter = await ctx.db.insert("letters", {
      userId: userProfile._id,
      name: args.name,
      slug: args.slug,
      description: args.description,
      content: args.content,
    });
    return { ok: true as const, letter };
  },
});

export const UpdateUserLetter = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    content: v.string(),
    _id: v.id("letters"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user)
      return { ok: false as const, type: "NOT_AUTHENTICATED" as const };

    const userProfile = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("authId"), user._id))
      .unique();

    if (!userProfile)
      return { ok: false as const, type: "USER_NOT_FOUND" as const };

    if (!userProfile.isPro)
      return {
        ok: false as const,
        type: "PRO_REQUIRED" as const,
      };

    await ctx.db.patch(args._id, {
      name: args.name,
      slug: args.slug,
      description: args.description,
      content: args.content,
    });
    return { ok: true as const };
  },
});
