"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function FormButton({
	className,
}: {
	className: string;
}) {
	const { pending } = useFormStatus();
	return (
		<Button
			disabled={pending}
			className={className}>
			{pending ? "Loading..." : "Sign up"}
		</Button>
	);
}
