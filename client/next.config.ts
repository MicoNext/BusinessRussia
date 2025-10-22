import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
