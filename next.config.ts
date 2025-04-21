import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
};
const withMDX = createMDX({})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig);
