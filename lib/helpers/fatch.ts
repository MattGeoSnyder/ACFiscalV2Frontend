import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function fatch(
	url: URL | RequestInfo,
	init?: RequestInit
) {
	const session = await getServerSession(authOptions);

	const token = session?.token?.token;
	console.log("token", token);
	const res = await fetch(url, {
		...init,
		headers: {
			...init?.headers,
			Authorization: `Bearer ${token ? token : ""}`,
		},
	});

	if (res.status === 401) {
		redirect("/login");
	}
	if (res.status === 403) {
		redirect("/ach");
	}

	return res;
}
