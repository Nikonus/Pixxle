import { mutation, query } from "./_generated/server";
import { internalQuery } from "./_generated/server";

// 🔹 Store or update current user
export const storeUser = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
console.log("IDENTITY:", identity);

    if (!identity) {
      throw new Error("Unauthenticated");
      return null;
    }

    const { tokenIdentifier, email, name, picture } = identity;

    const existingUser = await ctx.db
  .query("users")
  .withIndex("by_token", (q) =>
    q.eq("tokenIdentifier", tokenIdentifier)
  )
  .unique();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        lastActiveAt: Date.now(),
      });

      return existingUser._id;
    }

    const userId = await ctx.db.insert("users", {
      name: name ?? "User",
      email: email ?? "",
      tokenIdentifier,
      imageUrl: picture,
      plan: "free",
      projectUsed: 0,
      exportThisMonth: 0,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });

    return userId;
  },
});

// 🔹 Get current logged-in user
export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const { tokenIdentifier } = identity;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
});