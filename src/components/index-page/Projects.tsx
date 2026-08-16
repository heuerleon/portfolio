import { useTranslations } from "next-intl";
import { GithubIcon } from "../Icons";

type Project = {
  id: string;
  title: string;
  stack: string[];
  source: string;
};

const projects: Project[] = [
  {
    id: "portfolio",
    title: "Portfolio",
    stack: ["TypeScript", "NextJS", "SCSS"],
    source: "https://github.com/heuerleon/portfolio",
  },
  {
    id: "osu-backup",
    title: "osu!backup",
    stack: ["C#"],
    source: "https://github.com/heuerleon/osu-backup",
  },
  {
    id: "sc-islands",
    title: "SkyCave Island System",
    stack: ["Java", "MongoDB", "Gradle"],
    source: "https://github.com/skycavemc/island-system",
  },
  {
    id: "sc-jobs",
    title: "SkyCave JobSystem",
    stack: ["Kotlin", "MongoDB", "Gradle"],
    source: "https://github.com/skycavemc/JobSystem",
  },
  {
    id: "mc-gui-api",
    title: "Minecraft GUI API",
    stack: ["Java", "Gradle"],
    source: "https://github.com/heuerleon/mcguiapi",
  },
];

export default function Projects() {
  const t = useTranslations("Projects");

  return (
    <section className="padding-section" id="projects">
      <div className="container">
        <div className="row">
          <div className="column-centered">
            <h2 className="section-heading">{t("heading")}</h2>
          </div>
        </div>
        <div className="row padding-row x-axis-space-between y-axis-stretched">
          <div className="column col-no-padding">
            <div className="projects-grid">
              {projects.map((project) => (
                <a
                  className="project"
                  key={project.id}
                  href={project.source}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("sourceAria")}
                >
                  <h3 className="project-heading">
                    {project.title}
                    <span className="project-source" title={t("viewSource")}>
                      <GithubIcon />
                    </span>
                  </h3>
                  <p>{t(`items.${project.id}.desc`)}</p>
                  <div className="project-stack">
                    {project.stack.map((item, i) => (
                      <span key={i}>{item}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
