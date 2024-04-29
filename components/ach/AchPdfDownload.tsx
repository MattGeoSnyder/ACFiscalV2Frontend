"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import {
	Document,
	Page,
	Text,
	usePDF,
} from "@react-pdf/renderer";
import { ACHCredit } from "@/lib/types";
import { fatch } from "@/lib/helpers/fatch";
import { API_BASE_URL } from "@/app/constants";
import { useState, useEffect } from "react";
import { useFatch } from "@/lib/hooks/useFatch";

function PDFDocument({
	credits,
}: {
	credits: ACHCredit[];
}) {
	return (
		<Document>
			<Page>
				{/* {credits.map((credit: ACHCredit) => ( */}
				<Text>
					{/* <Text>{credit.received}</Text>
						<Text>{credit.department}</Text>
						<Text>{credit.fund}</Text>
						<Text>{credit.amount_in_cents}</Text>
						<Text>{credit.description}</Text>
            */}
					This is a test.
				</Text>
				{/* ))} */}
			</Page>
		</Document>
	);
}

export function AchPdfDownload({
	params,
}: {
	params: URLSearchParams;
}) {
	const searchParams = new URLSearchParams(params);
	searchParams.delete("limit");
	searchParams.delete("offset");

	const fatch = useFatch<ACHCredit[]>();

	const [credits, setCredits] = useState<ACHCredit[]>([]);

	const document = <PDFDocument credits={credits} />;

	async function fetchAchCredits() {
		const res = await fatch(
			`${API_BASE_URL}/ach?${searchParams.toString()}`
		);
		setCredits(res);
	}

	useEffect(() => {
		fetchAchCredits();
	}, []);

	return (
		<PDFDownloadLink
			document={document}
			fileName='ach-credits.pdf'
		/>
	);
}
