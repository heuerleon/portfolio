import Link from "next/link";

export default function ContactSuccess() {
  return (
    <section className="full-height alt-section-dark y-axis-centered simple-bg">
      <div className="row y-axis-centered x-axis-centered">
        <div className="column-centered">
          <h1>Thank you for the request!</h1>
          <p>
            Your message has been sent directly to my phone. I will read it as soon as possible. Expect an answer within 24 hours via E-Mail.
          </p>
          <p>
            <Link href="/">Return to home</Link>
          </p>
        </div>
      </div>
    </section>
  );
};
