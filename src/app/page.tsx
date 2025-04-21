import Image from "next/image";
import TopIntroduction from "@/components/TopIntroduction";
import ContactForm from "@/components/ContactForm";
import Projects from "@/components/Projects";

const projectCats = [
  {
    image: "/desktop.png",
    h2: "Backend Development",
    p: "Backend services and cloud infrastructure",
  },
  {
    image: "/web.png",
    h2: "Web Development",
    p: "Sleek and responsive websites and web apps",
  },
  {
    image: "/game.png",
    h2: "Minecraft Plugins",
    p: "Server-sided mods that enhance the gameplay",
  },
  {
    image: "/mobile.png",
    h2: "Mobile Apps",
    p: "Development of native Android apps",
  },
];

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

export default function Index() {


  return (
    <div>
      <TopIntroduction />

      <section className="padding-section" id="about">
        <div className="container">
          <div className="row row-reversed padding-row y-axis-centered nowrap">
            <div className="column-min col-margin">
              <Image
                src="/leon-heuer-2-min.jpg"
                id="about-me-img"
                alt="Leon Heuer"
                width={500}
                height={500}
              ></Image>
            </div>
            <div className="column-min col-margin">
              <h1>About Me</h1>
              <p>
                My name is Leon Heuer and I am a software developer at the age
                of 19, with a passion for programming since I was only 10 years
                old. I am actively writing desktop applications with C# and server-side
                mods for Minecraft with Java and Kotlin, utilizing MongoDB as
                database management system. I also have experience with the scripting
                languages TypeScript and Python, as well as the frontend library
                React and the framework Svelte.
              </p>
              <p>
                At the moment, I am doing a dual study in applied computer
                science at{" "}
                <a href="https://www.otto.de/" target="_blank" rel="noreferrer">
                  OTTO
                </a>{" "}
                where I currently work on the OTTO App. In my free time, I
                develop server-side mods for a{" "}
                <a
                  href="https://www.minecraft.net/en-us"
                  target="_blank"
                  rel="noreferrer"
                >
                  Minecraft
                </a>{" "}
                server called{" "}
                <a
                  href="https://github.com/skycavemc"
                  target="_blank"
                  rel="noreferrer"
                >
                  SkyCave
                </a>
                , where thousands of players have already used what I developed.
              </p>
              <p>
                If you're interested in what I do, feel free to take a look at
                my{" "}
                <a
                  href="https://github.com/heuerleon?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub repositories
                </a>{" "}
                or my <a href="#featured">projects</a> listed below.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="padding-section alt-section" id="what-i-do">
        <div className="container">
          <div className="row">
            <div className="column-centered">
              <h1>What I do</h1>
            </div>
          </div>
          <div className="row padding-row x-axis-space-between y-axis-stretched">
            {projectCats.map((projectCat, i) => (
              <div key={i} className="column-centered col-4">
                <div className="box">
                  <Image
                    src={projectCat.image}
                    alt={projectCat.h2 + "icon"}
                    className="small-img"
                    width={100}
                    height={100}
                  />
                  <h3>{projectCat.h2}</h3>
                  <p>{projectCat.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <Projects />

      <ContactForm />
    </div>
  );
}
