import { API_BASE_URL } from "@/app/constants";
import { Suspense } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ACHCreditsTableBody } from "@/components/ACHCreditsTableBody";
import { ACHCreditsTableBodyLoading } from "@/components/ACHCreditsTableBodyLoading";
type SearchParams = { [key: string]: string | undefined };

export default async function ACHCreditsTable({
	searchParams,
}: SearchParams) {
	const params = new URLSearchParams(searchParams);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Received</TableHead>
					<TableHead>Fund</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Description</TableHead>
				</TableRow>
			</TableHeader>
			<Suspense fallback={<ACHCreditsTableBodyLoading />}>
				<ACHCreditsTableBody params={params} />
			</Suspense>
		</Table>
	);
}
