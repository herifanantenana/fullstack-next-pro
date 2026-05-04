import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const getCommentsByPostId = query({
	args: { postId: v.id("posts") },
	handler: async (ctx, { postId }) => {
		const comments = await ctx.db
			.query("comments")
			.filter((q) => q.eq(q.field("postId"), postId))
			.order("desc")
			.collect();
		return comments;
	},
});

export const createComment = mutation({
	args: { body: v.string(), postId: v.id("posts") },
	handler: async (ctx, { body, postId }) => {
		const user = await authComponent.safeGetAuthUser(ctx);
		if (!user) {
			throw new ConvexError("not authenticated");
		}

		return await ctx.db.insert("comments", {
			body,
			postId,
			authorId: user._id,
			authorName: user.name,
		});
	},
});
