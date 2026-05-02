"use client";

import { authClient } from "@/lib/auth-client";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const AuthButton = () => {
	const router = useRouter();

	return (
		<>
			<Authenticated>
				<Button
					variant="default"
					onClick={() =>
						authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									toast.success("Logged out successfully");
									router.push("/");
								},
								onError: (error) => {
									toast.error(error.error.message);
								},
							},
						})
					}
				>
					Logout
				</Button>
			</Authenticated>

			<Unauthenticated>
				<Button variant="default" asChild>
					<Link href="/auth/sign-up">Sign up</Link>
				</Button>

				<Button variant="secondary" asChild>
					<Link href="/auth/login">Login</Link>
				</Button>
			</Unauthenticated>

			<AuthLoading>
				<LoaderIcon size="20" className="text-muted-foreground animate-spin" />
			</AuthLoading>
		</>
	);
};
