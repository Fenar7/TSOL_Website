"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

type ContactCard = {
  id: string;
  title: string;
  caption: string;
  detail: string;
  href: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
  icon: "phone" | "whatsapp" | "location" | "mail";
};

const contactCards: ContactCard[] = [
  {
    id: "call",
    title: "Call Us",
    caption: "Speak With us",
    detail: "+91 123 456 789",
    href: "tel:+91123456789",
    iconSrc: "/images/icons/call.svg",
    iconWidth: 35,
    iconHeight: 35,
    icon: "phone",
  },
  {
    id: "chat",
    title: "Chat With Us",
    caption: "Speak With us",
    detail: "+91 123 456 789",
    href: "https://wa.me/91123456789",
    iconSrc: "/images/icons/whatsapp.svg",
    iconWidth: 35,
    iconHeight: 35,
    icon: "whatsapp",
  },
  {
    id: "visit",
    title: "Visit Us",
    caption: "Speak With us",
    detail: "View on Google Maps",
    href: "https://maps.google.com/?q=Akbar+Khan+Architect+Kozhikode",
    iconSrc: "/images/icons/location.svg",
    iconWidth: 25,
    iconHeight: 33,
    icon: "location",
  },
  {
    id: "mail",
    title: "Mail Us",
    caption: "Speak With us",
    detail: "hello@tsol.com",
    href: "mailto:hello@tsol.com",
    iconSrc: "/images/icons/mail.svg",
    iconWidth: 35,
    iconHeight: 26,
    icon: "mail",
  },
];

const ContactInfoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "restart none none reverse",
        },
      });

      // Cards materialise upward with stagger — border flashes in from transparent
      tl.fromTo(
        ".contact-info-card",
        {
          opacity: 0,
          y: 70,
          borderColor: "transparent",
        },
        {
          opacity: 1,
          y: 0,
          borderColor: "var(--stroke-grey, #d8d5cc)",
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
        }
      )

        // Icons pop in with a slight scale bounce
        .fromTo(
          ".contact-info-icon",
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.45, stagger: 0.12, ease: "back.out(1.4)" },
          "-=0.65"
        )

        // Card titles lift up
        .fromTo(
          ".contact-info-title",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, ease: "power3.out" },
          "-=0.45"
        )

        // Details fade last — the most important info arrives last for drama
        .fromTo(
          ".contact-info-detail",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, ease: "power3.out" },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-info-section" aria-label="Contact details" ref={sectionRef}>
      <div className="contact-info-container container">
        {contactCards.map((card) => (
          <article key={card.id} className="contact-info-card">
            <div className="contact-info-card-inner">
              <span className={`contact-info-icon is-${card.icon}`} aria-hidden="true">
                <Image
                  src={card.iconSrc}
                  alt=""
                  width={card.iconWidth}
                  height={card.iconHeight}
                  className="contact-info-icon-image"
                />
              </span>

              <div className="contact-info-copy">
                <p className="contact-info-title">{card.title}</p>
                <p className="contact-info-caption">{card.caption}</p>
                <a
                  className="contact-info-detail"
                  href={card.href}
                  target={
                    card.icon === "location" || card.icon === "whatsapp"
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    card.icon === "location" || card.icon === "whatsapp"
                      ? "noreferrer"
                      : undefined
                  }
                >
                  {card.detail}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ContactInfoSection;
