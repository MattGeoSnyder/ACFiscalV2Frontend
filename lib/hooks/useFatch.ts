"use client";

import { useRouter } from "next/router";

export async function useFatch() {
	const router = useRouter();

	const fatch = async (
		url: URL | RequestInfo,
		init?: RequestInit
	) => {
		const res = await fetch(url, init);

		if (res.status === 401) {
			router.push("/login");
		}
		if (res.status === 403) {
			router.push("/ach");
		}
		if (!res.ok) {
			router.push("/login");
		}
		return res;
	};

	return fatch;
}
