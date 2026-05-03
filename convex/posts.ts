import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

// Create a new post with the given title and body
export const createPost = mutation({
	args: { title: v.string(), body: v.string() },
	handler: async (ctx, args) => {
		const user = await authComponent.safeGetAuthUser(ctx);
		if (!user) {
			throw new ConvexError("Unauthenticated");
		}

		const newPostId = await ctx.db.insert("posts", {
			title: args.title,
			body: args.body,
			authorId: user._id,
		});

		return newPostId;
	},
});

// Get all posts, sorted by creation time
export const getPosts = query({
	args: {},
	handler: async (ctx) => {
		const posts = await ctx.db.query("posts").order("desc").collect();
		return posts;
	},
});
