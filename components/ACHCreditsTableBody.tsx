"use client";

import { API_BASE_URL } from "@/app/constants";
import {
	TableBody,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { SetStateAction, Suspense } from "react";
import { ACHCreditsTableBodyLoading } from "./ACHCreditsTableBodyLoading";
import { ACHCredit } from "@/app/types";

export async function ACHCreditsTableBody({
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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		credit: ACHCredit
	) => {
		setClaimed((claimed) => {
			if (!e.) return claimed;

			for (let c of claimed) {
				if (c.id === credit.id) return claimed;
			}
			return [...claimed, credit];
		});
	};

	return (
		<Suspense fallback={<ACHCreditsTableBodyLoading />}>
			<TableBody>
				{credits.map((credit: ACHCredit) => (
					<TableRow>
						<TableCell>
							<Checkbox
								className='self-center'
								onChange={(e) => {
									handleChange(e, credit);
								}}></Checkbox>
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
