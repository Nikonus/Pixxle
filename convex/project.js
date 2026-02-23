import { query, mutation } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    originalImageUrl: v.optional(v.string()),
    currentImageUrl: v.optional(v.string()),
    thumbnailImageUrl: v.optional(v.string()),
    width: v.number(),
    height: v.number(),
    canvasState: v.any(),
    createdAt: v.number(),
    updatedAt: v.number(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internalAction.user.getCurrentUser);

    if (!user) {
      throw new Error("Unauthorized");
    }

    // Free plan limit check
    if (user.plan === "free") {
      const projectCount = await ctx.db
        .query("project")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect();

      if (projectCount.length >= 3) {
        throw new Error(
          "You have reached the maximum number of projects. Upgrade to pro for unlimited projects."
        );
      }
    }

    const projectId = await ctx.db.insert("project", {
      title: args.title,
      userId: user._id,
      width: args.width,
      height: args.height,
      canvasState: args.canvasState,
      originalImageUrl: args.originalImageUrl,
      currentImageUrl: args.currentImageUrl,
      thumbnailImageUrl: args.thumbnailImageUrl,
      createdAt: args.createdAt,
      lastActiveAt: args.updatedAt,
    });

    await ctx.db.patch(user._id, {
      projectUsed: (user.projectUsed ?? 0) + 1,
      lastActiveAt: Date.now(),
    });

    return projectId;
  },
});


export const getUserProject = query({
  args: { projectId: v.id("project") },

  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internalAction.user.getCurrentUser);

    // 🔐 Check if logged in
    if (!user) {
      throw new Error("Unauthorized");
    }

    // 📦 Get project by ID
    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    // 🛑 Check ownership
    if (project.userId !== user._id) {
      throw new Error("Access denied");
    }

    return project;
  },
});

export  const deleteProject = mutation({
  args: { projectId: v.id("project") },

  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internalAction.user.getCurrentUser);

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