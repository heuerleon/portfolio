import Image from "next/image";

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

export default function WhatIDo() {
  return (
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
  )
}