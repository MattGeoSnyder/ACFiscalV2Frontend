import ACHCreditsTable from "@/components/ach/ACHCreditsTable";
import { ACHSearchForm } from "@/components/ach/ACHSearchForm";
import { ACHCredit } from "@/app/types";
import { API_BASE_URL } from "@/app/constants";
import { Providers } from "@/components/ach/Providers";
import ACHClaimedTable from "@/components/ach/ACHClaimedTable";
import { ACHCreditsTableLoading } from "@/components/ach/ACHCreditsTableLoading";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

type SearchParams = {
	[key: string]: string | string[] | undefined;
};

interface PageProps {
	searchParams: SearchParams;
}

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
				cache: "no-store",
			}
		);

		// TODO: Remove this once we're done testing loading state
		await new Promise((resolve) =>
			setTimeout(resolve, 3000)
		);

		const achCredits = await res.json();
		return achCredits.ach_credits;
	} catch (error) {
		return [];
	}
}

export default async function AchPage({
	searchParams,
}: PageProps) {
	const params = new URLSearchParams(
		searchParams as { [key: string]: string }
	);

	const achCredits = await fetchOutstandingACHCredits(
		params
	);

	return (
		<div className='flex flex-col items-center'>
			<div className='lg:w-5/6 flex-1 flex flex-col gap-5'>
				<Providers>
					<ACHClaimedTable />
					<ACHSearchForm />

					<Suspense fallback={<ACHCreditsTableLoading />}>
						<ACHCreditsTable credits={achCredits} />
					</Suspense>
				</Providers>
			</div>
		</div>
	);
}
