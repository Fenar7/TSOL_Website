"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./style.scss";

const navLinks = [
  { label: "About", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "Journal", href: "#" },
  { label: "Contact", href: "#" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!mobileMenuRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const menu = mobileMenuRef.current;
      if (!menu) {
        return;
      }

      const menuLinks = mobileLinksRef.current.filter(
        (item): item is HTMLAnchorElement => item !== null
      );

      gsap.set(menu, {
        clipPath: "circle(0% at calc(100% - 36px) 40px)",
        pointerEvents: "none",
      });
      gsap.set(menuLinks, { y: 20, opacity: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.set(menu, { pointerEvents: "auto" })
        .to(
          menu,
          {
            clipPath: "circle(160% at calc(100% - 36px) 40px)",
            duration: 1,
            ease: "expo.inOut",
          },
          0
        )
        .to(
          menuLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
          },
          0.22
        );

      tl.eventCallback("onReverseComplete", () => {
        gsap.set(menu, { pointerEvents: "none" });
      });

      timelineRef.current = tl;
    }, mobileMenuRef);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!timelineRef.current) {
      return;
    }

    if (menuOpen) {
      timelineRef.current.play();
      document.body.style.overflow = "hidden";
      return;
    }

    timelineRef.current.reverse();
    document.body.style.overflow = "";
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="header-container-main">
      <header className="header-container container">
        <div className="left-container logo-container">
          <Link href="/" className="logo" aria-label="TSOL home">
            TSOL
          </Link>
        </div>

        <nav className="right-container nav-links-container" aria-label="Primary">
          {navLinks.map((link, index) => (
            <div key={link.label} className="nav-item">
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
              {index < navLinks.length - 1 && (
                <span className="nav-separator" aria-hidden="true" />
              )}
            </div>
          ))}
        </nav>

        <button
          type="button"
          className={`mobile-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
        </button>
      </header>

      <div id="mobile-menu" ref={mobileMenuRef} className="mobile-menu">
        <nav className="mobile-nav container" aria-label="Mobile primary">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className="mobile-nav-link"
              onClick={closeMobileMenu}
              ref={(el) => {
                mobileLinksRef.current[index] = el;
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Header;
