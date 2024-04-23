import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { ClaimedContext } from "@/components/ach/Providers";
import { ACHCredit } from "@/lib/types";

export default function ACHUnClaimButton({
	credit,
}: {
	credit: ACHCredit;
}) {
	const { claimed, setClaimed } =
		useContext(ClaimedContext);
	const handleClick = () => {
		if (credit.id in claimed) {
			setClaimed((claimed) => {
				delete claimed[credit.id];
				return { ...claimed };
			});
		}
	};
	return (
		<Button onClick={handleClick}>
			<span>Unclaim</span>
		</Button>
	);
}
