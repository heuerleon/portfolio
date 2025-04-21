import Privacy from "@/markdown/Privacy.mdx"
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div>
      <section className="padding-section alt-section-dark adjust-to-nav">
        <div className="row">
          <div className="column-centered">
            <h1>Privacy Policy</h1>
            <p className="warning-message">
              <i className="fas fa-info-circle"></i> The content of this site is
              only available in German as of now.
            </p>
            <p>
              <Link href="/">Home</Link> / <Link href="/privacy-policy">Privacy-Policy</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="padding-section">
        <div className="container">
          <div className="row">
            <div className="column-left">
              <Privacy/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
