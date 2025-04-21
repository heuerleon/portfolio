import TopIntroduction from "@/components/TopIntroduction";
import AboutMeContainer from "@/components/AboutMeContainer";
import AboutMe from "@/markdown/AboutMe.mdx";
import WhatIDo from "@/components/WhatIDo";
import FeaturedProjects from "@/components/FeaturedProjects";
import Projects from "@/components/Projects";
import ContactForm from "@/components/ContactForm";

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
