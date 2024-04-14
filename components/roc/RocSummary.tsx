import type { ROC } from "@/app/roc/review/page";
import { formatDollars } from "@/lib/helpers/FormatDollars";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { RocAcceptDialog } from "@/components/roc/RocAcceptDialog";
import Link from "next/link";

export const RocSummary = ({ roc }: { roc: ROC }) => {
	const options = {
		year: "numeric" as const,
		month: "long" as const,
		day: "numeric" as const,
	};

	return (
		<TableRow>
			<TableCell>
				{roc.claimed.toLocaleString("en-US", options)}
			</TableCell>
			<TableCell>{`${roc.last_name}, ${roc.first_name}`}</TableCell>
			<TableCell>
				{formatDollars(roc.ach_total / 100)}
			</TableCell>
			<TableCell>
				{formatDollars(roc.amount_in_cents / 100)}
			</TableCell>
			{/* TODO: Add a link to the ROC detail page */}
			<TableCell>
				<Link
					className='underline'
					href={`/roc/${roc.id}`}
					target='_blank'>
					View ROC
				</Link>
			</TableCell>
			<TableCell>
				<RocAcceptDialog rocId={roc.id} />
			</TableCell>
			<TableCell>
				<Button>Reject</Button>
			</TableCell>
		</TableRow>
	);
};
