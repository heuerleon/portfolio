import Link from "next/link";
import SocialMediaContainer from "@/components/SocialMediaContainer";

export default function Footer() {
  return (
    <section className="alt-section-dark" id="footer">
      <div className="container">
        <div className="row padding-row">
          <div className="column-centered">
            <SocialMediaContainer noTopMargin/>
            <span>Designed & built by Leon Heuer</span>
            <span>
              <a
                href="https://github.com/heuerleon/portfolio"
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </span>
            <span className="light">
              © {new Date().getFullYear()} Leon Heuer, All rights reserved | <Link href="/legal">Legal Notice</Link> | <Link href="/privacy">Privacy Policy</Link>
            </span>
            <span className="light">
              Contains images from{" "}
              <a href="https://unsplash.com/" target="_blank" rel="noreferrer">
                Unsplash
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
