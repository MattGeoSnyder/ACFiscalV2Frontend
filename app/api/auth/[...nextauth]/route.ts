import type {
	NextRequest,
	NextResponse,
} from "next/server";
import type {
	User,
	DefaultSession,
	Account,
	Session,
} from "next-auth";
import type { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { fatch } from "@/lib/helpers/fatch";
import { redirect } from "next/navigation";

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
				const userAuth: User = await res.json();
				if (res.ok && userAuth) {
					return userAuth;
				}

				return null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }: { token: JWT; user: User }) {
			if (user) {
				token = {
					...token,
					...user,
				};
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
