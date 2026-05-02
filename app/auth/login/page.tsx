"use client";

import { loginSchema } from "@/app/_schemas/auth";
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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function LoginPage() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(data: z.infer<typeof loginSchema>) {
		startTransition(async () => {
			await authClient.signIn.email({
				email: data.email,
				password: data.password,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Logged in successfully");
						router.replace("/");
					},
					onError: (error) => {
						console.log("error", error);
						toast.error(error.error.message);
					},
				},
			});
		});
	}

	return (
		<Card className="gap-y-8">
			<CardHeader>
				<CardTitle>Sign in</CardTitle>
				<CardDescription>
					Enter your credentials to access your account.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className="gapy-4">
						<Controller
							control={form.control}
							name="email"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="form-rhf-email">Email</FieldLabel>
									<Input
										{...field}
										id="form-rhf-email"
										type="email"
										placeholder="john.doe@example.com"
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
							name="password"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="form-rhf-password">Password</FieldLabel>
									<Input
										{...field}
										id="form-rhf-password"
										type="password"
										placeholder="••••••••"
										aria-invalid={fieldState.invalid}
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
									<LoaderIcon width="20" height="20" className="animate-spin" />
									<span>Logging in...</span>
								</>
							) : (
								"Login"
							)}
						</Button>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
