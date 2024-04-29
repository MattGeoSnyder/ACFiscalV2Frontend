export type ACHCredit = {
	id: number;
	received: string;
	department: string;
	fund: number;
	amount_in_cents: number;
	description: string;
};

export type ACHClaimFormData = {
	roc: File;
	docs: File[];
	total: number;
};

export type ROCLineItem = {
	id: string;
	mcu: string;
	cost_center: string;
	object_number: string;
	subsidiary: string;
	subledger: string;
	explanation: string;
	amount_in_cents: number;
};

export type ROCDetail = {
	id: string;
	amount_in_cents: number;
	user_id: string;
	booked?: Date;
	fund?: string;
	line_items: ROCLineItem[];
};
