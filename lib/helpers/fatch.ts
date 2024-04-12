import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function fatch(
	url: URL | RequestInfo,
	init?: RequestInit
) {
	const session = await getServerSession(authOptions);

	const token = session?.token?.access_token;
	const res = await fetch(url, {
		...init,
		headers: {
			...init?.headers,
			Authorization: `Bearer ${token ? token : ""}`,
		},
	});

	return res;
}
