import React, { Dispatch, SetStateAction } from "react";
import { ACHClaimFormData } from "@/app/types";
import { Card, CardContent } from "./card";

interface FileInputInterface
	extends React.InputHTMLAttributes<HTMLInputElement> {
	formState: ACHClaimFormData;
	setFormState: Dispatch<SetStateAction<ACHClaimFormData>>;
}

export function FileInput({
	formState,
	setFormState,
	...props
}: FileInputInterface) {
	const { className, ...rest } = props;
	const name = props.name as keyof ACHClaimFormData;
	const roc = formState[name] as File;
	console.log(roc);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const dt = e.dataTransfer;
		const newRoc = dt.files;
		setFormState((formData) => {
			return {
				...formData,
				[name]: newRoc,
			};
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		e.preventDefault();
		const newRoc = e.target.files;
		setFormState((formData) => {
			return {
				...formData,
				[name]: newRoc?.item(0),
			};
		});
	};

	return (
		<div className={className}>
			<input
				{...rest}
				className='h-full w-full opacity-0 absolute hover:cursor-grab z-10'
				type='file'
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onChange={handleChange}
			/>
			<div className='w-full'>
				{!roc && (
					<Card className='h-auto'>
						<CardContent>
							<p>Click or drag files here to upload.</p>
						</CardContent>
					</Card>
				)}
				{roc && (
					<div>
						<div className='p-2'>
							<p>{roc.name}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
