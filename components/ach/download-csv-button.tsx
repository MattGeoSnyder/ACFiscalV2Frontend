"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ACHCredit } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { useFatch } from "@/lib/hooks/useFatch";

export function DownloadCsvButton() {
	const fatch = useFatch<{ ach_credits: ACHCredit[] }>();
	const downloadCsv = async (
		params: URLSearchParams,
		outstanding: Boolean
	) => {
		const { ach_credits: achCredits } = await fatch(
			`${API_BASE_URL}
			/ach?${params.toString()}${
				outstanding ? "&outstanding=true" : ""
			}`
		);
		const csv = achCredits
			.map((row) => Object.values(row).join(","))
			.join("\n");

		const file = new Blob([csv], { type: "text/csv" });
		const department = params.get("department");

		const link = document.createElement("a");
		link.href = URL.createObjectURL(file);
		link.download = `ACH Credits Report ${
			department ? department : ""
		} ${new Date().toLocaleDateString()}.csv`;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const params = useSearchParams();

	return (
		<Button
			onClick={async () => {
				await downloadCsv(params, true);
			}}>
			Download as csv
		</Button>
	);
}
