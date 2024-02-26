"use client";

import {
	Table,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import ACHClaimed from "./ACHClaimed";
import { ACHCreditsTableBody } from "./ACHCreditsTableBody";
import { useQuery } from "@tanstack/react-query";
import { ACHCredit } from "@/app/types";
import { API_BASE_URL } from "@/app/constants";

async function fetchACHCredits(
	params: URLSearchParams,
	limit: number = 10,
	outStanding: boolean = true
): Promise<ACHCredit[]> {
	params.append("outstanding", outStanding.toString());
	params.append("limit", limit.toString());
	try {
		const res = await fetch(
			`${API_BASE_URL}/ach?${params.toString()}`,
			{ method: "GET" }
		);
		const achCredits = await res.json();
		return achCredits.ach_credits;
	} catch (error) {
		throw error;
	}
}

export default function ACHCreditsTable({
	params,
}: {
	params: URLSearchParams;
}) {
	const [claimed, setClaimed] = useState<ACHCredit[]>([]);

	const { isPending, isError, data, error } = useQuery<
		ACHCredit[]
	>({
		queryKey: ["ach_credits"],
		queryFn: () => {
			return fetchACHCredits(params);
		},
		initialData: [],
	});
	return (
		<>
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
				<ACHCreditsTableBody
					credits={data}
					setClaimed={setClaimed}
				/>
			</Table>
		</>
	);
}
