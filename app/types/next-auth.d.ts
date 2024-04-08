import NextAuth, { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		token: JWT;
	}
	interface User {
		access_token: string;
		user: {
			id: number;
			name: string;
			departmentId: number;
			role: string[];
		};
	}
}
