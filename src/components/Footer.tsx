import Link from "next/link";

export default function Footer() {
  return (
    <section className="alt-section-dark" id="footer">
      <div className="container">
        <div className="row padding-row">
          <div className="column-centered">
            <div className="social-media-container">
              <a
                href="https://github.com/heuerleon"
                target="_blank"
                rel="noreferrer"
                aria-label="github"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.instagram.com/heuerleon/"
                target="_blank"
                rel="noreferrer"
                aria-label="instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/leonheuer/"
                target="_blank"
                rel="noreferrer"
                aria-label="linkedin"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
            <span>Designed & built by Leon Heuer</span>
            <span>
              <a
                href="https://github.com/heuerleon/leonheuer-portfolio"
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </span>
            <span className="light">
              All rights reserved | <Link href="/legal">Legal Notice</Link> | <Link href="/privacy">Privacy Policy</Link>
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
