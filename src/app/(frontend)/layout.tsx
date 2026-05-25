import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ThemeProvider from "@/components/context/ThemeProvider";
import "@/styles/global.scss";
import "@/styles/fontawesome/css/all.min.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Leon Heuer's portfolio",
  description: "Personal projects and resume",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <title>Leon Heuers Portfolio</title>
      </Head>
      <body className={inter.className}>
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
          <ScrollToTopButton />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
