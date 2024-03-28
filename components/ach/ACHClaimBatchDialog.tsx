"use client";

import React, { useContext, useRef, useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { formatDollars } from "@/lib/helpers/FormatDollars";
import { ACHClaimForm } from "@/components/ach/ACHClaimForm";
import { ClaimedContext } from "./Providers";
import { MultifileInput } from "../ui/multifile-input";
import { Input } from "@/components/ui/input";

export default function ACHClaimBatchDialog({
	count,
	total,
}: {
	count: number;
	total: number;
}) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			setIsOpen(false);
		}
	};

	return (
		<div onKeyDown={handleKeyPress}>
			<AlertDialog
				open={isOpen}
				onOpenChange={setIsOpen}>
				<AlertDialogTrigger asChild>
					<Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
						Claim Batch
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className='gap-3'>
					<AlertDialogHeader>
						<AlertDialogTitle>
							<span>
								{`You're claiming {count} credits for a
								total of ${formatDollars(total)}`}
							</span>
						</AlertDialogTitle>
						<ACHClaimForm
							total={total}
							id='ach-claim-form'
							setIsOpen={setIsOpen}
						/>
						<AlertDialogFooter>
							<Button form='ach-claim-form'>Submit</Button>
						</AlertDialogFooter>
					</AlertDialogHeader>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
