export type ACHCredit = {
	id: number;
	received: string;
	fund: number;
	amount_in_cents: number;
	description: string;
};

export type ACHClaimFormData = {
	roc: File | null;
	docs: File[];
	total: number;
};
