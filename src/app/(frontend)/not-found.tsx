import ErrorPage from "@/markdown/ErrorPage.mdx";

export default function NotFound() {
  return (
    <section className="full-height alt-section-dark y-axis-centered simple-bg">
      <div className="row y-axis-centered x-axis-centered">
        <div className="column-centered">
          <ErrorPage/>
        </div>
      </div>
    </section>
  );
};
