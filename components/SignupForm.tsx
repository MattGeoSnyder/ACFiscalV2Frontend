"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DepartmentSelect } from "@/components/ui/departmentSelect";
import { FormDescription } from "./ui/form";
import { signup, login } from "@/actions/actions";

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
		<form
			className='flex flex-col justify-evenly w-content h-2/3 p-10 border border-gray-200 rounded-xl'
			action={signup}>
			<div>
				<Label>Department</Label>
				<DepartmentSelect
					{...form.register("departmentId")}
				/>
			</div>
			<div>
				<Label>Name</Label>
				<Input
					{...form.register("name")}
					placeholder='First and last name'
				/>
			</div>
			<div>
				<Label>E-mail</Label>
				<Input
					{...form.register("email")}
					placeholder='Your @alleghenycounty.us email'
				/>
			</div>
			<div>
				<Label>Password</Label>
				<Input
					type='password'
					{...form.register("password")}
					placeholder='Password'
				/>
			</div>
			<div>
				<Label>Confirm password</Label>
				<Input
					type='password'
					{...form.register("confirm")}
					placeholder='Confirm Password'
				/>
			</div>
			<Button className='w-fit self-center'>Sign up</Button>
		</form>
	);
}
