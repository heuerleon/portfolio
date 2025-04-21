import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(nextConfig);
