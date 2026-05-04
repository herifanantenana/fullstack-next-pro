"use server";

import { api } from "@/convex/_generated/api";
import { fetchAuthMutation } from "@/lib/auth-server";
import z from "zod";
import { commentSchema } from "../_schemas/comment";

export async function createComment(values: z.infer<typeof commentSchema>) {
	const { success, data, error } = commentSchema.safeParse(values);

	if (!success) {
		console.error("Validation failed:", error);
		throw new Error("Invalid comment data");
	}
	await fetchAuthMutation(api.comments.createComment, {
		postId: data.postId,
		body: data.body,
	});
}
