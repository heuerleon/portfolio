import Image from "next/image";
import { useTranslations } from "next-intl";

type Language = {
  image: string;
  title: string;
}

type Project = {
  id: string;
  image: string;
  title: string;
  langs: Language[];
  source: string;
};

const projects: Project[] = [
  {
    id: "portfolio",
    image: "/projects/portfolio.jpg",
    title: "My portfolio",
    langs: [
      { image: "/language_icons/typescript.svg", title: "TypeScript" },
      { image: "/language_icons/nextjs.svg", title: "NextJS" },
      { image: "/language_icons/vscode.svg", title: "VS Code" },
      { image: "/language_icons/sass.svg", title: "SASS/SCSS" },
    ],
    source: "https://github.com/heuerleon/portfolio",
  },
  {
    id: "osu-backup",
    image: "/projects/osu-backup.jpg",
    title: "osu!backup",
    langs: [
      { image: "/language_icons/csharp.svg", title: "C#" },
      { image: "/language_icons/vs.svg", title: "Visual Studio" },
    ],
    source: "https://github.com/heuerleon/osu-backup",
  },
  {
    id: "sc-islands",
    image: "/projects/sc-islands.jpg",
    title: "SkyCave Island System",
    langs: [
      { image: "/language_icons/java.svg", title: "Java" },
      { image: "/language_icons/intellij.svg", title: "IntelliJ IDEA" },
      { image: "/language_icons/mongodb.svg", title: "MongoDB" },
    ],
    source: "https://github.com/skycavemc/island-system",
  },
  {
    id: "sc-jobs",
    image: "/projects/sc-jobs.jpg",
    title: "SkyCave JobSystem",
    langs: [
      { image: "/language_icons/kotlin.svg", title: "Kotlin" },
      { image: "/language_icons/intellij.svg", title: "IntelliJ" },
      { image: "/language_icons/mongodb.svg", title: "MongoDB" },
    ],
    source: "https://github.com/skycavemc/JobSystem",
  },
  {
    id: "mc-gui-api",
    image: "/projects/project-3.jpg",
    title: "MC GUI API",
    langs: [
      { image: "/language_icons/java.svg", title: "Java" },
      { image: "/language_icons/intellij.svg", title: "IntelliJ IDEA" },
    ],
    source: "https://github.com/heuerleon/mcguiapi",
  },
];

export default function Projects() {
  const t = useTranslations("Projects");

  return (
    <section className="padding-section alt-section" id="projects">
      <div className="container">
        <div className="row">
          <div className="column-centered">
            <h2 className="section-heading">{t("heading")}</h2>
          </div>
        </div>
        <div className="row padding-row x-axis-space-between y-axis-stretched">
          <div className="column">
            {projects.map((project, i) => (
              <div
                className={`featured ${
                  i % 2 === 1 ? "featured-right" : ""
                }`}
                key={project.id}
              >
                <div className="image-wrapper">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="featured-thumbnail"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="featured-inner">
                  <h3>{project.title}</h3>
                  <h4>{t("description")}</h4>
                  <p>{t(`items.${project.id}.desc`)}</p>
                  <h4>{t("builtWith")}</h4>
                  <div className="icon-container">
                    {project.langs.map((icon, i) => (
                      <Image
                        key={i}
                        src={icon.image}
                        alt={t("iconAltSuffix", { name: icon.title })}
                        title={icon.title}
                        width={50}
                        height={50}
                      />
                    ))}
                  </div>
                  <a
                    href={project.source}
                    className="featured-source"
                    target="_blank"
                    rel="noreferrer"
                    title={t("viewSource")}
                    aria-label={t("sourceAria")}
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
