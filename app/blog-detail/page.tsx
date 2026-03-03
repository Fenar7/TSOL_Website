import Image from "next/image";
import "./style.scss";

const BlogDetailPage = () => {
    return (
        <main className="blog-detail-main">
            <section className="blog-detail-section">
                <div className="blog-detail-container container">
                    {/* ── Cover image ── */}
                    <div className="blog-detail-cover">
                        <Image
                            src="/images/blog-image.png"
                            alt="Pendant lamps hanging in a bright interior"
                            fill
                            priority
                            className="blog-detail-cover-image"
                            sizes="(max-width: 639px) calc(100vw - 28px), (max-width: 1023px) calc(100vw - 40px), 1720px"
                        />
                    </div>

                    {/* ── Header ── */}
                    <header className="blog-detail-header">
                        <h1 className="blog-detail-title">Light That Behaves</h1>
                        <p className="blog-detail-date">19 &middot; 01 &middot; 2026</p>
                    </header>

                    {/* ── Body ── */}
                    <article className="blog-detail-body">
                        <p>
                            A space can be &ldquo;bright&rdquo; and still feel uncomfortable.
                        </p>
                        <p>
                            It can have huge windows and still feel harsh, exposed, and tiring.
                        </p>
                        <p>
                            That&rsquo;s because light isn&rsquo;t just a feature. It&rsquo;s a daily texture. It changes by the hour. It changes by season. And it quietly decides whether a place feels calm or chaotic.
                        </p>
                        <p>
                            When we say &ldquo;light that behaves,&rdquo; we mean this.
                        </p>
                        <p>
                            Light that supports the life inside the building, instead of forcing people to work around it.
                        </p>
                        <p>
                            The difference between good light and imposing light.
                        </p>
                        <p>
                            How does light sustain itself? By cycling. Our days run on switches. Bright mornings.
                        </p>
                        <p>
                            Good light agrees. You don&rsquo;t notice it because it&rsquo;s &ldquo;natural.&rdquo; You said so! That the season is easier to be in. Your eyes relax. Your body slows down. The room feels settled.
                        </p>
                        <p>
                            This is where the soul of a space often comes from. Not a sofa section. Not a statement wall. Just comfort you can feel.
                        </p>
                        <p>
                            Start with the day, not the window.
                        </p>
                        <p>
                            Instead of asking &ldquo;How big should this opening be?&rdquo; start with questions like:
                        </p>

                        <ul>
                            <li>Where do you want the calmest light in the morning</li>
                            <li>Where do you need naturally bright light in your work hours</li>
                            <li>Which rooms should feel softer in the afternoon</li>
                            <li>Which areas need full evening light</li>
                        </ul>

                        <p>
                            When you map this out, window decisions become obvious.
                        </p>
                        <p>
                            What makes light feel uncomfortable.
                        </p>
                        <p>
                            It is rare that a real common issue is a space feeling wrong even when it looks &ldquo;modern.&rdquo;
                        </p>
                        <p className="blog-detail-callout">It&rsquo;s glare.</p>
                        <p>
                            Glare is not brightness. Glare is contrast. A bright opening in a darker room forces your eyes to constantly adjust. You feel it as irritation and fatigue.
                        </p>
                        <p>It won&rsquo;t feel like &ldquo;too much light.&rdquo;</p>
                        <p>
                            It means heat ratio, not light distribution, lack of shade, and harsh changes. How a space is used: if the living room becomes an oven at 2pm, people adjust. The curtains close, even if the outside is beautiful.
                        </p>
                        <p>What you can balance it:</p>
                        <p>
                            A room can be very well lit and still feel massive. If people feel watched, they won&rsquo;t relax. Light and privacy must be designed together.
                        </p>
                        <p>
                            All light is not merely decorative dimension.
                        </p>
                        <p>
                            Many spaces look amazing in one photo but feel flat or harsh in the real rhythms of the day. Good light is not a &ldquo;moment.&rdquo; It is a pattern.
                        </p>
                        <p>
                            What you can balance:
                        </p>
                        <p>
                            Designing comfortable daylight is not simply a maths problem. It is about frames and disciplines working together.
                        </p>
                        <p>
                            Overhangs and eaves.
                        </p>
                        <p>
                            We treat each side of the building differently. Not every fa&ccedil;ade faces the same thing. It is same kind of openness.
                        </p>
                        <p>
                            Shading: not just add-on.
                        </p>
                        <p>
                            Overhangs, verandahs, perforated screens, and recesses are part of the architecture, not accessories. Their shape and mass. They protect comfort.
                        </p>
                        <p>Depth matters.</p>
                        <p>
                            A shallow room with a huge window often gives harsh light.
                        </p>
                        <p>
                            A more generous room with correct opening to glass ratio distributes illumination and calmer comfort.
                        </p>
                        <p>
                            Transitions are also comfort.
                        </p>
                        <p>
                            A threshold, a shaded edge, a courtyard, a verandah. These aren&rsquo;t &ldquo;extras-spaces.&rdquo; They are what make the light and air feel natural instead of aggressive.
                        </p>
                        <p>
                            Materials also count.
                        </p>
                        <p>
                            Smooth white surfaces bounce light and increase glare.
                        </p>
                        <p>
                            Textured, inclined surfaces with warmth soften the same light. More here without &ldquo;decorating&rdquo; anything.
                        </p>
                        <p>
                            A quick checklist clients can actually use.
                        </p>
                        <p>
                            If you&rsquo;re reviewing a design or walking through a space, ask:
                        </p>

                        <ul>
                            <li>Does the main living room feel calm at mid-day</li>
                            <li>Can you sit comfortably without squinting</li>
                            <li>Do work areas have steady light without harsh heat</li>
                            <li>Is privacy produced without old-school draughty</li>
                            <li>Does the house feel calm in the evening not dead or overly bright</li>
                        </ul>

                        <p>
                            If the answer is &ldquo;yes&rdquo; to most of these, the light is behaving.
                        </p>

                        <p className="blog-detail-callout">The takeaway.</p>

                        <p>
                            Good design is not about making a space brighter.
                        </p>
                        <p>
                            It is about making a space easier to live in.
                        </p>
                        <p>
                            When light is shaped with intent, comfort becomes consistent. The architecture stops performing and starts supporting. That is when a place feels alive.
                        </p>
                    </article>
                </div>
            </section>
        </main>
    );
};

export default BlogDetailPage;