import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { AES } from "crypto-ts";

export function middleware(request: NextRequest) {
	const encryptedSessionData =
		cookies().get("session")?.value;

	if (!encryptedSessionData) {
		return {
			status: 401,
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	const sessionData = JSON.parse(
		AES.decrypt(
			encryptedSessionData,
			process.env.SECRET_KEY as string
		).toString()
	);
	const currentUser = sessionData.user;

	if (request.nextUrl.pathname.startsWith("/ach")) {
		if (!currentUser) {
			return {
				status: 401,
				redirect: {
					destination: "/login",
					permanent: false,
				},
			};
		}
	}
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|.*\\.png$).*",
	],
};
