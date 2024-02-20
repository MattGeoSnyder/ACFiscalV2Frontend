import { API_BASE_URL } from "@/app/constants";
import {
	TableBody,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export async function ACHCreditsTableBody({
	params,
}: {
	params: URLSearchParams;
}) {
	type Credit = {
		id: number;
		received: string;
		fund: number;
		amount_in_cents: number;
		description: string;
	};

	const res: any = await fetch(
		`${API_BASE_URL}/ach?outstanding=true&limit=10&${params.toString()}`
	);
	const credits: { ach_credits: Credit[] } =
		await res.json();

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return (
		<TableBody>
			{credits.ach_credits.map((credit: Credit) => (
				<TableRow>
					<TableCell>
						<Checkbox className='self-center'></Checkbox>
					</TableCell>
					<TableCell>
						{new Date(credit.received).toDateString()}
					</TableCell>
					<TableCell>{credit.fund}</TableCell>
					<TableCell>
						{formatter.format(credit.amount_in_cents / 100)}
					</TableCell>
					<TableCell>{credit.description}</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}
