import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['mdx', 'ts', 'tsx'],
};
const withMDX = createMDX({})
const withNextIntl = createNextIntlPlugin('./src/i18n/requests.ts');
 
export default withNextIntl(withMDX(nextConfig));
