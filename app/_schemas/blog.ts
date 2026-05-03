import z from "zod";

export const postSchema = z.object({
	title: z.string().min(1).max(50),
	body: z.string().min(1).max(100),
});
