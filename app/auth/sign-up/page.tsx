"use client";

import { signUpSchema } from "@/app/_schemas/auth";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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

	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign up</CardTitle>
				<CardDescription>Create an account to get started.</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<FieldGroup>
						<Controller
							name="name"
							control={form.control}
							// TODO: continue
							render={() => (
								<Field>
									<FieldLabel htmlFor="form-rhf-name">Full Name</FieldLabel>
									<Input placeholder="John Doe" />
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
