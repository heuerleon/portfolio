import TopIntroduction from "@/components/pages/TopIntroduction";
import AboutMe from "@/markdown/AboutMe.mdx";
import Projects from "@/components/pages/Projects";

export default function Index() {
  return (
    <div>
      <TopIntroduction>
        <AboutMe />
      </TopIntroduction>
      <Projects />
    </div>
  );
}
