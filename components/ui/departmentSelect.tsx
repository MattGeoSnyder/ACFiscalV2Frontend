"use client";
import { API_BASE_URL } from "@/app/constants";
import { useState, useEffect } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SelectProps extends SelectPrimitive.SelectProps {
	className?: string;
}

export function DepartmentSelect({
	className = "",
	...props
}: SelectProps) {
	const [departments, setDepartments] = useState<
		{
			id: number;
			name: string;
		}[]
	>([]);
	const fetchDepartments = async () => {
		const res = await fetch(`${API_BASE_URL}/departments`);
		const departments: {
			departments: { id: number; name: string }[];
		} = await res.json();
		setDepartments(departments.departments);
	};

	useEffect(() => {
		fetchDepartments();
	}, []);

	return (
		<Select {...props}>
			<SelectTrigger className='w-[280px]'>
				<SelectValue placeholder='Select a department' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Departments</SelectLabel>
					{departments.map((department) => (
						<SelectItem
							key={department.id}
							value={`${department.id}`}>
							{department.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
