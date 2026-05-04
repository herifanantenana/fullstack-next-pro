"use client";

import { createComment } from "@/app/_actions/comment-action";
import { commentSchema } from "@/app/_schemas/comment";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { LoaderIcon, MessageSquareIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Field, FieldError } from "../ui/field";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

export function CommentSection(props: {
	preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
}) {
	const params = useParams<{ postId: Id<"posts"> }>();
	const [isPending, startTransition] = useTransition();

	const comments = usePreloadedQuery(props.preloadedComments);

	const form = useForm({
		resolver: zodResolver(commentSchema),
		defaultValues: {
			body: "",
			postId: params.postId,
		},
	});

	function onSubmit(values: z.infer<typeof commentSchema>) {
		startTransition(async () => {
			try {
				await createComment(values);
				form.reset();
				toast.success("Comment added successfully");
			} catch {
				toast.error("Failed to add comment");
			}
		});
	}

	if (comments?.length === undefined) {
		return <p>loading ...</p>;
	}

	return (
		<Card>
			<CardHeader className="flex items-center gap-2 border-b">
				<MessageSquareIcon size="20" />
				<h2 className="text-xl font-semibold">{comments?.length} Comments</h2>
			</CardHeader>

			<CardContent className="space-y-8">
				<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
					<Controller
						control={form.control}
						name="body"
						render={({ field, fieldState }) => (
							<Field>
								<Textarea
									aria-invalid={fieldState.invalid}
									{...field}
									placeholder="Share your thoughts..."
									rows={3}
									className="resize-y"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Button disabled={isPending} type="submit">
						{isPending ? (
							<>
								<LoaderIcon size="20" className="animate-spin" />
								<span>Submitting...</span>
							</>
						) : (
							"Submit"
						)}
					</Button>
				</form>

				{comments?.length > 0 && <Separator />}

				<section className="space-y-6">
					{comments?.map((comment) => (
						<div key={comment._id} className="flex gap-4">
							<Avatar>
								<AvatarImage
									src={`https://avatar.vercel.sh/${comment.authorName}`}
									alt={comment.authorName}
								/>

								<AvatarFallback>
									{comment.authorName.slice(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>

							<div className="flex-1 space-y-1">
								<div className="flex items-center justify-between">
									<p className="text-sm font-semibold">{comment.authorName}</p>
									<p className="text-muted-foreground text-xs">
										{new Date(comment._creationTime).toLocaleDateString()}
									</p>
								</div>

								<p className="text-foreground/90 leading-relaxed whitespace-pre-line">
									{comment.body}
								</p>
							</div>
						</div>
					))}
				</section>
			</CardContent>
		</Card>
	);
}
