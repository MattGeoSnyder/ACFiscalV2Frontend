"use client";

import {
	TableBody,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import { Suspense } from "react";
import { ACHCreditsTableBodyLoading } from "./ACHCreditsTableBodyLoading";
import { ACHCredit } from "@/app/types";
import { ACHClaimButton } from "@/components/ach/ACHClaimButton";

export function ACHCreditsTableBody({
	credits,
}: {
	credits: ACHCredit[];
}) {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return (
		<Suspense fallback={<ACHCreditsTableBodyLoading />}>
			<TableBody>
				{credits.map((credit: ACHCredit) => (
					<TableRow key={credit.id}>
						<TableCell>
							<ACHClaimButton credit={credit} />
						</TableCell>
						<TableCell>
							{new Date(credit.received).toDateString()}
						</TableCell>
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
		</Suspense>
	);
}
