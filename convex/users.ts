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
    });
    return newUser;
  },
});

export const getUserProfile = query({
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) return null;

    const userProfile = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("authId"), authUser._id))
      .unique();
    return userProfile;
  },
});
