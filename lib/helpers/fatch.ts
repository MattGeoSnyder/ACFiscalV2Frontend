import { redirect } from "next/navigation";

export async function fatch(
	url: URL | RequestInfo,
	init?: RequestInit
) {
	console.log(init);
	const res = await fetch(url, init);

	if (res.status === 401) {
		redirect("/login");
	}
	if (res.status === 403) {
		redirect("/ach");
	}

	return res;
}
