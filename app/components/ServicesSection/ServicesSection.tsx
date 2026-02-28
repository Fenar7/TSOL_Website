import SectionTitle from "../ui/SectionTitle/SectionTitle";
import "./style.scss";

const servicesItems = [
  {
    id: "service-architecture",
    imageUrl: "https://www.figma.com/api/mcp/asset/d10fa574-0675-4f07-8a96-288b09350530",
    title: "Architecture",
    description:
      "We design with lived experience in mind. Plans are shaped for posture, movement, rest, gathering, and openness, so the space feels clear, calm, and true to life.",
  },
  {
    id: "service-interiors",
    imageUrl: "https://www.figma.com/api/mcp/asset/fd7a470c-88c8-436a-8a7d-4b5f7772e572",
    title: "Interiors",
    description:
      "Interiors carry the soul of daily life. Proportion, material, comfort, and atmosphere are held with care, so the space feels human, grounded, and worth returning to.",
  },
  {
    id: "service-landscaping",
    imageUrl: "https://www.figma.com/api/mcp/asset/3f931599-3aa3-43c3-9433-2e576ec1d069",
    title: "Landscaping",
    description:
      "Landscape extends the space into nature. Shade, air, paths, and quiet corners are shaped to feel natural through the day, and to mature with time.",
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section-main">
      <div className="services-section-container flex items-center justify-center">
        <div className="services-section-content container">
          <SectionTitle
            className="services-section-title"
            label="Services"
            title="The Shape Of Life"
          />

          <div className="services-items-container">
            {servicesItems.map((item) => (
              <article key={item.id} className="service-item">
                <div
                  className="service-item-image"
                  role="img"
                  aria-label={item.title}
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
                <h3 className="service-item-title">{item.title}</h3>
                <p className="service-item-description">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
