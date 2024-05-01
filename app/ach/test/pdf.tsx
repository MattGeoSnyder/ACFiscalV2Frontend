"use client";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFDocument } from "@/components/ach/AchPdfDownload";
import { ACHCredit } from "@/lib/types";

export default function pdf({
	credits,
}: {
	credits: ACHCredit[];
}) {
	const credit = credits[0];
	return (
		<PDFViewer
			style={{
				width: "100%",
				height: "800px",
			}}>
			<PDFDocument credits={credits} />
		</PDFViewer>
	);
}
