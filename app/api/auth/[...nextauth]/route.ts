import type {
	NextRequest,
	NextResponse,
} from "next/server";
import type { User, DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { fatch } from "@/lib/helpers/fatch";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

interface UserAuth extends User {
	token: string;
	type: string;
	user: {
		id: number;
		name: string;
		departmentId: number;
		role: string[];
	};
}

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const formData = new FormData();
				formData.append(
					"username",
					credentials?.username as string
				);
				formData.append(
					"password",
					credentials?.password as string
				);
				const res = await fatch(
					"http://localhost:8000/token",
					{
						method: "POST",
						body: formData,
					}
				);
				const userAuth: UserAuth = await res.json();
				if (res.ok && userAuth.token) {
					return userAuth;
				}

				return null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, account, profile }: any) {
			if (account) {
				token.user = account.user;
			}
			return token;
		},
		async session({
			session,
			token,
		}: {
			session: Session;
			token: JWT;
		}) {
			session.token = token;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
