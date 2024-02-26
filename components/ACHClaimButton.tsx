"use client";

import React, {
	ReactComponentElement,
	useState,
} from "react";
import { Button } from "./ui/button";
import { ACHCredit } from "@/app/types";

interface IACHClaimButton
	extends React.HTMLAttributes<HTMLButtonElement> {
	credit: ACHCredit;
	claimed: ACHCredit[];
	setClaimed: React.Dispatch<
		React.SetStateAction<ACHCredit[]>
	>;
}

export function ACHClaimButton({
	className,
	credit,
	claimed,
	setClaimed,
	...props
}: IACHClaimButton) {
	const [selected, setSelected] = useState<boolean>(false);

	const handleClick = () => {
		setSelected((current) => !current);
	};

	return (
		<Button
			{...props}
			className={className}
			onClick={handleClick}>
			<span>Claim</span>
		</Button>
	);
}
