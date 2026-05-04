import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-static";
export const revalidate = 30;

export default function PostPage() {
	return (
		<div className="space-y-12 py-12">
			<div className="text-cen<<ter">
				<h1 className="text-4xl font-bold tracking-tight md:text-6xl">
					Our Post
				</h1>
				<p className="text-muted-foreground mt-4 text-lg">
					Insights, thoughts, and trend from out team
				</p>
			</div>

			<Suspense fallback={<SkeletonPostUI />}>
				<PostList />
			</Suspense>
		</div>
	);
}

async function PostList() {
	const post = await fetchQuery(api.posts.getPosts);

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{post?.map((post) => (
				<Card key={post._id} className="pt-0">
					<CardHeader className="relative h-48 overflow-hidden">
						<Image
							src={
								post.imageUrl ??
								"https://images.unsplash.com/photo-1768839726129-8dcb29a4e7b8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							}
							alt="Nextjs 16"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							loading="eager"
							className="rounded-lg object-cover"
						/>
					</CardHeader>

					<CardContent>
						<Link href={`/post/${post._id}`}>
							<h2 className="hover:text-primary text-2xl font-semibold transition-colors duration-200">
								{post.title}
							</h2>
						</Link>
						<p className="text-muted-foreground line-clamp-3">{post.body}</p>
					</CardContent>

					<CardFooter>
						<Button asChild className="w-full">
							<Link href={`/post/${post._id}`}>Read More</Link>
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}

function SkeletonPostUI() {
	return (
		<div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 6 }).map((_, index) => (
				<div key={index} className="space-y-4">
					<Skeleton className="h-48 rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-2/5" />
						<Skeleton className="h-3 w-full" />
						<Skeleton className="h-3 w-3/4" />
					</div>
					<Skeleton className="h-10 w-full" />
				</div>
			))}
		</div>
	);
}
