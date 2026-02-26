import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";


export const create = mutation({
  args: {
    title: v.string(),
    originalImageUrl: v.optional(v.string()),
    currentImageUrl: v.optional(v.string()),
    thumbnailImageUrl: v.optional(v.string()),
    width: v.number(),
    height: v.number(),
    canvasState: v.any(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new Error("User not found");

    // Free plan limit check
    if (user.plan === "free") {
      const projectCount = await ctx.db
        .query("project")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .collect();

      if (projectCount.length >= 3) {
        throw new Error(
          "You have reached the maximum number of projects. Upgrade to pro."
        );
      }
    }

    const now = Date.now();

   const projectId = await ctx.db.insert("project", {
  title: args.title,
  userId: user._id,
  width: args.width,
  height: args.height,
  canvasState: args.canvasState,
  originalImageUrl: args.originalImageUrl,
  currentImageUrl: args.currentImageUrl,
  thumbnailImageUrl: args.thumbnailImageUrl,
  createdAt: now,
  updatedAt: now,      // ✅ YOU MUST ADD THIS
  lastActiveAt: now,
});

    await ctx.db.patch(user._id, {
      projectUsed: (user.projectUsed ?? 0) + 1,
      lastActiveAt: now,
    });

    return projectId;
  },
});


export const getUserProjects = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

if (!identity) {
  throw new Error("Unauthenticated");
}

const user = await ctx.db
  .query("users")
  .withIndex("by_token", (q) =>
    q.eq("tokenIdentifier", identity.tokenIdentifier)
  )
  .unique();

if (!user) {
  throw new Error("User not found");
}

    return await ctx.db
      .query("project")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});
export const getProjectById = query({
  args: {
    id: v.id("project"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export  const deleteProject = mutation({
  args: { projectId: v.id("project") },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

if (!identity) {
  throw new Error("Unauthenticated");
}

const user = await ctx.db
  .query("users")
  .withIndex("by_token", (q) =>
    q.eq("tokenIdentifier", identity.tokenIdentifier)
  )
  .unique();

if (!user) {
  throw new Error("User not found");
}

    // 🔐 Check if logged in
   

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    if(!user || project.userId !==user._id){
      throw new Error("accsess denied")
    }

    ctx.db.delete(args.projectId)

    await ctx.db.patch(user._id,{
      projectUsed:Math.max(0, user.projectUsed-1),
      lastActiveAt:Date.now(),
    })

    return{success:true}



  }
})

 