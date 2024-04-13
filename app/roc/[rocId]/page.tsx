import { API_BASE_URL } from "@/lib/constants";
import { formatDollars } from "@/lib/helpers/FormatDollars";
import { fatch } from "@/lib/helpers/fatch";
import { ROCDetail } from "@/app/types";
import { ROCLineItem } from "@/app/types";

export default async function Page({
	params,
}: {
	params: { rocId: number };
}) {
	const { roc } = await fatch<ROCDetail>(
		`${API_BASE_URL}/roc/${params.rocId}`
	);
	console.log(roc);

	return (
		<div className='grid grid-cols-7'>
			<div className='row-start-1 col-span-6 justify-self-end p-3'>
				{"Total:"}
			</div>
			<div className='row-start-1 col-start-7 p-3'>
				{formatDollars(roc.amount_in_cents / 100)}
			</div>
			<>
				<div className='p-3 self-center justify-self-center'>
					MCU
				</div>
				<div className='p-3 self-center justify-self-center'>
					Cost Center
				</div>
				<div className='p-3 self-center justify-self-center'>
					Object Number
				</div>
				<div className='p-3 self-center justify-self-center'>
					Subsidiary
				</div>
				<div className='p-3 self-center justify-self-center'>
					Subledger
				</div>
				<div className='p-3 self-center justify-self-center'>
					Explanation
				</div>
				<div className='p-3 self-center justify-self-center'>
					Amount
				</div>
			</>
			{roc.line_items.map((item) => (
				<>
					<div className='justify-self-center'>
						{item.mcu}
					</div>
					<div className='justify-self-center'>
						{item.cost_center}
					</div>
					<div className='justify-self-center'>
						{item.object_number}
					</div>
					<div className='justify-self-center'>
						{item.subsidiary ?? ""}
					</div>
					<div className='justify-self-center'>
						{item.subledger ?? ""}
					</div>
					<div className='justify-self-center'>
						{item.explanation ?? ""}
					</div>
					<div className='justify-self-center'>
						{formatDollars(item.amount_in_cents / 100)}
					</div>
				</>
			))}
		</div>
	);
}
