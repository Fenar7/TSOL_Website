"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./style.scss";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/projects" },
  { label: "Articles", href: "/blog" },
  { label: "About", href: "/about-tsol" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith("/studio");
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (isStudioRoute) {
      return;
    }

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
  }, [isStudioRoute]);

  useEffect(() => {
    if (isStudioRoute) {
      document.body.style.overflow = "";
      return;
    }

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
  }, [menuOpen, isStudioRoute]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  if (isStudioRoute) {
    return null;
  }

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

        {/* Mobile-only: phone + WhatsApp quick-action icons */}
        <div className="header-mobile-actions" aria-label="Quick contact">
          <a
            href="tel:+91123456789"
            className="header-mobile-action-btn"
            aria-label="Call us"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.84 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>
          <a
            href="https://wa.me/91123456789"
            className="header-mobile-action-btn"
            aria-label="WhatsApp us"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
            </svg>
          </a>
        </div>

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
