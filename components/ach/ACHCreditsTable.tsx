"use client";

import {
	Table,
	TableHead,
	TableHeader,
	TableRow,
	TableCell,
	TableBody,
} from "@/components/ui/table";
import {
	useState,
	createContext,
	SetStateAction,
	Dispatch,
} from "react";
import { ACHCredit } from "@/lib/types";
import { DownloadCsvButton } from "@/components/ach/download-csv-button";
import { ACHClaimButton } from "./ACHClaimButton";
import { formatDollars } from "@/lib/helpers/FormatDollars";
import dynamic, { LoaderComponent } from "next/dynamic";

const AchPdfDownload = dynamic(
	() =>
		import("./AchPdfDownload").then(
			(mod) => mod.AchPdfDownload
		),
	{ ssr: false }
);

export default function ACHCreditsTable({
	credits,
	params,
}: {
	credits: ACHCredit[];
	params: URLSearchParams;
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>
						<DownloadCsvButton />
					</TableHead>
					<TableHead>
						<AchPdfDownload params={params} />
					</TableHead>
				</TableRow>
				<TableRow>
					<TableHead>Claim</TableHead>
					<TableHead>Received</TableHead>
					<TableHead>Department</TableHead>
					<TableHead>Fund</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Description</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{credits.map((credit: ACHCredit) => (
					<TableRow key={credit.id}>
						<TableCell>
							<ACHClaimButton credit={credit} />
						</TableCell>
						<TableCell>
							{new Date(credit.received).toDateString()}
						</TableCell>
						<TableCell>{credit.department}</TableCell>
						<TableCell>{credit.fund}</TableCell>
						<TableCell>
							{formatDollars(credit.amount_in_cents)}
						</TableCell>
						<TableCell>{credit.description}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
