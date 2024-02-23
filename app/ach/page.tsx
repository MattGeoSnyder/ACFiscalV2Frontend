import { ACHCreditsTableBody } from "@/components/ACHCreditsTableBody";
import ACHCreditsTable from "../../components/ACHCreditsTable";
import { ACHSearchForm } from "@/components/ACHSearchForm";

type SearchParams = { [key: string]: string | undefined };

export default function AchPage({
	searchParams,
}: SearchParams) {
	const params = new URLSearchParams(searchParams);
	return (
		<div className='flex flex-col items-center'>
			<ACHSearchForm />
			<div className='lg:w-5/6 flex-1'>
				<ACHCreditsTable params={params} />
			</div>
		</div>
	);
}
