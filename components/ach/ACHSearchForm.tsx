"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { DateInput } from "@/components/ui/dateInput";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DepartmentSelect } from "@/components/ach/departmentSelect";

const formSchema = z.object({
	amount_lb: z.string().optional(),
	amount_ub: z.string().optional(),
	fund: z.string().optional(),
	description: z.string().optional(),
	received_lb: z.string().optional(),
	received_ub: z.string().optional(),
	claimed_lb: z.string().optional(),
	claimed_ub: z.string().optional(),
	roc_id: z.string().optional(),
	department_id: z.string().optional(),
});

export function ACHSearchForm() {
	const { register, handleSubmit } = useForm<
		z.infer<typeof formSchema>
	>({
		resolver: zodResolver(formSchema),
	});

	const router = useRouter();

	function onSubmit(formData: z.infer<typeof formSchema>) {
		const searchParams = new URLSearchParams();
		if (formData.amount_lb) {
			const amount = parseFloat(formData.amount_lb) * 100;
			formData.amount_lb = amount.toString();
		}
		if (formData.amount_ub) {
			const amount = parseFloat(formData.amount_ub) * 100;
			formData.amount_ub = amount.toString();
		}
		for (let [key, value] of Object.entries(formData)) {
			if (value) {
				searchParams.append(key, value);
			}
		}
		router.push(`/ach?${searchParams.toString()}`);
	}

	const onInvalid = (errors: any) => console.log(errors);

	return (
		<form
			className='grid md:justify-between md:grid-cols-3 md:grid-rows-3 md:gap-5 w-full'
			onSubmit={handleSubmit(onSubmit, onInvalid)}>
			<div className='self-end'>
				<Label>Fund</Label>
				<Input
					type={"number"}
					{...register("fund")}
					defaultValue={11151}
				/>
			</div>
			<DateInput
				className={"flex md:col-span-2"}
				outerLabel='Received'
				type='date'
				lowerBoundProps={{ ...register("received_lb") }}
				upperBoundProps={{ ...register("received_ub") }}
			/>
			<div className='self-end'>
				<Label>Department</Label>
				<DepartmentSelect />
			</div>
			<DateInput
				className={"flex md:col-span-2"}
				outerLabel='Amount'
				type='number'
				lowerBoundProps={{
					step: "0.01",
					...register("amount_lb"),
				}}
				upperBoundProps={{
					step: "0.01",
					...register("amount_ub"),
				}}
			/>
			<div className='md:col-span-2 md:row-start-3 self-end'>
				<Label>Description</Label>
				<Input
					type='text'
					{...register("description")}
				/>
			</div>
			<Button
				type='submit'
				className='self-end lg:max-w-xlg justify-self-center md: row-start-3'>
				Search
			</Button>
		</form>
	);
}
