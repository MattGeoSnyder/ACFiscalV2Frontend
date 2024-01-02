import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface dateInputProps {
	className?: string;
	outerLabel?: string;
	type?: string;
	lowerBoundClassName?: string;
	upperBoundClassName?: string;
	lowerBoundProps?: React.InputHTMLAttributes<HTMLInputElement>;
	upperBoundProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function DateInput({
	className = "",
	outerLabel = "Date",
	type = "text",
	lowerBoundClassName = "",
	upperBoundClassName = "",
	lowerBoundProps = {},
	upperBoundProps = {},
}: dateInputProps) {
	return (
		<div
			className={`flex flex-col justify-end gap-0 ${className}`}>
			<Label className=''>{outerLabel}:</Label>
			<div className='flex justify-around'>
				<div>
					<Label>From</Label>
					<Input
						className={lowerBoundClassName}
						type={type}
						{...lowerBoundProps}
					/>
				</div>
				<div>
					<Label>To</Label>
					<Input
						className={upperBoundClassName}
						type={type}
						{...upperBoundProps}
					/>
				</div>
			</div>
		</div>
	);
}
