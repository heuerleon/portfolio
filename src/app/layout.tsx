import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import React from "react"
import Head from 'next/head';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer"
import ScrollToTopButton from "@/components/ScrollToTopButton";
import "@/styles/global.scss";
import "@/styles/fontawesome/css/all.min.css"

export const metadata: Metadata = {
  title: "Leon Heuer's portfolio",
  description: "Personal projects and resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Leon Heuers Portfolio</title>
        <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
      </Head>
      <body>
        <Nav/>
        {children}
        <Footer/>
        <ScrollToTopButton/>
        <Analytics/>
      </body>
    </html>
  );
}
