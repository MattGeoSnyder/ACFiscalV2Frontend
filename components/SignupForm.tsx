"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DepartmentSelect } from "@/components/ui/departmentSelect";

export function SignupForm() {
	const signupSchema = z
		.object({
			departmentId: z.number(),
			name: z.string(),
			email: z
				.string()
				.regex(
					/[a-z,A-Z]+.[a-z,A-Z]+@alleghenycounty.us$/,
					{
						message: "Must be your Allegheny County email",
					}
				),
			password: z.string(),
			confirm: z.string(),
		})
		.refine((data) => data.password === data.confirm, {
			message: "Passwords do not match",
			path: ["confirm"],
		});

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
	});

	return (
		<form action=''>
			<DepartmentSelect
				{...form.register("departmentId")}
			/>
			<Input {...form.register("name")} />
			<Input {...form.register("email")} />
			<Input {...form.register("password")} />
			<Input {...form.register("confirm")} />
		</form>
	);
}
