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

type Department = {
	id: number;
	name: string;
};

const fetchDepartments = async (): Promise<{
	departments: Department[];
}> => {
	const res = await fetch(`${API_BASE_URL}/departments`);
	return await res.json();
};

interface SelectProps extends SelectPrimitive.SelectProps {
	className?: string;
}

export async function DepartmentSelect({
	className = "",
	...props
}: SelectProps) {
	const res = await fetchDepartments();
	const departments = res.departments;
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
