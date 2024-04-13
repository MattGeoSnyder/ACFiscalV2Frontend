import { API_BASE_URL } from "@/app/constants";
import { fatch } from "@/lib/helpers/fatch";
import { RocSummary } from "@/components/roc/RocSummary";
import {
	Table,
	TableHeader,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableCaption,
} from "@/components/ui/table";

export type ROC = {
	id: string;
	amount_in_cents: number;
	user_id: string;
	claimed: Date;
	first_name: string;
	last_name: string;
	ach_total: number;
};

async function fetchRocs(): Promise<ROC[]> {
	const params = new URLSearchParams();
	params.append("limit", "10");
	params.append("offset", "0");
	params.append("booked", "false");
	const res = await fatch<ROC[]>(
		`${API_BASE_URL}/roc?${params.toString()}`,
		{
			cache: "no-store",
		}
	);

	return res.rocs;
}

export default async function Page() {
	console.log("search params");
	const rocs = await fetchRocs();
	console.log("rocs", rocs);
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>{"Date"}</TableHead>
					<TableHead>{"Claimed by"}</TableHead>
					<TableHead>{"ACH credit amount"}</TableHead>
					<TableHead>{"ROC amount"}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rocs.map((roc: ROC) => (
					<RocSummary
						key={roc.id}
						roc={roc}
					/>
				))}
			</TableBody>
		</Table>
	);
}
