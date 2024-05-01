"use client";

import {
	PDFDownloadLink,
	StyleSheet,
} from "@react-pdf/renderer";
import {
	Document,
	Page,
	Text,
	usePDF,
} from "@react-pdf/renderer";
import { ACHCredit } from "@/lib/types";
import { API_BASE_URL } from "@/app/constants";
import { useState, useEffect } from "react";
import { useFatch } from "@/lib/hooks/useFatch";
import { formatDollars } from "@/lib/helpers/FormatDollars";

const styles = StyleSheet.create({
	document: {
		fontSize: "12px",
		height: "fit-content",
	},
	page: {
		padding: "16px",
		gap: "16px",
		flexDirection: "column",
	},
	credit: {
		alignItems: "center",
		fontSize: "10px",
		gap: "20px",
		display: "flex",
		flexDirection: "row",
		textAlign: "justify",
	},
	creditItem: {
		flex: 1,
		marginHorizontal: "10px",
	},
});

export function PDFDocument({
	credits,
	children,
}: {
	credits: ACHCredit[];
	children?: React.ReactNode;
}) {
	return (
		<Document>
			<Page style={styles.page}>
				{credits.map((credit: ACHCredit) => (
					<Text
						style={styles.credit}
						key={credit.id}>
						<Text style={styles.creditItem}>
							{`Date received: ${credit.received}`}
						</Text>
						<Text style={styles.creditItem}>
							{`Fund: ${credit.fund}`}
						</Text>
						<Text style={styles.creditItem}>
							{`Department: ${credit.department}`}
						</Text>
						<Text style={styles.creditItem}>
							{`Amount: ${formatDollars(
								credit.amount_in_cents
							)}`}
						</Text>
						<Text style={styles.creditItem}>
							{`Description: ${credit.description}`}
						</Text>
					</Text>
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

	const fatch = useFatch<{ ach_credits: ACHCredit[] }>();

	const [credits, setCredits] = useState<ACHCredit[]>([]);

	const document = <PDFDocument credits={credits} />;

	async function fetchAchCredits() {
		const res = await fatch(
			`${API_BASE_URL}/ach?${searchParams.toString()}`
		);
		setCredits(res.ach_credits);
	}

	useEffect(() => {
		fetchAchCredits();
	}, []);

	return (
		<PDFDownloadLink
			document={document}
			fileName='ACH Report.pdf'>
			{"Download PDF"}
		</PDFDownloadLink>
	);
}
