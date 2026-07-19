import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import "@/styles/global.scss";
import "@/styles/fontawesome/css/all.min.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://heuer.ovh"),
  title: "Leon Heuer's portfolio",
  description: "Personal projects and resume",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Leon Heuer's portfolio",
    description: "Personal projects and resume",
    url: "/",
    siteName: "heuer.ovh",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/portrait.jpeg",
        width: 500,
        height: 500,
        alt: "Leon Heuer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Leon Heuer's portfolio",
    description: "Personal projects and resume",
    images: ["/portrait.jpeg"],
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
        <Footer />
        <ScrollToTopButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
