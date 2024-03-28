"use client";

import React, { useContext, useMemo } from "react";
import { ClaimedContext } from "@/components/ach/Providers";
import {
	TableBody,
	TableRow,
	TableCell,
	TableHeader,
	TableHead,
	Table,
	TableFooter,
} from "@/components/ui/table";
import ACHUnClaimButton from "@/components/ach/ACHUnClaimButton";
import ACHClaimBatchButton from "./ACHClaimBatchDialog";
import ACHClaimBatchDialog from "./ACHClaimBatchDialog";

export default function ACHClaimedTable() {
	const { claimed, setClaimed } =
		useContext(ClaimedContext);
	const claimedCredits = Object.values(claimed);
	const total =
		claimedCredits.reduce((acc, credit) => {
			return acc + credit.amount_in_cents;
		}, 0) / 100;

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	if (claimedCredits.length === 0) return <></>;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableCell colSpan={5}>
						<span className='text-2xl font-bold'>
							{"You're claiming:"}
						</span>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableHead>Unclaim</TableHead>
					<TableHead>Received</TableHead>
					<TableHead>Fund</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Description</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{claimedCredits.map((credit) => (
					<TableRow key={credit.id}>
						<TableCell>
							<ACHUnClaimButton credit={credit} />
						</TableCell>
						<TableCell>{credit.received}</TableCell>
						<TableCell>{credit.fund}</TableCell>
						<TableCell>
							{formatter.format(
								credit.amount_in_cents / 100
							)}
						</TableCell>
						<TableCell>{credit.description}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>
						<span className='text-2xl font-bold'>
							Total:
						</span>
					</TableCell>
					<TableCell>
						<span className='text-xl font-bold'>
							{formatter.format(total)}
						</span>
					</TableCell>
					<TableCell>
						<ACHClaimBatchDialog
							count={claimedCredits.length}
							total={total}
						/>
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
