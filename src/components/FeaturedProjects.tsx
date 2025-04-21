import Image from "next/image";

const featured = [
  {
    id: 0,
    image: "/projects/portfolio.jpg",
    title: "My portfolio",
    langs: [
      { image: "/language_icons/typescript.svg", title: "TypeScript" },
      { image: "/language_icons/nextjs.svg", title: "NextJS" },
      { image: "/language_icons/vscode.svg", title: "VS Code" },
      { image: "/language_icons/sass.svg", title: "SASS/SCSS" },
    ],
    source: "https://github.com/heuerleon/leonheuer-portfolio",
    desc: "My personal portfolio website you're currently looking at.",
  },
  {
    id: 1,
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
    id: 2,
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
];

export default function FeaturedProjects() {
  return (
    <section className="padding-section" id="featured">
    <div className="container">
      <div className="row">
        <div className="column-centered">
          <h1>Featured Projects</h1>
        </div>
      </div>
      <div className="row padding-row x-axis-space-between y-axis-stretched">
        <div className="column">
          {featured.map((project, i) => (
            <div
              className={`featured ${project.id % 2 === 1 ? "featured-right" : ""
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
  )
}