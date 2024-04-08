import { withAuth } from "next-auth/middleware";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export default withAuth(
	async function middleware(req) {
		const token = await getToken({
			req,
			secret,
			raw: false,
		});

		const requestHeaders = new Headers(req.headers);
		requestHeaders.set(
			"Authorization",
			`Bearer ${token ? token.token : ""}`
		);

		const response = NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
		return response;
	},
	{
		callbacks: {
			authorized({ token }) {
				return true;
			},
		},
	}
);
