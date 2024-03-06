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
					<ACHClaimForm>
						<Input
							type='number'
							className='hidden'
							name='total'
							value={total * 100}
						/>
						<AlertDialogDescription>
							Upload your ROCs to claim ACH Credits{" "}
							{"(.xlsx files only)"}
						</AlertDialogDescription>
						<MultifileInput className='w-full min-h-[100px] relative' />
						<AlertDialogDescription>
							Upload any supporting documentation{" "}
							{"(optional)"}
						</AlertDialogDescription>
						<MultifileInput className='w-full min-h-[100px] relative' />
					</ACHClaimForm>
					<AlertDialogFooter>
						<Button>Submit</Button>
					</AlertDialogFooter>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
