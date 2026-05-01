"use client";

import { signUpSchema } from "@/app/_schemas/auth";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function SignUpPage() {
	const form = useForm({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	function onSubmit() {
		console.log("NextPro !");
	}

	return (
		<Card className="gap-y-8">
			<CardHeader>
				<CardTitle>Sign up</CardTitle>
				<CardDescription>Create an account to get started.</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className="gapy-4">
						<Controller
							control={form.control}
							name="name"
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="form-rhf-name">Full Name</FieldLabel>
									<Input
										{...field}
										id="form-rhf-name"
										placeholder="John Doe"
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

						<Button type="submit">Create an account</Button>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
