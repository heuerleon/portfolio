import Image from "next/image";
import { MY_PROJECTS } from "./projects";

export default function FeaturedProjects() {
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
            {MY_PROJECTS.map((project, i) => (
              <div
                className={`featured ${
                  project.id % 2 === 1 ? "featured-right" : ""
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
