"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { navigation } from "@/content/navigation";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const overlay = overlayRef.current;
    const menuButton = menuButtonRef.current;
    const overlayElements = overlay?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const main = document.querySelector<HTMLElement>("main");
    const footer = document.querySelector<HTMLElement>("footer");

    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    overlayElements?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !overlayElements?.length || !menuButton)
        return;

      const firstElement = overlayElements[0];
      const lastElement = overlayElements[overlayElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        menuButton.focus();
      } else if (event.shiftKey && document.activeElement === menuButton) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        menuButton.focus();
      } else if (!event.shiftKey && document.activeElement === menuButton) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      document.removeEventListener("keydown", handleKeyDown);
      (previouslyFocused ?? menuButton)?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav aria-label="Primary navigation" className="site-header__inner">
        <Link
          aria-label={`${siteConfig.name}, home`}
          className="site-header__monogram"
          data-magnetic
          href="#top"
        >
          <span aria-hidden="true">JK</span>
        </Link>

        <div className="site-header__links">
          {navigation.map((item, index) => (
            <Link data-magnetic href={item.href} key={item.href}>
              <span className="site-header__number">0{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </div>

        <a className="site-header__availability" data-magnetic href="#contact">
          <span aria-hidden="true" className="status-dot" />
          <span>{siteConfig.availability}</span>
        </a>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="site-header__menu-trigger"
          onClick={() => setMenuOpen((current) => !current)}
          ref={menuButtonRef}
          type="button"
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className="site-header__menu-icon">
            <i />
            <i />
          </span>
        </button>
      </nav>

      <div
        aria-hidden={!menuOpen}
        className="mobile-menu"
        data-open={menuOpen ? "true" : "false"}
        id="mobile-navigation"
        ref={overlayRef}
      >
        <div className="mobile-menu__meta">
          <p>Navigation / Jabir Khan</p>
          <p>Dubai — Global</p>
        </div>
        <div className="mobile-menu__body">
          <div className="mobile-menu__primary">
            {navigation.map((item, index) => (
              <Link
                href={item.href}
                key={item.href}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span>0{index + 1}</span>
                {item.label}
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
          <div className="mobile-menu__projects">
            <p>Selected systems</p>
            {projects.map((project) => (
              <Link
                href={`#project-${project.slug}`}
                key={project.slug}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                {project.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mobile-menu__footer">
          <span>{siteConfig.availability}</span>
          <span>AI / WEB / MOBILE / CLOUD</span>
        </div>
      </div>
    </header>
  );
}
