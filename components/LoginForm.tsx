"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/actions/actions";
import { useFormState } from "react-dom";
import { FormButton } from "@/components/ui/formButton";
import { RedirectType, redirect } from "next/navigation";

export function LoginForm() {
	const signupSchema = z.object({
		email: z
			.string()
			.regex(/[a-z,A-Z]+.[a-z,A-Z]+@alleghenycounty.us$/, {
				message: "Must be your Allegheny County email",
			}),
		password: z.string(),
	});

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
	});

	const errorMsg = {
		errorMessage: "",
	};

	const [state, formAction] = useFormState(login, errorMsg);

	const loginAction = async (formData: FormData) => {
		formAction(formData);
		console.log(state);
		if (state.token) {
			redirect("/ach", RedirectType.replace);
		}
	};

	return (
		<form
			className='flex flex-col justify-evenly w-content h-2/3 p-10 border border-gray-200 rounded-xl'
			action={loginAction}>
			<div className=''>
				<Label>E-mail</Label>
				<Input
					{...form.register("email")}
					placeholder='Your @alleghenycounty.us email'
					className='w-72'
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
			<FormButton className='w-fit self-center' />
		</form>
	);
}
