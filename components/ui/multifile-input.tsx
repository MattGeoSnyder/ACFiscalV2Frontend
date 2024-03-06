"use client";

import React, {
	useState,
	useRef,
	InputHTMLAttributes,
} from "react";
import { Card, CardContent } from "./card";

//TODO: this style on wrapper 'w-full min-h-[500px] absolute'

export function MultifileInput(
	props: InputHTMLAttributes<HTMLInputElement>
) {
	const { className, ...rest } = props;
	const [files, setFiles] = useState<File[]>([]);
	const input = useRef<HTMLInputElement>(null);

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const dt = e.dataTransfer;
		const newFiles = Array.from(dt.files);
		setFiles((files) => {
			const newNewFiles = [...files];
			for (const file of newFiles) {
				if (
					file.type ===
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				) {
					newNewFiles.push(file);
					console.log(file);
				}
			}
			return newNewFiles;
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!e.target.files) return;
		const newFiles = Array.from(e.target.files);
		setFiles((files) => {
			const newNewFiles = [...files];
			for (const file of newFiles) {
				if (
					file.type ===
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				) {
					newNewFiles.push(file);
					console.log(file);
				}
			}
			return newNewFiles;
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
				ref={input}
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
							<div className='p-2'>
								<p>{file.name}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
