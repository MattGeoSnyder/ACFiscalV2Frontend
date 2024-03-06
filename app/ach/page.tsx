import ACHCreditsTable from "@/components/ach/ACHCreditsTable";
import { ACHSearchForm } from "@/components/ach/ACHSearchForm";
import { ACHCredit } from "@/app/types";
import { API_BASE_URL } from "@/app/constants";
import { Providers } from "@/components/ach/Providers";
import ACHClaimedTable from "@/components/ach/ACHClaimedTable";

type SearchParams = { [key: string]: string | undefined };

async function fetchOutstandingACHCredits(
	params: URLSearchParams,
	limit: number = 10,
	outStanding: boolean = true
): Promise<ACHCredit[]> {
	params.append("outstanding", outStanding.toString());
	params.append("limit", limit.toString());
	try {
		const res = await fetch(
			`${API_BASE_URL}/ach?${params.toString()}`,
			{
				method: "GET",
				cache: "no-cache",
			}
		);
		const achCredits = await res.json();
		return achCredits.ach_credits;
	} catch (error) {
		return [];
	}
}

export default async function AchPage({
	searchParams,
}: SearchParams) {
	const params = new URLSearchParams(searchParams);

	// delay call for testing loading state
	// const achCredits = await new Promise<ACHCredit[]>(
	// 	(resolve, reject) => {
	// 		setTimeout(() => {
	// 			fetchOutstandingACHCredits(params)
	// 				.then((credits) => resolve(credits))
	// 				.then((error) => reject(error));
	// 		}, 3000);
	// 	}
	// );

	const achCredits = await fetchOutstandingACHCredits(
		params
	);

	return (
		<div className='flex flex-col items-center'>
			<div className='lg:w-5/6 flex-1 flex flex-col gap-5'>
				<Providers>
					<ACHClaimedTable />
					<ACHSearchForm />
					<ACHCreditsTable credits={achCredits} />
				</Providers>
			</div>
		</div>
	);
}
