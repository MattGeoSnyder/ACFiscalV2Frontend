/** @type {import('next').NextConfig} */
const nextConfig = {
	// async redirects() {
	// 	return [
	// 		{
	// 			source: "/ach",
	// 			destination: "/ach?limit=20&offset=0",
	// 			permanent: true,
	// 		},
	// 	];
	// },
	experimental: {
		serverComponentsExternalPackages: [
			"@react-pdf/renderer",
		],
	},
};

module.exports = nextConfig;
