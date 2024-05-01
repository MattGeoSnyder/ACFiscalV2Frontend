import { fatch } from "@/lib/helpers/fatch";
import { ACHCredit } from "@/lib/types";
import { PDFViewer } from "@react-pdf/renderer";
import {
	API_BASE_URL,
	ACH_SEARCH_PAGE_SIZE,
} from "@/lib/constants";
import PDF from "./pdf";

export default async function Page() {
	const { ach_credits: credits } = await fatch<ACHCredit[]>(
		`${API_BASE_URL}/ach?outstanding=true&limit=${ACH_SEARCH_PAGE_SIZE}`
	);
	return <PDF credits={credits} />;
}
