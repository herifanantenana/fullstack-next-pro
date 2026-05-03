import { CreatePostForm } from "@/components/web/create-post-form";

export default function CreatePage() {
	return (
		<div className="space-y-12 py-12">
			<div className="border text-center">
				<h1 className="text-4xl font-bold tracking-tight md:text-6xl">
					Create a Post
				</h1>
				<p className="text-muted-foreground mt-4 text-lg">
					Share your thoughts with the big world
				</p>
			</div>

			<div className="mx-auto w-full max-w-lg border md:max-w-xl">
				<CreatePostForm />
			</div>
		</div>
	);
}
