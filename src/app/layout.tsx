import type { Metadata } from "next";
import React from "react"
import Head from 'next/head';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer"
import ScrollToTopButton from "@/components/ScrollToTopButton";
import "@/styles/global.scss";

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
        <script
          src="https://kit.fontawesome.com/a01c807fba.js"
          crossOrigin="anonymous"
        ></script>
        <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
      </Head>
      <body>
        <Nav/>
        {children}
        <Footer/>
        <ScrollToTopButton/>
      </body>
    </html>
  );
}
