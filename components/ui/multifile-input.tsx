"use client";

import React, {
	useState,
	useRef,
	InputHTMLAttributes,
	Dispatch,
	SetStateAction,
} from "react";
import { Card, CardContent } from "./card";
import { ACHClaimFormData } from "@/lib/types";

//TODO: this style on wrapper 'w-full min-h-[500px] absolute'

interface MultifileInputInterface
	extends InputHTMLAttributes<HTMLInputElement> {
	formState: ACHClaimFormData;
	setFormState: Dispatch<SetStateAction<ACHClaimFormData>>;
}

export function MultifileInput({
	formState,
	setFormState,
	...props
}: MultifileInputInterface) {
	const { className, ...rest } = props;
	const name = props.name as keyof ACHClaimFormData;
	const files = formState[name] as File[];

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const dt = e.dataTransfer;
		const newFiles = Array.from(dt.files);
		setFormState((formData) => {
			const temp = formData[name] as File[];
			console.log(temp);
			return {
				...formData,
				[name]: [...temp, ...newFiles],
			};
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!e.target.files) return;
		const newFiles = Array.from(e.target.files);
		setFormState((formData) => {
			const temp = formData[name] as File[];
			return {
				...formData,
				[name]: [...temp, ...newFiles],
			};
		});
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
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
				multiple
			/>
			<div className='w-full'>
				{files.length === 0 && (
					<Card className='h-auto'>
						<CardContent>
							<p>Click or drag files here to upload.</p>
						</CardContent>
					</Card>
				)}
				{files.length > 0 && (
					<div>
						{files.map((file, i) => (
							<div
								key={i}
								className='p-2'>
								<p>{file.name}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
