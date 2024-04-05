"use server";
import { API_BASE_URL } from "@/app/constants";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
import { fatch } from "@/lib/helpers/fatch";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type UserAuth = {
	token: string;
	payload: {
		id: number;
		name: string;
		departmentId: number;
		role: string[];
	};
};

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
	const res = await fatch(`${API_BASE_URL}/token`, {
		method: "POST",
		body: formData,
	});

	const userAuth = await res.json();
	if (res.ok && userAuth.token) {
		const session = await getServerSession(authOptions);

		console.log(session);

		if (session) {
			session.user = userAuth;
			return session;
		}
	}

	return prevState;
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
