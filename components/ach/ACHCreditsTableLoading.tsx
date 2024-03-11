import {
	Table,
	TableHeader,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@/components/ui/table";

export function ACHCreditsTableLoading() {
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
			<TableBody>
				<TableRow>
					<TableCell>Loading...</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
