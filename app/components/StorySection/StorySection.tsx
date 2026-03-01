import "./style.scss";

const StorySection = () => {
  return (
    <section className="story-section-main" aria-label="The Founder Story">
      <div className="story-section-container container">
        <header className="story-section-header">
          <h2 className="story-title">The Founder</h2>
          <p className="story-subtitle">Akbar Khan Architect</p>
          <p className="story-designation">
            Principal Architect, Akbar Khan Associates Architects
          </p>
        </header>

        <div className="story-body">
          <p>
            A seasoned and innovative architect with over three decades of proven
            expertise in conceiving and bringing to fruition a diverse array of
            residential, commercial, healthcare, and public projects. Graduated from
            the College of Engineering Trivandrum in 1991, his journey began as a
            freelancing architect, evolving into the establishment of AKA in 1994.
            Through the years, he has cultivated a distinctive style and approach,
            earning the trust and loyalty of a discerning clientele.
          </p>

          <p className="story-highlight">TSOL Architecture</p>

          <p>
            Our proficiency extends to utilising a spectrum of cutting-edge software
            tools, to seamlessly translate creative visions into tangible designs.
            Adept at budget planning, negotiation, and project appraisal, we navigate
            complex landscapes to ensure alignment with client expectations and
            stakeholder interests.
          </p>

          <p>
            With a track record of delivering successful projects and an unwavering
            commitment to design excellence, we bring a unique blend of creativity,
            experience, and business acumen to every architectural endeavour.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
