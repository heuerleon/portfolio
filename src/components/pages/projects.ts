type ProjectDetails = {
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
    desc: "Plugin for the Minecraft Server SkyCave, providing Jobs with different advantages.",
  },
  {
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
