import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	async redirects() {
		return [
			{
				source: '/organization',
				destination: '/organization/about',
				permanent: true,
			},
		];
	},
	outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
