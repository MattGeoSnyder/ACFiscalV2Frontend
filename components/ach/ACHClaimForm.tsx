"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { postRoc } from "@/actions/actions";

export function ACHClaimForm({
	totalInCents,
}: {
	totalInCents: number;
}) {
	const errMsg = { error: "" };
	const [formState, formAction] = useFormState(
		postRoc,
		errMsg
	);
	const handleSubmit = async (state: {
		error: string;
	}) => {};
	return (
		<form
			action={handleSubmit}
			className='self-start w-full flex gap-5'
		>
			<Input
				type='number'
				className='hidden'
				name='total'
				value={totalInCents}
			/>
			<Input
				id='roc-upload'
				type='file'
				name='file'
			/>

			<Button>Submit</Button>
		</form>
	);
}
