import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="border-foreground/30 flex min-h-screen items-center justify-center border">
			<Button className="absolute top-5 left-5" variant="secondary" asChild>
				<Link href="/">
					<ArrowLeftIcon size="24" />
					<span>Go back</span>
				</Link>
			</Button>

			<div className="w-full max-w-md">{children}</div>
		</main>
	);
}
