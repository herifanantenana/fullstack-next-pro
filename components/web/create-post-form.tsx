"use client";

import { postSchema } from "@/app/_schemas/blog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function CreatePostForm() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const mutation = useMutation(api.posts.createPost);

	const form = useForm({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: "",
			content: "",
		},
	});

	function onSubmit(data: z.infer<typeof postSchema>) {
		startTransition(async () => {
			const post = await mutation({ title: data.title, body: data.content });
			console.log("post", post);
			toast.success("Post created successfully");
			router.push("/");
		});
	}

	return (
		<Card className="gap-y-8">
			<CardHeader>
				<CardTitle>Create blog article</CardTitle>
				<CardDescription>Create a new blog for your readers</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className="gap-y-4">
						<Controller
							control={form.control}
							name="title"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="form-rhf-title">Title</FieldLabel>
									<Input
										{...field}
										id="form-rhf-title"
										type="text"
										placeholder="Super cool title"
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.invalid && fieldState.error && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="content"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="form-rhf-content">Content</FieldLabel>
									<Textarea
										{...field}
										id="form-rhf-content"
										placeholder="Super cool blog content"
										aria-invalid={fieldState.invalid}
										rows={3}
										className="resize-y"
									/>
									{fieldState.invalid && fieldState.error && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Button disabled={isPending} type="submit">
							{isPending ? (
								<>
									<LoaderIcon size="20" className="animate-spin" />
									<span>Creating post...</span>
								</>
							) : (
								"Create post"
							)}
						</Button>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
