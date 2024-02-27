"use client";

import React, { useContext } from "react";
import { ClaimedContext } from "@/components/ach/Providers";
import {
	TableBody,
	TableRow,
	TableCell,
	TableHeader,
	TableHead,
	Table,
} from "@/components/ui/table";
import ACHUnClaimButton from "@/components/ach/ACHUnClaimButton";

export default function ACHClaimedTable() {
	const { claimed, setClaimed } =
		useContext(ClaimedContext);
	const claimedCredits = Object.values(claimed);

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	if (claimedCredits.length === 0) return <></>;

	return (
		<Table>
			<TableHeader>
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
		</Table>
	);
}
