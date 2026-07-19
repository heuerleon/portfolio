import TopIntroduction from "@/components/index-page/TopIntroduction";
import AboutMeContainer from "@/components/index-page/AboutMeContainer";
import AboutMe from "@/markdown/AboutMe.mdx";
import ContactForm from "@/components/index-page/ContactForm";
import Publications, { publications } from "@/components/index-page/Publications";
import Projects from "@/components/index-page/Projects";

const personId = "https://heuer.ovh/#person";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: "Leon Heuer",
      url: "https://heuer.ovh",
      image: "https://heuer.ovh/portrait.jpeg",
      jobTitle: "Full-Stack Developer",
      description:
        "Full-stack developer and dual computer science student from Germany with an international focus.",
      email: "mailto:leon@heuer.ovh",
      worksFor: {
        "@type": "Organization",
        name: "OTTO",
        url: "https://www.otto.de/",
      },
      sameAs: [
        "https://github.com/heuerleon",
        "https://www.linkedin.com/in/leonheuer/",
        "https://www.instagram.com/heuerleon/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://heuer.ovh/#website",
      url: "https://heuer.ovh",
      name: "Leon Heuer's portfolio",
      author: { "@id": personId },
    },
    ...publications.map((pub) => ({
      "@type": "ScholarlyArticle",
      headline: pub.title,
      abstract: pub.abstract,
      datePublished: pub.date,
      identifier: pub.doi,
      url: pub.doiLink,
      author: pub.authors.map((name) =>
        name === "Leon Heuer"
          ? { "@id": personId }
          : { "@type": "Person", name },
      ),
    })),
  ],
};

export default function Index() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
