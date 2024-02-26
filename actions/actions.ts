"use server";
import { API_BASE_URL } from "@/app/constants";
import { assert } from "console";
import { RedirectType, redirect } from "next/navigation";
import { ACHCredit } from "@/app/types";

export async function signup(
	prevState: any,
	formData: FormData
) {
	const [first_name, last_name] = (
		formData.get("name") as string
	)?.split(" ");
	const reqBody = JSON.stringify({
		email: formData.get("email"),
		password: formData.get("password"),
		department_id: formData.get("departmentId"),
		first_name,
		last_name,
	});
	try {
		const res = await fetch(`${API_BASE_URL}/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: reqBody,
		});

		return res.json();
	} catch (e) {
		console.log(e);
	}
}

export async function login(
	prevState: any,
	formData: FormData
) {
	try {
		const tokenRes = await fetch(`${API_BASE_URL}/token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: formData,
		});
		const token = await tokenRes.json();
		return token;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchACHCredits(
	params: URLSearchParams,
	limit: number = 10,
	outStanding: boolean = true
): Promise<ACHCredit[]> {
	params.append("outstanding", outStanding.toString());
	params.append("limit", limit.toString());
	try {
		const res = await fetch(
			`${API_BASE_URL}/ach?${params.toString()}`,
			{ method: "GET" }
		);
		const achCredits = await res.json();
		return achCredits.ach_credits;
	} catch (error) {
		throw error;
	}
}
