"use client";

import { useState, useContext } from "react";
import { ACHClaimFormData, ACHCredit } from "@/app/types";
// import { postRoc } from "@/actions/actions";
import { Input } from "@/components/ui/input";
import { AlertDialogDescription } from "@/components/ui/alert-dialog";
import { MultifileInput } from "../ui/multifile-input";
import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "@/app/constants";
import { FileInput } from "@/components/ui/file-input";
import { ClaimedContext } from "@/components/ach/Providers";

export async function postRoc(formData: FormData) {
	const files = formData.getAll("roc") as File[] | null;

	if (files === null) {
		const error = "Please upload a file";
		console.log(error);
		return;
	}

	if (!files?.length) {
		const error = "Please upload a file";
		console.log(error);
		return;
	}

	for (let file of files) {
		if (
			file.type !==
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		) {
			const error = "File must be an xlsx file";
			console.log(error);
			return;
		}
	}

	const docs = formData.getAll("docs") as File[] | null;
	if (docs === null) {
		const error = "Please upload a file";
		return;
	}

	for (let file of docs) {
		if (
			file.type !==
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		) {
		}
	}
	const res = await fetch(`${API_BASE_URL}/roc`, {
		method: "POST",
		body: formData,
	});
	return res;
}

interface ACHClaimFormInterface
	extends React.FormHTMLAttributes<HTMLFormElement> {
	total: number;
}

export function ACHClaimForm({
	className,
	total,
	...props
}: ACHClaimFormInterface) {
	const initialFormData = {
		roc: null,
		docs: [],
		total,
	};

	const { claimed } = useContext(ClaimedContext);
	const claimedCreditsArray = Object.values(claimed);

	const mutation = useMutation({
		mutationFn: (formData: FormData) => postRoc(formData),
	});

	const [formState, setFormState] =
		useState<ACHClaimFormData>(initialFormData);

	const handleSubmit = (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		const formData = new FormData();
		const creditIds = new FormData(
			e.target as HTMLFormElement
		).getAll("credit");
		formData.append("roc", formState.roc as File);
		for (let doc of formState.docs) {
			formData.append("docs", doc);
		}
		for (let creditId of creditIds) {
			formData.append("credit", creditId);
		}
		formData.append("total", formState.total.toString());

		const mutate = () => {
			mutation.mutate(formData);
		};
		mutate();
	};

	// const handleChange = (
	// 	e: React.ChangeEvent<HTMLInputElement>
	// ) => {
	// 	const name = e.target.name;
	// 	const files = e.target.files;
	// 	const filesArray = files ? Array.from(files) : [];

	// 	if (name === "roc" || name === "docs") {
	// 		setFormState((prevState) => ({
	// 			...prevState,
	// 			[name]: [...prevState[name], ...filesArray],
	// 		}));
	// 	}
	// };

	return (
		<>
			<form
				className='gap-y-1 flex flex-col w-full h-auto'
				id={props.id}
				onSubmit={handleSubmit}>
				{Object.values(claimed).map((credit) => (
					<Input
						key={credit.id}
						type='hidden'
						name={`credit`}
						value={credit.id}
						readOnly
					/>
				))}
				<Input
					type='number'
					className='hidden'
					name='total'
					value={total * 100}
					readOnly
				/>
				<AlertDialogDescription>
					Upload your roc to claim ACH Credits{" "}
					{"(.xlsx files only)"}
				</AlertDialogDescription>
				<FileInput
					type='file'
					className='w-full min-h-[100px] relative'
					name='roc'
					formState={formState}
					setFormState={setFormState}
				/>
				<AlertDialogDescription>
					Upload any supporting documentation {"(optional)"}
				</AlertDialogDescription>
				<MultifileInput
					className='w-full min-h-[100px] relative'
					name='docs'
					formState={formState}
					setFormState={setFormState}
				/>
				{/* TODO: handle error */}
				{/* <div className='flex-wrap w-full row-start-2 col-span-2'>
					{formState.error && (
						<p className='text-red-500'>
							{formState.error}
						</p>
					)}
				</div> */}
			</form>
		</>
	);
}
