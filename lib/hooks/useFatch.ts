"use client";

import { useSession } from "next-auth/react";

export function useFatch<T>(): (
	url: URL | RequestInfo,
	init?: RequestInit
) => Promise<T> {
	const { data } = useSession();

	const token = data?.token?.access_token;

	const fatch = async (
		url: URL | RequestInfo,
		init?: RequestInit
	): Promise<T> => {
		const res = await fetch(url, {
			...init,
			headers: {
				...init?.headers,
				Authorization: `Bearer ${token ? token : ""}`,
			},
		});

		return (await res.json()) as T;
	};
	
	return fatch;
}
