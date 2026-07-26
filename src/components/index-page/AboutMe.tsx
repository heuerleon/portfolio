import { useTranslations } from "next-intl";

export default function AboutMe() {
  const t = useTranslations("AboutMe");

  return (
    <>
      <h2 className="section-heading">{t("heading")}</h2>
      <p>
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
      <p>
        {t.rich("p2", {
          tesla: (chunks) => (
            <a href="https://tesla.com" target="_blank" rel="noreferrer">
              {chunks}
            </a>
          ),
        })}
      </p>
      <p>
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
    </>
  );
}
