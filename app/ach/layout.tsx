import React from "react";
import Link from "next/link";

export default function ACHLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<div>
				<a
					href={"/downloads/ROC_Template.xlsx"}
					download={"ROC_Template.xlsx"}>
					{"Download ROC template"}
				</a>
				<a href={"/downloads/Vendor_Report"}>
					{"Download Today's Vendor Report"}
				</a>
			</div>
			{children}
		</div>
	);
}
