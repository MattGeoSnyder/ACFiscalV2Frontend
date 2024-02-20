"use client";

import React, { useState } from "react";

export default function ACHclaimed() {
	type ACHCredit = {
		received: Date;
		fund: String;
		amount: Number;
		description: String;
	};

	const [credits, setCredits] = useState<ACHCredit[]>([]);

	return <div></div>;
}
