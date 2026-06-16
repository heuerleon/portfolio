type ProjectDetails = {
  id: number;
  image: string;
  title: string;
  langs: {
    image: string;
    title: string;
  }[];
  source: string;
  desc: string;
};

export const MY_PROJECTS: ProjectDetails[] = [
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
    source: "https://github.com/heuerleon/portfolio",
    desc: "My self-made portfolio website you're currently looking at.",
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
  {
    id: 3,
    image: "/projects/sc-jobs.jpg",
    title: "SkyCave JobSystem",
    langs: [
      { image: "/language_icons/kotlin.svg", title: "Kotlin" },
      { image: "/language_icons/intellij.svg", title: "IntelliJ" },
      { image: "/language_icons/mongodb.svg", title: "MongoDB" },
    ],
    source: "https://github.com/skycavemc/JobSystem",
    desc: "Plugin for the Minecraft Server SkyCave, providing Jobs with different advantages.",
  },
  {
    id: 4,
    image: "/projects/project-3.jpg",
    title: "MC GUI API",
    langs: [
      { image: "/language_icons/java.svg", title: "Java" },
      { image: "/language_icons/intellij.svg", title: "IntelliJ IDEA" },
    ],
    source: "https://github.com/heuerleon/mcguiapi",
    desc: "MC GUI API is an API for creating graphical user interfaces using inventories in minecraft.",
  },
];
