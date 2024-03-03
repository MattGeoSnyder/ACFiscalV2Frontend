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

export default function ACHClaimBatchDialog({
	count,
	total,
}: {
	count: number;
	total: number;
}) {
	const dialog = useRef<HTMLDialogElement>(null);
	const claimedCredits = useContext(ClaimedContext);

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
					Claim Batch
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className='gap-3'>
				<AlertDialogHeader>
					<AlertDialogTitle>
						<span>
							You're claiming {count} credits for a total of{" "}
							{formatDollars(total)}
						</span>
					</AlertDialogTitle>
					<AlertDialogDescription>
						Please upload your ROC to claim multiple ACH
						Credits
					</AlertDialogDescription>
					<AlertDialogFooter>
						<ACHClaimForm totalInCents={total * 100} />
					</AlertDialogFooter>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
