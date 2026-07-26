import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import "@/styles/global.scss";
import "@/styles/fontawesome/css/all.min.css";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

const ogLocales: Record<string, string> = {
  en: "en_US",
  ko: "ko_KR",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL("https://heuer.ovh"),
    title,
    description,
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        en: "/",
        ko: "/ko",
        "x-default": "/",
      },
    },
    openGraph: {
      title,
      description,
      url: locale === routing.defaultLocale ? "/" : `/${locale}`,
      siteName: "heuer.ovh",
      locale: ogLocales[locale] ?? "en_US",
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
      title,
      description,
      images: ["/portrait.jpeg"],
    },
  };
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const notoSansKr = Noto_Sans_KR({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-korean",
  display: "swap",
  preload: false,
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${inter.className} ${inter.variable} ${notoSansKr.variable}`}>
        <NextIntlClientProvider>
          <Nav />
          {children}
          <Footer />
          <ScrollToTopButton />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
