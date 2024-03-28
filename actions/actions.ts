"use server";
import { API_BASE_URL } from "@/app/constants";
import { cookies } from "next/headers";
import { AES } from "crypto-ts";

export type Auth = {
	id: number;
	username: string;
	departmentId: number;
	scope: string[];
};

export async function handleCookie(sessionData: Auth) {
	const encryptedSessionData = AES.encrypt(
		JSON.stringify(sessionData),
		process.env.SECRET_KEY as string
	).toString();
	cookies().set("session", encryptedSessionData, {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});
}

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

export async function postRoc(formData: FormData) {
	// try {
	// 	const res = await fetch(`${API_BASE_URL}/roc`, {
	// 		method: "POST",
	// 		headers: { "Content-Type": "multipart/form-data" },
	// 		body: formData,
	// 	});
	// 	return res.json();
	// } catch (error) {
	// 	console.log(error);
	// }
	console.log(formData);
	console.log("posting roc");
	const file = formData.get("roc") as File | null;

	if (file === null) {
		const error = "Please upload a file";
		console.log(error);
		return;
	}

	if (
		file.type !==
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	) {
		const error = "File must be an xlsx file";
		console.log(error);
		return;
	}

	const supportingDocs = formData.getAll(
		"supportingDocs"
	) as File[] | null;
	if (supportingDocs === null) {
		const error = "Please upload a file";
		return;
	}

	for (let file of supportingDocs) {
		if (
			file.type !==
			("application/pdf" ||
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document")
		) {
		}
	}
	const res = await fetch(`${API_BASE_URL}/roc`, {
		method: "POST",
		body: formData,
	});
	return res;
}
