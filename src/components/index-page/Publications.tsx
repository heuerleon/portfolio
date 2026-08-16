import { useFormatter, useTranslations } from "next-intl";

export type Publication = {
  title: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  authors: string[];
  abstract: string;
  doi: string;
  doiLink: string;
  /** message key under `Publications.kind` */
  kindKey: string;
};

export const publications: Publication[] = [
  {
    title:
      "Functional State Machines in Rust: Typestate and Newtype Patterns (Experience Report)",
    date: "2026-06-17",
    authors: ["Leon Heuer", "Falk Woldmann Lu", "Jan Haase"],
    abstract:
      "We investigate the effects on code quality of the design patterns typestate and newtype in the language Rust, by conducting three case studies from production code, evaluated through expert interviews, static code analysis and benchmarks. The findings indicate that: (1) Typestate improves code faultlessness and testability, but comes at the cost of more boilerplate code and can degrade readability. Code with extensive branching logic and many invariants likely benefits most from the pattern. (2) Newtype combined with the \"Parse, don't validate\" principle improves code quality at a low cost and prevents invalid states at runtime.",
    doi: "10.1145/3830438.3830958",
    doiLink: "https://doi.org/10.1145/3830438.3830958",
    kindKey: "workshop",
  },
  {
    title:
      "Benefits of Applying Software Design Patterns to Backend Rust Applications",
    date: "2026-02-08",
    authors: ["Leon Heuer"],
    abstract:
      "Software design patterns' effects on code quality have mostly been studied in the context of object-oriented languages. In the programming language Rust, which comes with novel language concepts, compile-time safety guarantees and a distinct type system, there has been little research on design patterns. This work investigates how patterns affect software quality and compile-time enforcement of invariants through a case study on three representative components of production backend applications. An evaluation framework based on criteria derived from the SQuaRE quality model, incorporating benchmarking, static code analysis and expert interviews, is developed to assess the refactored code. The patterns typestate and newtype are applied to address existing code smells in the selected use cases. While the typestate pattern improves faultlessness and testability significantly, it comes at the cost of more structural code that can degrade readability. Code with extensive branching logic and a high number of invariants is likely to benefit most from the pattern. The newtype pattern combined with the \"Parse, don't validate\" principle offers high returns in software quality at a low cost and prevents invalid states during runtime. Overall, this work provides an initial empirical assessment of design patterns in Rust and establishes a foundation for further studies involving additional use cases and patterns.",
    doi: "arXiv:2607.02744 [cs.SE]",
    doiLink: "https://doi.org/10.48550/arXiv.2607.02744",
    kindKey: "thesis",
  },
];

export default function Publications() {
  const t = useTranslations("Publications");
  const format = useFormatter();

  return (
    <section className="alt-section padding-section" id="publications">
      <div className="container">
        <div className="row">
          <div className="column-centered">
            <h2 className="section-heading">{t("heading")}</h2>
          </div>
        </div>
        <div className="row padding-row x-axis-space-between y-axis-stretched">
          <div className="column col-no-padding">
            {publications.map((pub, i) => (
              <a
                className="publication"
                key={i}
                href={pub.doiLink}
                target="_blank"
                rel="noreferrer"
                aria-label={t("doiAria")}
              >
                <h3>{pub.title}</h3>
                <div className="publication-metadata">
                  {format.dateTime(new Date(pub.date), {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                  <span className="metadata-separator">/</span>
                  {t(`kind.${pub.kindKey}`)}
                  <span className="metadata-separator">/</span>
                  {t("authors")}
                  <span className="publication-authors">
                    {pub.authors.join(", ")}
                  </span>
                </div>
                <p>
                  {pub.abstract.slice(0, 500) +
                    (pub.abstract.length > 500 ? "..." : "")}
                </p>
                <span className="publication-doi" title="DOI">
                  {pub.doi}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
