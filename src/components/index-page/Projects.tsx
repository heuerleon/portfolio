"use client";

import { useState } from "react";
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
  description: string;
};

const projectsDefault: Project[] = [
  {
    image: "/projects/sc-jobs.jpg",
    title: "SkyCave JobSystem",
    langs: [
      { image: "/language_icons/kotlin.svg", title: "Kotlin" },
      { image: "/language_icons/intellij.svg", title: "IntelliJ" },
      { image: "/language_icons/mongodb.svg", title: "MongoDB" },
    ],
    source: "https://github.com/skycavemc/JobSystem",
    description: "Plugin for the Minecraft Server SkyCave, providing Jobs with different advantages.",
  },
  {
    image: "/projects/project-3.jpg",
    title: "MC GUI API",
    langs: [
      { image: "/language_icons/java.svg", title: "Java" },
      { image: "/language_icons/intellij.svg", title: "IntelliJ IDEA" },
    ],
    source: "https://github.com/heuerleon/mcguiapi",
    description: "MC GUI API is an API for creating graphical user interfaces using inventories in minecraft.",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(projectsDefault);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortFilter, setSortFilter] = useState(0);
  const [sortTitle, setSortTitle] = useState("Sort by (Default)");

  function sortProjects(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) {
    event.preventDefault();
    setSortFilter(index);
    setShowSortDropdown(false);
    switch (index) {
      case 1: {
        sortProjectsAZ();
        setSortTitle("Sort by (A to Z)");
        break;
      }
      case 2: {
        sortProjectsZA();
        setSortTitle("Sort by (Z to A)");
        break;
      }
      default: {
        sortProjectsDefault();
        setSortTitle("Sort by (Default)");
      }
    }
  }

  function sortProjectsAZ() {
    setProjects(prev => [...prev].sort((a, b) => a.title.localeCompare(b.title)));
  }

  function sortProjectsZA() {
    setProjects(prev => [...prev].sort((a, b) => b.title.localeCompare(a.title)));
  }

  function sortProjectsDefault() {
    setProjects(projectsDefault);
  }

  return (
    <section className="padding-section alt-section" id="projects">
      <div className="container">
        <div className="row">
          <div className="column-left">
            <h1>More Projects</h1>
            <div className="dropdown">
              <button
                className="dropdown-title"
                onClick={() => setShowSortDropdown((it) => !it)}
              >
                {sortTitle}
              </button>
              <ul
                className={`dropdown-list ${showSortDropdown ? "dropdown-visible" : ""
                  }`}
              >
                <li>
                  <button
                    className={sortFilter === 0 ? "selected" : ""}
                    onClick={(event) => sortProjects(event, 0)}
                  >
                    Default
                  </button>
                </li>
                <li>
                  <button
                    className={sortFilter === 1 ? "selected" : ""}
                    onClick={(event) => sortProjects(event, 1)}
                  >
                    A to Z
                  </button>
                </li>
                <li>
                  <button
                    className={sortFilter === 2 ? "selected" : ""}
                    onClick={(event) => sortProjects(event, 2)}
                  >
                    Z to A
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row padding-row y-axis-stretched">
          {projects.map((project, i) => (
            <div key={i} className="column-centered col-3">
              <div className="box box-image">
                <h1>{project.title}</h1>
                <Image
                  src={project.image}
                  alt={project.title}
                  className="box-thumbnail"
                  width={500}
                  height={500}
                />
                <div className="box-inner">
                  <h3>Description</h3>
                  <p>{project.description}</p>
                  <h3>Built with</h3>
                  <div className="icon-container">
                    {project.langs.map((language, i) => (
                      <Image
                        key={i}
                        src={language.image}
                        alt={language.title + "icon"}
                        title={language.title}
                        width={50}
                        height={50}
                      />
                    ))}
                  </div>
                  <a
                    href={project.source}
                    className="box-source"
                    target="_blank"
                    rel="noreferrer"
                    title="View on GitHub"
                    aria-label="source"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}