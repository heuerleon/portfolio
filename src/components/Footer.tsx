import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SocialMediaContainer from "@/components/SocialMediaContainer";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <section className="alt-section-dark" id="footer">
      <div className="container">
        <div className="row padding-row">
          <div className="column-centered">
            <SocialMediaContainer noTopMargin/>
            <span>{t("designedBy", { name: "Leon Heuer" })}</span>
            <span>
              <a
                href="https://github.com/heuerleon/portfolio"
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                {t("viewOnGitHub")}
              </a>
            </span>
            <span className="light">
              {t("rights", { year: String(new Date().getFullYear()), name: "Leon Heuer" })} | <Link href="/legal">{t("legalNotice")}</Link> | <Link href="/privacy">{t("privacyPolicy")}</Link>
            </span>
            <span className="light">
              {t.rich("imagesFrom", {
                link: (chunks) => (
                  <a href="https://unsplash.com/" target="_blank" rel="noreferrer">
                    {chunks}
                  </a>
                ),
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
