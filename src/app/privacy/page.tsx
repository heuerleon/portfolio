import Privacy from "@/markdown/Privacy.mdx"
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div>
      <section className="padding-section">
        <div className="container">
          <div className="row">
            <div className="column-left">
              <Link href="/" className="back-link"><i className="fas fa-arrow-left" /> Go Back Home</Link>
              <Privacy/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
