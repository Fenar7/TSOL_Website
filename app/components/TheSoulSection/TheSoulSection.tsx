import "./style.scss";

const theSoulImageUrl =
  "https://www.figma.com/api/mcp/asset/3b7ba4e2-7a3e-4918-97fe-0d90395b708d";

const TheSoulSection = () => {
  return (
    <section className="the-soul-main" aria-label="The Soul">
      <div className="the-soul-container container">
        <div className="the-soul-left-column">
          <div className="the-soul-kicker-row">
            <span className="the-soul-kicker-line" aria-hidden="true" />
            <p className="the-soul-kicker">The Soul</p>
          </div>

          <div className="the-soul-copy">
            <p>
              At <strong>TSOL, The Soul of Architecture</strong> is the embodiment
              of human experiences, aspirations and stories .The Soul of Architecture
              lies in its ability to transform spaces into places that evoke
              emotions, inspire connection, and reflect the inner world of those who
              inhabit them.
            </p>

            <p>
              Architecture is a dialogue between the built environment and the human
              spirit we strive to create spaces that not only functional but also
              connect with the deepest aspects of need for harmony, expression and
              belonging.
            </p>
          </div>
        </div>

        <div className="the-soul-right-column">
          <div
            className="the-soul-image"
            role="img"
            aria-label="Landscape with water body and elevated residence"
            style={{ backgroundImage: `url(${theSoulImageUrl})` }}
          />
        </div>
      </div>
    </section>
  );
};

export default TheSoulSection;
