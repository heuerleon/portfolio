import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactSuccess" });
  return {
    title: t("metaTitle"),
    robots: {
      index: false,
    },
    alternates: {
      canonical: "/contact-success",
    },
  };
}

export default async function ContactSuccess({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactSuccess");

  return (
    <section className="full-height alt-section-dark y-axis-centered simple-bg">
      <div className="row y-axis-centered x-axis-centered">
        <div className="column-centered">
          <h1>{t("heading")}</h1>
          <p>
            {t("body")}
          </p>
          <p>
            <Link href="/">{t("returnHome")}</Link>
          </p>
        </div>
      </div>
    </section>
  );
};
