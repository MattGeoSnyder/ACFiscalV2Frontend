"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { FundSelect } from "@/components/ui/fund-select";
import { bookRoc } from "@/actions/actions";

export function RocAcceptDialog({
	rocId,
}: {
	rocId: string;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Accept</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Accept ROC</DialogTitle>
					<DialogDescription>
						Choose fund to book ROC into
					</DialogDescription>
				</DialogHeader>
				<form
					action={bookRoc}
					id='fund-form'>
					<input
						name='roc-id'
						value={rocId}
						className='hidden'
					/>
					<FundSelect />
				</form>
				<DialogFooter>
					<Button
						form='fund-form'
						type='submit'>
						Accept
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
