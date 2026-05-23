import TopIntroduction from "@/components/index-page/TopIntroduction";
import AboutMeContainer from "@/components/index-page/AboutMeContainer";
import AboutMe from "@/markdown/AboutMe.mdx";
import WhatIDo from "@/components/index-page/WhatIDo";
import FeaturedProjects from "@/components/index-page/FeaturedProjects";
import Projects from "@/components/index-page/Projects";
import ContactForm from "@/components/index-page/ContactForm";

export default function Index() {
  return (
    <div>
      <TopIntroduction />
      <AboutMeContainer>
        <AboutMe/>
      </AboutMeContainer>
      <WhatIDo />
      <FeaturedProjects />
      <Projects />
      <ContactForm />
    </div>
  );
}
