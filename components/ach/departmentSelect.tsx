"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { API_BASE_URL } from "@/app/constants";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Suspense } from "react";
import { useFatch } from "@/lib/hooks/useFatch";
import { useState } from "react";

type Department = {
	id: number;
	name: string;
};

interface SelectProps extends SelectPrimitive.SelectProps {
	className?: string;
}

export function DepartmentSelect({
	className = "",
	...props
}: SelectProps) {
	const [departments, setDepartments] = useState<
		Department[]
	>([]);
	const fetchDepartments = async () => {
		const fatch = useFatch<{ departments: Department[] }>();
		const res = await fatch(`${API_BASE_URL}/departments`);
		setDepartments(res.departments);
	};
	fetchDepartments();

	return (
		<Select {...props}>
			<SelectTrigger className='w-[280px]'>
				<SelectValue placeholder='Select a department' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Departments</SelectLabel>
					<Suspense
						fallback={<SelectItem value='Loading...' />}>
						{departments.map((department) => (
							<SelectItem
								key={department.id}
								value={`${department.id}`}>
								{department.name}
							</SelectItem>
						))}
					</Suspense>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
