"use client";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export async function useFatch() {
	const router = useRouter();
	const { data } = useSession();

	const token = data?.token?.token;

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
