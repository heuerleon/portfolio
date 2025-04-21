import Legal from "@/markdown/Legal.mdx"

export default function LegalNotice() {
  return (
    <div>
      <section className="padding-section alt-section-dark adjust-to-nav">
        <div className="row">
          <div className="column-centered">
            <h1>Legal Notice</h1>
            <p className="warning-message">
              <i className="fas fa-info-circle"></i> The content of this site is
              only available in German as of now.
            </p>
            <p>
              <a href="/">Home</a> / <a href="/legal-notice">Legal-Notice</a>
            </p>
          </div>
        </div>
      </section>

      <section className="padding-section">
        <div className="container">
          <div className="row">
            <div className="column-left">
              <Legal/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
