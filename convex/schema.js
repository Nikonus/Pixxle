import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Identity
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),

    // SaaS Plan
    plan: v.union(
      v.literal("free"),
      v.literal("pro")
    ),

    // Usage Tracking
    projectUsed: v.number(),
    exportThisMonth: v.number(),

    // Activity
    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
    // Fast lookup for Clerk token validation
    .index("by_token", ["tokenIdentifier"])

    // Fast email queries
    .index("by_email", ["email"])

    // Search capabilities
    .searchIndex("search_by_name", {
      searchField: "name",
    })
    .searchIndex("search_by_email", {
      searchField: "email",
    }),


    project:defineTable({
      title: v.string(),
      userId: v.id("users"),
      width: v.number(),
      height: v.number(),
      canvasState: v.any(),
      originalImageUrl: v.optional(v.string()), // originalIamgeUrl
      currentImageUrl: v.optional(v.string()),
      tunbnailImageUrl: v.optional(v.string()),
      activetransformation: v.optional(v.string()),
      backgroundRemove: v.optional(v.string()),
      createdAt: v.number(),
      lastActiveAt: v.number(),

      
      updatedAt: v.number(),
    }).index("by_userId", ["userId"])
    .index("by_title", ["title"])
    .searchIndex("search_by_title", {
      searchField: "title",
    }),


    folder:defineTable({
      name: v.string(),
      userId: v.id("users"),
      createdAt: v.number(),
      updatedAt: v.number(),
    }).index("by_userId", ["userId"])
    .index("by_name", ["name"])
    .searchIndex("search_by_name", {
      searchField: "name",
    }),

  messages: defineTable({
    author: v.id("users"),
    body: v.string(),
  }),
});