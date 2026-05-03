"use server";

import { api } from "@/convex/_generated/api";
import { fetchAuthMutation } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import z from "zod";
import { postSchema } from "../_schemas/blog";

export async function createPost(values: z.infer<typeof postSchema>) {
	const { success, data, error } = postSchema.safeParse(values);

	if (!success) {
		console.error("Validation failed:", error);
		throw new Error("Invalid post data");
	}

	await fetchAuthMutation(api.posts.createPost, data);
	return redirect("/");
}
