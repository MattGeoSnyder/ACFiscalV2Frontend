"use client";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export function useFatch() {
	const { data } = useSession();

	const token = data?.token?.access_token;

	const fatch = async (
		url: URL | RequestInfo,
		init?: RequestInit
	) => {
		const res = await fetch(url, {
			...init,
			headers: {
				...init?.headers,
				Authorization: `Bearer ${token ? token : ""}`,
			},
		});

		return res;
	};

	return fatch;
}
