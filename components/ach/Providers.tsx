"use client";

import React, {
	createContext,
	useState,
	Dispatch,
	SetStateAction,
} from "react";
import { ACHCredit } from "@/app/types";

export const ClaimedContext = createContext<{
	claimed: { [key: number]: ACHCredit };
	setClaimed: Dispatch<
		SetStateAction<{
			[key: number]: ACHCredit;
		}>
	>;
}>({ claimed: {}, setClaimed: () => {} });

export function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	const [claimed, setClaimed] = useState<{
		[key: number]: ACHCredit;
	}>({});
	return (
		<ClaimedContext.Provider
			value={{ claimed, setClaimed }}>
			{children}
		</ClaimedContext.Provider>
	);
}
