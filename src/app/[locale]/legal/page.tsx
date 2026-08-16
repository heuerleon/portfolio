import Legal from "@/markdown/Legal.mdx"
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { InfoIcon } from "@/components/Icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LegalPage" });
  return {
    title: t("metaTitle"),
    alternates: {
      canonical: "/legal",
      languages: {
        en: "/legal",
        ko: "/ko/legal",
        "x-default": "/legal",
      },
    },
  };
}

export default async function LegalNotice({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("LegalPage");
  const common = await getTranslations("Common");

  return (
    <div>
      <section className="padding-section alt-section-dark adjust-to-nav">
        <div className="row">
          <div className="column-centered">
            <p>
              <Link href="/">{common("home")}</Link> / <Link href="/legal">{t("breadcrumbCurrent")}</Link>
            </p>
            <h1>{t("heading")}</h1>
            <p className="warning-message">
              <InfoIcon /> {common("germanOnly")}
            </p>
          </div>
        </div>
      </section>

      <section className="padding-section">
        <div className="container">
          <div className="row">
            <div className="column-left">
              <Legal/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
