import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "savory-giraffe-922.eu-west-1.convex.cloud",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
