import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/comment-section";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface PostIdPageProps {
	params: Promise<{ postId: Id<"posts"> }>;
}

export async function generateMetadata({
	params,
}: PostIdPageProps): Promise<Metadata> {
	const { postId } = await params;
	const post = await fetchQuery(api.posts.getPostById, { postId });

	if (!post) {
		return {
			title: "Post not found - Next.js 16 Convex Starter",
		};
	}

	return {
		title: `${post.title} - Next.js 16 Convex Starter`,
		description: post.body,
	};
}
export default async function PostIdPage({ params }: PostIdPageProps) {
	const { postId } = await params;
	const [post, preloadedComments] = await Promise.all([
		fetchQuery(api.posts.getPostById, { postId }),
		preloadQuery(api.comments.getCommentsByPostId, { postId }),
	]);

	if (!post) {
		return (
			<div className="py-12">
				<h1 className="text-6xl font-bold">No post found</h1>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-4xl py-12">
			<Button variant="outline" asChild className="mb-4">
				<Link href="/post">
					<ArrowLeftIcon size="24" />
					<span>Back to post</span>
				</Link>
			</Button>

			<div className="relative mb-8 h-100 overflow-hidden rounded-xl shadow-sm">
				<Image
					src={
						post.imageUrl ??
						"https://images.unsplash.com/photo-1768839726129-8dcb29a4e7b8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}
					alt={post.title}
					fill
					className="object-cover transition-transform duration-500 hover:scale-105"
				/>
			</div>

			<div className="space-y-4">
				<div>
					<h1 className="text-4xl font-bold">{post.title}</h1>
					<p className="text-muted-foreground text-sm">
						Posted on {new Date(post._creationTime).toLocaleDateString()}
					</p>
				</div>

				<Separator />

				<p className="text-lg leading-relaxed">{post.body}</p>

				<Separator />

				<CommentSection preloadedComments={preloadedComments} />
			</div>
		</div>
	);
}
