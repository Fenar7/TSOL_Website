import "./style.scss";

const approachImageOne =
  "https://www.figma.com/api/mcp/asset/97495494-aa32-4e50-96cc-057d0b295f25";
const approachImageTwo =
  "https://www.figma.com/api/mcp/asset/eb1926d4-40f9-4176-b7c4-7a7a39a75d07";
const approachImageThree =
  "https://www.figma.com/api/mcp/asset/c7185cfc-d6f5-474f-89e8-42a0d2c61025";

const OurApproachSection = () => {
  return (
    <section className="our-approach-main" aria-label="Our Approach">
      <div className="our-approach-container container">
        <div className="our-approach-intro">
          <div className="our-approach-kicker-row">
            <span className="our-approach-kicker-line" aria-hidden="true" />
            <p className="our-approach-kicker">Our Approach</p>
            <span className="our-approach-kicker-line" aria-hidden="true" />
          </div>

          <p className="our-approach-copy">
            The buildings form emerges from lived patterns. Instead of starting
            with dramatic shapes or fashionable style,{" "}
            <strong className="our-approach-copy-large">TSOL, thinks</strong> about{" "}
            <strong>The Shape of Life</strong> start with daily human activities..
            how people move, pause, how they meet, rest , argue, celebrate or feel
            safe. A kitchen becomes central because family life gathers there -
            streets curve because people slow down and linger there - not because
            straight lines are more efficient.
          </p>
        </div>

        <div className="our-approach-cards">
          <article className="our-approach-card">
            <p className="our-approach-card-number">01</p>
            <div
              className="our-approach-card-image"
              role="img"
              aria-label="Courtyard architecture with plants and people"
              style={{ backgroundImage: `url(${approachImageOne})` }}
            />
            <p className="our-approach-card-text">
              <span className="our-approach-card-text-lead">A space</span> is defined
              by how it is lived. By posture and movement, rest and gathering,
              silence and openness.
            </p>
          </article>

          <article className="our-approach-card">
            <p className="our-approach-card-number">02</p>
            <div
              className="our-approach-card-image"
              role="img"
              aria-label="House and landscape approach view"
              style={{ backgroundImage: `url(${approachImageTwo})` }}
            />
            <p className="our-approach-card-text">
              <span className="our-approach-card-text-lead">Soul</span> is what turns
              structure into presence. It is the quiet quality that makes a space
              feel alive and worth returning to.
            </p>
          </article>

          <article className="our-approach-card">
            <p className="our-approach-card-number">03</p>
            <div
              className="our-approach-card-image"
              role="img"
              aria-label="Traditional house facade"
              style={{ backgroundImage: `url(${approachImageThree})` }}
            />
            <p className="our-approach-card-text">
              When design is guided by life, it becomes{" "}
              <span className="our-approach-card-text-lead">timeless</span>, because
              it is rooted in what does not change in life.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default OurApproachSection;
