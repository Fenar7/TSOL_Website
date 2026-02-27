import "./style.scss";

const aboutImageUrl =
  "https://www.figma.com/api/mcp/asset/3e0e6743-eadc-4607-994b-403901948724";

const AboutSection = () => {
  return (
    <section className="about-section-main" aria-label="About TSOL">
      <div className="about-section-container container">
        <div className="about-left-column">
          <div className="about-kicker-row">
            <span className="about-kicker-line" aria-hidden="true" />
            <p className="about-kicker">What is TSOL</p>
          </div>

          <div className="about-copy">
            <p>
              In architecture <strong>The Shape Of Life</strong> is a poetic way of
              talking about how buildings take form from living patterns, not just
              from geometry style or technology what shape does human life naturally
              want to take and how can architect support it?
            </p>

            <p>
              In the quiet geometry of existence, every curve and line echoes the
              pulse of creation <strong>The Shape Of Life</strong>,{" "}
              <strong className="about-inline-tsol">TSOL</strong>{" "}
              <em>(tee-sol)</em>, is more than a name, its a philosophy - the sacred
              union form and spirit, where buildings rise not as inert structures
              but as sanctuary for the human soul.
            </p>

            <p>
              &quot;Each thing has an outer as well as an inner meaning every external
              form is complimented by an inner reality which is its hidden, internal
              essence. The <em>manifest</em> is the sensible form, that which
              emphasises the quantitative aspect which is most readily comprehensible,
              such as the shape of a building, the form of a pool, the body of a
              man. The <em>hidden</em> is the essential or qualitative aspect which
              all things possess. in order to know a thing is in its completeness,
              one must not only seek its outward and ephemeral reality but also its
              essential and inward reality - that in which the eternal beauty of
              every object resides.&quot;
            </p>
          </div>

          <a className="about-know-more" href="#">
            <span>Know More</span>
            <span className="about-know-arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <div className="about-stats">
            <article className="about-stat">
              <p className="about-stat-title">Since 1991</p>
              <p className="about-stat-text">Practice led by Akbar Khan</p>
            </article>
            <span className="about-stat-divider" aria-hidden="true" />
            <article className="about-stat">
              <p className="about-stat-title">250+</p>
              <p className="about-stat-text">Projects delivered across sectors</p>
            </article>
          </div>
        </div>

        <div className="about-right-column">
          <div
            className="about-image"
            role="img"
            aria-label="Interior architectural latticework with filtered natural light"
            style={{ backgroundImage: `url(${aboutImageUrl})` }}
          />
          <p className="about-caption">
            the light filters through latticework - evoking the breath of nature..
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
