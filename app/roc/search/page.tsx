import { columns } from "@/components/roc/SearchTable/columns";
import { ROCDetail } from "@/lib/types";
import { DataTable } from "@/components/ui/data-table";
import { fatch } from "@/lib/helpers/fatch";
import { API_BASE_URL } from "@/app/constants";
export default async function Page({
	searchParams,
}: {
	searchParams: Object;
}) {
	const params = new URLSearchParams(
		Object.entries(searchParams)
	);
	const res = await fatch<ROCDetail[]>(
		`${API_BASE_URL}/roc/search?${searchParams.toString()}`
	);
	const { line_items: lineItems } = res;
	console.log(params.toString());
	return (
		<DataTable
			columns={columns}
			data={lineItems}
		/>
	);
}
