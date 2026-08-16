import { useTranslations } from "next-intl";

export default function AboutMe() {
  const t = useTranslations("AboutMe");

  return (
    <section className="alt-section padding-section" id="about">
      <div className="container">
        <div className="row padding-row">
          <div className="column-centered">
            <h2 className="section-heading">{t("heading")}</h2>
            <p className="p-capped">
              {t.rich("p1", {
                skyCave: (chunks) => (
                  <a
                    href="https://github.com/skycavemc"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <p className="p-capped">
              {t.rich("p2", {
                tesla: (chunks) => (
                  <a href="https://tesla.com" target="_blank" rel="noreferrer">
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <p className="p-capped">
              {t.rich("p3", {
                github: (chunks) => (
                  <a
                    href="https://github.com/heuerleon?tab=repositories"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {chunks}
                  </a>
                ),
                projects: (chunks) => <a href="#projects">{chunks}</a>,
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
