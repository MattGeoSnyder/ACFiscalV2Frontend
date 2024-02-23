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
import { fetchACHCredits } from "@/actions/actions";
import { ACHCredit } from "@/app/types";

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
			{claimed.length && <ACHClaimed />}
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
