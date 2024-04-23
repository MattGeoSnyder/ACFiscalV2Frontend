"use client";

import { ROCDetail } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ROCDetail>[] = [
	{
		accessorKey: "booked",
		header: "Booked",
		cell: ({ row }) => {
			const date = row.getValue<Date>("booked");
			return date ? date.toLocaleString() : "Not booked";
		},
	},
	{
		accessorKey: "fund",
		header: "Fund",
	},
	{
		accessorKey: "amount_in_cents",
		header: "Amount",
		cell: ({ row }) => {
			const amount = row.getValue<number>(
				"amount_in_cents"
			);
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount / 100);
			return formatted;
		},
	},
	{
		accessorKey: "department",
		header: "Department",
		cell: ({ row }) => {
			const department = row.getValue<string>("department");
			return department ? department : "Not Identified";
		},
	},
	{
		accessorKey: "user_id",
		header: "Claimed by",
	},
];
