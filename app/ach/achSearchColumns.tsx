"use client";

import { ACHCredit } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ACHCredit>[] = [
	{
		accessorKey: "received",
		header: "Received",
	},
	{
		accessorKey: "amount_in_cents",
		header: "Amount",
	},
	{
		accessorKey: "fund",
		header: "Fund",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
];
