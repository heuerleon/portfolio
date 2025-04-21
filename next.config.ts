import type { NextConfig } from "next";
import createMDX from '@next/mdx'


// Create MDX wrapper
const withMDX = createMDX({
  extension: /\.mdx?$/
});

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
