import Image from "next/image";


type Language = {
  image: string;
  title: string;
}

type Project = {
  image: string;
  title: string;
  langs: Language[];
  source: string;
  desc: string;
};

const projects: Project[] = [
  {
    image: "/projects/portfolio.jpg",
    title: "My portfolio",
    langs: [
      { image: "/language_icons/typescript.svg", title: "TypeScript" },
      { image: "/language_icons/nextjs.svg", title: "NextJS" },
      { image: "/language_icons/vscode.svg", title: "VS Code" },
      { image: "/language_icons/sass.svg", title: "SASS/SCSS" },
    ],
    source: "https://github.com/heuerleon/portfolio",
    desc: "My self-made portfolio website you're currently looking at.",
  },
  {
    image: "/projects/osu-backup.jpg",
    title: "osu!backup",
    langs: [
      { image: "/language_icons/csharp.svg", title: "C#" },
      { image: "/language_icons/vs.svg", title: "Visual Studio" },
    ],
    source: "https://github.com/heuerleon/osu-backup",
    desc: 'GUI based backupper for the game "osu!". Allows exporting you local player data and importing it conveniently on another machine. ',
  },
  {
    image: "/projects/sc-islands.jpg",
    title: "SkyCave Island System",
    langs: [
      { image: "/language_icons/java.svg", title: "Java" },
      { image: "/language_icons/intellij.svg", title: "IntelliJ IDEA" },
      { image: "/language_icons/mongodb.svg", title: "MongoDB" },
    ],
    source: "https://github.com/skycavemc/island-system",
    desc: "An island system for the Minecraft server SkyCave. Allows creation and management of protected Islands with their own regions, members etc.",
  },
  {
    image: "/projects/sc-jobs.jpg",
    title: "SkyCave JobSystem",
    langs: [
      { image: "/language_icons/kotlin.svg", title: "Kotlin" },
      { image: "/language_icons/intellij.svg", title: "IntelliJ" },
      { image: "/language_icons/mongodb.svg", title: "MongoDB" },
    ],
    source: "https://github.com/skycavemc/JobSystem",
    desc:
      "Plugin for the Minecraft Server SkyCave, providing Jobs with different advantages.",
  },
  {
    image: "/projects/project-3.jpg",
    title: "MC GUI API",
    langs: [
      { image: "/language_icons/java.svg", title: "Java" },
      { image: "/language_icons/intellij.svg", title: "IntelliJ IDEA" },
    ],
    source: "https://github.com/heuerleon/mcguiapi",
    desc:
      "MC GUI API is an API for creating graphical user interfaces using inventories in minecraft.",
  },
];

export default function Projects() {
  return (
    <section className="padding-section alt-section" id="projects">
      <div className="container">
        <div className="row">
          <div className="column-centered">
            <h1>Projects</h1>
          </div>
        </div>
        <div className="row padding-row x-axis-space-between y-axis-stretched">
          <div className="column">
            {projects.map((project, i) => (
              <div
                className={`featured ${
                  i % 2 === 1 ? "featured-right" : ""
                }`}
                key={i}
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
                  <h1>{project.title}</h1>
                  <h3>Description</h3>
                  <p>{project.desc}</p>
                  <h3>Built with</h3>
                  <div className="icon-container">
                    {project.langs.map((icon, i) => (
                      <Image
                        key={i}
                        src={icon.image}
                        alt={icon.title + "icon"}
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
                    title="View on GitHub"
                    aria-label="source"
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
