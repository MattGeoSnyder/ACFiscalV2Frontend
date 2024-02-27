"use client";

import React, {
	ReactComponentElement,
	useEffect,
	useContext,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import { ACHCredit } from "@/app/types";
import { ClaimedContext } from "@/components/ach/Providers";

interface IACHClaimButton
	extends React.HTMLAttributes<HTMLButtonElement> {
	credit: ACHCredit;
}

export function ACHClaimButton({
	className,
	credit,
	...props
}: IACHClaimButton) {
	const [selected, setSelected] = useState<boolean>(false);

	const { claimed, setClaimed } =
		useContext(ClaimedContext);

	useEffect(() => {
		if (credit.id in claimed) {
			setSelected(true);
		} else {
			setSelected(false);
		}
	}, [claimed]);

	const handleClick = () => {
		if (!selected) {
			setClaimed((claimed) => ({
				...claimed,
				[credit.id]: credit,
			}));
		}
	};

	return (
		<Button
			{...props}
			disabled={selected}
			onClick={handleClick}
			className={className}>
			<span>Claim</span>
		</Button>
	);
}
