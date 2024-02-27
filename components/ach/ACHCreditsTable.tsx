"use client";

import {
	Table,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	useState,
	createContext,
	SetStateAction,
	Dispatch,
} from "react";
import ACHClaimedTable from "./ACHClaimedTable";
import { ACHCreditsTableBody } from "./ACHCreditsTableBody";
import { ACHCredit } from "@/app/types";

export default function ACHCreditsTable({
	credits,
}: {
	credits: ACHCredit[];
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Claim</TableHead>
					<TableHead>Received</TableHead>
					<TableHead>Fund</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Description</TableHead>
				</TableRow>
			</TableHeader>
			<ACHCreditsTableBody credits={credits} />
		</Table>
	);
}
