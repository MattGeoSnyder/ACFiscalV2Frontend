"use client";

import { API_BASE_URL } from "@/app/constants";
import {
	TableBody,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import { SetStateAction, Suspense } from "react";
import { ACHCreditsTableBodyLoading } from "./ACHCreditsTableBodyLoading";
import { ACHCredit } from "@/app/types";
import { ACHClaimButton } from "@/components/ACHClaimButton";

export function ACHCreditsTableBody({
	credits,
	setClaimed,
}: {
	credits: ACHCredit[];
	setClaimed: React.Dispatch<SetStateAction<ACHCredit[]>>;
}) {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	console.log(credits);

	return (
		<Suspense fallback={<ACHCreditsTableBodyLoading />}>
			<TableBody>
				{credits.map((credit: ACHCredit) => (
					<TableRow>
						<TableCell>
							<ACHClaimButton
								claimed={credits}
								setClaimed={setClaimed}
								credit={credit}
							/>
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
