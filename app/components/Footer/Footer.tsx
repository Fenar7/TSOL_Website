import Image from "next/image";
import Link from "next/link";
import "./style.scss";

const Footer = () => {
  return (
    <div className="footer-container-main flex items-center justify-center">
      <footer className="footer-container container" aria-label="Site footer">
        <div className="left-section-contact-info-section">
          <section className="footer-contact-group">
            <h3 className="footer-group-title">Office Address</h3>
            <p className="footer-group-text">
              VILLA GRACE, Civil View St, Civil Station, Eranhippalam, Kozhikode,
              Kerala 673020
            </p>
          </section>

          <section className="footer-contact-group">
            <h3 className="footer-group-title">Phone</h3>
            <a className="footer-group-link" href="tel:09895481488">
              098954 81488
            </a>
          </section>

          <section className="footer-contact-group">
            <h3 className="footer-group-title">Email</h3>
            <a className="footer-group-link" href="mailto:email@gmail.com">
              email@gmail.com
            </a>
          </section>

          <div className="footer-social-links">
            <a href="#" aria-label="LinkedIn" className="footer-social-link">
              <Image
                src="/images/icons/Vector.svg"
                alt=""
                aria-hidden="true"
                width={19}
                height={18}
              />
            </a>
            <a href="#" aria-label="Facebook" className="footer-social-link">
              <Image
                src="/images/icons/Vector-1.svg"
                alt=""
                aria-hidden="true"
                width={18}
                height={18}
              />
            </a>
            <a href="#" aria-label="Instagram" className="footer-social-link">
              <Image
                src="/images/icons/Vector-2.svg"
                alt=""
                aria-hidden="true"
                width={19}
                height={18}
              />
            </a>
          </div>
        </div>

        <nav className="right-section link-section" aria-label="Footer links">
          <h3 className="footer-group-title footer-links-title">Links</h3>
          <div className="footer-links-list">
            <Link href="/">Home</Link>
            <a href="#">About</a>
            <a href="#">Portfolio</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
        </nav>

        <div className="bottom-logo-section">
          <Image
            src="/images/TSOL-grey.png"
            alt="TSOL"
            className="footer-logo"
            width={438}
            height={105}
          />
          <p>© 2025 All rights reserved. tsol.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
