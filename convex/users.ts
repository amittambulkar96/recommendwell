import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./authComponent";

export const createUserProfile = mutation({
  args: {
    authId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const newUser = await ctx.db.insert("users", {
      authId: args.authId,
      name: args.name,
      email: args.email,
      pdfDownloadsUsed: 0,
      txtDownloadsUsed: 0,
      savedDocumentsUsed: 0,
      docDownloadsUsed: 0,
      isPro: false,
    });
    return newUser;
  },
});

export const updateUserProfile = mutation({
  args: {
    id: v.id("users"),
    name: v.string(),
    jobTitle: v.string(),
    company: v.string(),
    country: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user)
      return {
        ok: false as const,
        type: "NOT_AUTHENTICATED" as const,
        data: null,
      };

    const updatedUser = await ctx.db.patch(args.id, {
      name: args.name,
      jobTitle: args.jobTitle,
      company: args.company,
      country: args.country,
    });
    return { ok: true as const, type: "SUCCESS" as const, data: updatedUser };
  },
});

export const getUserProfile = query({
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser)
      return {
        ok: false as const,
        type: "NOT_AUTHENTICATED" as const,
        data: null,
      };

    const userProfile = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("authId"), authUser._id))
      .unique();
    return {
      ok: true as const,
      type: "SUCCESS" as const,
      data: userProfile,
    };
  },
});
