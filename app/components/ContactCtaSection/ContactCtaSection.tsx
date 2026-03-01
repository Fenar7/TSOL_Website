import ActionButton from "../ui/ActionButton/ActionButton";
import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

const contactCtaImageUrl =
  "https://www.figma.com/api/mcp/asset/385f008f-54fb-42d7-8fa5-4da19cdaec28";

const ContactCtaSection = () => {
  return (
    <section className="contact-cta-main">
      <div className="contact-cta-section-container flex items-center justify-center">
        <div className="contact-cta-section container">
          <SectionTitle
            className="contact-cta-title"
            label="Our Motto"
            subtitle="Architecture with a broader vision, and deeper engagement with design practice, energised by a new generation of architects and engineers grounded in timeless principles and values"
            title="Let’s Shape Life Together"
          />

          <div
            className="contact-cta-image"
            role="img"
            aria-label="Courtyard home surrounded by trees and tropical planting"
            style={{ backgroundImage: `url(${contactCtaImageUrl})` }}
          />

          <div className="contact-cta-actions">
            <ActionButton href="#" variant="outline-dark" className="contact-cta-btn">
              Explore Projects
            </ActionButton>
            <ActionButton href="#" variant="solid-dark" className="contact-cta-btn">
              Request a Consultation
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCtaSection;
