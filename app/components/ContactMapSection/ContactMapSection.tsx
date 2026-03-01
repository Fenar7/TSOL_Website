import "./style.scss";

const mapEmbedUrl =
  "https://maps.google.com/maps?q=Akbar%20Khan%20Architect%2C%20Civil%20Station%2C%20Kozhikode&t=&z=16&ie=UTF8&iwloc=&output=embed";

const ContactMapSection = () => {
  return (
    <section className="contact-map-section" aria-label="Location map">
      <div className="contact-map-container container">
        <div className="contact-map-frame">
          <iframe
            title="Akbar Khan Architect location map"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;
