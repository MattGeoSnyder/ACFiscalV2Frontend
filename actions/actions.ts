"use server";
import { API_BASE_URL } from "@/app/constants";

export async function signup(formData: FormData) {
	const [first_name, ...last_name] = (
		formData.get("name") as string
	)?.split(" ");
	try {
		const res = await fetch(`${API_BASE_URL}/signup`, {
			method: "POST",
			body: JSON.stringify({
				...formData,
				department_id: formData.get("departmentId"),
				first_name,
				last_name,
			}),
		});
		const tokenRes = await fetch(`${API_BASE_URL}/token`, {
			method: "POST",
			body: JSON.stringify({
				email: formData.get("email"),
				password: formData.get("password"),
			}),
		});
		const token = await tokenRes.json();
		return token;
	} catch (e) {
		console.log(e);
	}
}
