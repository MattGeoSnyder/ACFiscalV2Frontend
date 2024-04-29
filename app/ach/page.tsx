import ACHCreditsTable from "@/components/ach/ACHCreditsTable";
import { ACHSearchForm } from "@/components/ach/ACHSearchForm";
import { ACHCredit } from "@/lib/types";
import { API_BASE_URL } from "@/app/constants";
import { Providers } from "@/components/ach/Providers";
import ACHClaimedTable from "@/components/ach/ACHClaimedTable";
import { ACHCreditsTableLoading } from "@/components/ach/ACHCreditsTableLoading";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fatch } from "@/lib/helpers/fatch";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/ach/achSearchColumns";
import { ACH_SEARCH_PAGE_SIZE } from "@/lib/constants";

type SearchParams = {
	[key: string]: string | string[] | undefined;
};

interface PageProps {
	searchParams: SearchParams;
}

async function fetchOutstandingACHCredits(
	reqOptions: {
		[key: string]: string | { [key: string]: string };
	},
	params: URLSearchParams
): Promise<ACHCredit[]> {
	params.append("outstanding", Boolean(true).toString());
	params.append("limit", `${ACH_SEARCH_PAGE_SIZE}`);
	try {
		const res = await fatch<ACHCredit[]>(
			`${API_BASE_URL}/ach?${params.toString()}`,
			reqOptions
		);

		return res.ach_credits;
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

	const session = await getServerSession(authOptions);
	const token = session?.token?.token;

	const achCredits = await fetchOutstandingACHCredits(
		{},
		params
	);

	return (
		<div className='flex flex-col items-center'>
			<div className='lg:w-5/6 flex-1 flex flex-col gap-5'>
				<Providers>
					<ACHClaimedTable />
					<ACHSearchForm />
					<Suspense fallback={<ACHCreditsTableLoading />}>
						<ACHCreditsTable
							credits={achCredits}
							params={params}
						/>
					</Suspense>
				</Providers>
			</div>
		</div>
	);
}
