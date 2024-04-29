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
import dynamic from "next/dynamic";

function PDFDocument({
	credits,
}: {
	credits: ACHCredit[];
}) {
	usePDF();
	return (
		<Document>
			<Page>
				{credits.map((credit: ACHCredit) => (
					<div key={credit.id}>
						<Text>{credit.received}</Text>
						<Text>{credit.department}</Text>
						<Text>{credit.fund}</Text>
						<Text>{credit.amount_in_cents}</Text>
						<Text>{credit.description}</Text>
					</div>
				))}
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

	const [credits, setCredits] = useState<ACHCredit[]>([]);

	const document = <PDFDocument credits={credits} />;

	async function fetchAchCredits() {
		const res = await fatch<ACHCredit[]>(
			`${API_BASE_URL}/ach/search?${params.toString()}`
		);
		setCredits(res.ach_credits);
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
