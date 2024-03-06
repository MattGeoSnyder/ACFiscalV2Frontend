"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { postRoc } from "@/actions/actions";

export function ACHClaimForm({
	children,
}: {
	children?: React.ReactNode;
}) {
	const errMsg = { error: "" };
	const [state, formAction] = useFormState(postRoc, errMsg);
	const claimAchCredits = async (formData: FormData) => {
		formAction(formData);
	};
	return (
		<>
			<form
				action={claimAchCredits}
				className='gap-y-1 flex flex-col w-full h-auto'>
				{children}
				<div className='flex-wrap w-full row-start-2 col-span-2'>
					{state.error && (
						<p className='text-red-500'>{state.error}</p>
					)}
				</div>
			</form>
		</>
	);
}
