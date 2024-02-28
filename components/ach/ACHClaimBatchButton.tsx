"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function ACHClaimBatchButton() {
	const dialog = useRef<HTMLDialogElement>(null);
	const handleClick = () => {
		if (dialog.current) {
			dialog.current.showModal();
		}
	};
	return (
		<div>
			<dialog
				ref={dialog}
				className='size-1/3'>
				Please upload your ROC:
			</dialog>
			<Button
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				onClick={handleClick}>
				Claim Batch
			</Button>
		</div>
	);
}
