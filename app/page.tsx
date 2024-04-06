import { getServerSession } from "next-auth";
import type { AppProps } from "next/app";
import { authOptions } from "./api/auth/[...nextauth]/route";
export default async function Home({
	Component,
	...pageProps
}: AppProps) {
	const session = await getServerSession(authOptions);
	console.log(session);

	return (
		// <div className="h-screen w-screen flex flex-col">
		//   <nav className="h-24 md:h-32 w-full p-1 md:p-3">

		//   </nav>
		//   <div className="flex-1 w-full px-1 md:px-3">

		//   </div>
		// </div>
		<div className='h-full w-full'></div>
	);
}
