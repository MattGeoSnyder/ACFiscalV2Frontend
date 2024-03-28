"use client";

import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import React from "react";

export type Auth = {
	id: number;
	username: string;
	scope: string[];
};

const AuthContext = React.createContext<Auth | null>(null);

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useLocalStorage<Auth | null>(
		"user",
		null
	);
	return (
		<AuthContext.Provider value={user}>
			{children}
		</AuthContext.Provider>
	);
}
