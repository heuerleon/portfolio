import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React from "react"
import Head from 'next/head';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer"
import ScrollToTopButton from "@/components/ScrollToTopButton";
import "@/styles/global.scss";
import "@/styles/fontawesome/css/all.min.css"
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Leon Heuer's portfolio",
  description: "Personal projects and resume",
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Leon Heuers Portfolio</title>
      </Head>
      <body className={inter.className}>
        <Nav/>
        {children}
        <Footer/>
        <ScrollToTopButton/>
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
