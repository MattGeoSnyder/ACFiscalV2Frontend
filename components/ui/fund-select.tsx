"use client";

import React from "react";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectItem,
	SelectContent,
} from "@/components/ui/select";

export function FundSelect() {
	return (
		<Select name='fund'>
			<SelectTrigger>
				<SelectValue placeholder='Choose a fund' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='11102'>11102</SelectItem>
				<SelectItem value='11103'>11103</SelectItem>
				<SelectItem value='11104'>11104</SelectItem>
				<SelectItem value='11106'>11106</SelectItem>
				<SelectItem value='11108'>11108</SelectItem>
				<SelectItem value='11113'>11113</SelectItem>
				<SelectItem value='11117'>11117</SelectItem>
				<SelectItem value='11118'>11118</SelectItem>
				<SelectItem value='11151'>11151</SelectItem>
			</SelectContent>
		</Select>
	);
}
