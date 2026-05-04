"use server";

import { api } from "@/convex/_generated/api";
import { fetchAuthMutation } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { postSchema } from "../_schemas/blog";

export async function createPost(values: z.infer<typeof postSchema>) {
	const { success, data, error } = postSchema.safeParse(values);

	if (!success) {
		console.error("Validation failed:", error);
		throw new Error("Invalid post data");
	}

	try {
		const imageUrl = await fetchAuthMutation(
			api.posts.generateImageUploadUrl,
			{},
		);

		const result = await fetch(imageUrl, {
			method: "POST",
			headers: {
				"Content-Type": data.image.type,
			},
			body: data.image,
		});

		if (!result.ok) {
			console.error("Image upload failed:", await result.text());
			throw new Error("Failed to upload image");
		}

		const { storageId } = await result.json();
		await fetchAuthMutation(api.posts.createPost, {
			title: data.title,
			body: data.body,
			imageStorageId: storageId,
		});
	} catch (error) {
		console.error("Failed to create post:", error);
		throw new Error("Failed to create post");
	}

	revalidatePath("/post");
	return redirect("/post");
}
