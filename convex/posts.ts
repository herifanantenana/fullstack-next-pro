import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

// Create a new post with the given title and body
export const createPost = mutation({
	args: {
		title: v.string(),
		body: v.string(),
		imageStorageId: v.id("_storage"),
	},
	handler: async (ctx, args) => {
		const user = await authComponent.safeGetAuthUser(ctx);
		if (!user) {
			throw new ConvexError("Unauthenticated");
		}

		const newPostId = await ctx.db.insert("posts", {
			title: args.title,
			body: args.body,
			authorId: user._id,
			imageStorageId: args.imageStorageId,
		});

		return newPostId;
	},
});

// Get all posts, sorted by creation time
export const getPosts = query({
	args: {},
	handler: async (ctx) => {
		const posts = await ctx.db.query("posts").order("desc").collect();
		return await Promise.all(
			posts.map(async (post) => {
				const resolvedImageUrl =
					post.imageStorageId !== undefined
						? await ctx.storage.getUrl(post.imageStorageId)
						: undefined;
				return {
					...post,
					imageUrl: resolvedImageUrl,
				};
			}),
		);
	},
});

// Generate a URL that can be used to upload an image to storage
export const generateImageUploadUrl = mutation({
	args: {},
	handler: async (ctx) => {
		const user = await authComponent.safeGetAuthUser(ctx);
		if (!user) {
			throw new ConvexError("Unauthenticated");
		}

		return await ctx.storage.generateUploadUrl();
	},
});

// Get a single post by its ID
export const getPostById = query({
	args: {
		postId: v.id("posts"),
	},
	handler: async (ctx, args) => {
		const post = await ctx.db.get("posts", args.postId);

		if (!post) {
			return null;
		}

		const resolvedImageUrl =
			post?.imageStorageId !== undefined
				? await ctx.storage.getUrl(post.imageStorageId)
				: undefined;

		return {
			...post,
			imageUrl: resolvedImageUrl,
		};
	},
});
