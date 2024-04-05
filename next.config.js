/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "*",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
					},
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe",
					},
					{
						key: "Access-Control-Allow-Credentials",
						value: "true",
					},
				],
			},
		];
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "4mb",
		},
	},
};

module.exports = nextConfig;
