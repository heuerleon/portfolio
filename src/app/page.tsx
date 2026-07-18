import TopIntroduction from "@/components/index-page/TopIntroduction";
import AboutMeContainer from "@/components/index-page/AboutMeContainer";
import AboutMe from "@/markdown/AboutMe.mdx";
import ContactForm from "@/components/index-page/ContactForm";
import Publications from "@/components/index-page/Publications";
import Projects from "@/components/index-page/Projects";

export default function Index() {
  return (
    <div>
      <TopIntroduction />
      <AboutMeContainer>
        <AboutMe/>
      </AboutMeContainer>
      <Projects />
      <Publications />
      <ContactForm />
    </div>
  );
}
