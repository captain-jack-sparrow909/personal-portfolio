"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { Project } from "@/content/projects";
import { getProjectStorytelling } from "@/content/project-storytelling";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectProductGallery({ project }: { project: Project }) {
  const gallery = getProjectStorytelling(project).gallery;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const isOpen = selectedIndex !== null;
  const selectedFrame =
    selectedIndex === null ? null : gallery.frames[selectedIndex];

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? 0 : (current + 1) % gallery.frames.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null
            ? gallery.frames.length - 1
            : (current - 1 + gallery.frames.length) % gallery.frames.length,
        );
      }

      if (event.key === "Tab") {
        const focusable = lightboxRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      openerRef.current?.focus();
    };
  }, [gallery.frames.length, isOpen]);

  const openFrame = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setSelectedIndex(index);
  };

  const moveFrame = (direction: -1 | 1) => {
    setSelectedIndex((current) => {
      if (current === null) return 0;
      return (
        (current + direction + gallery.frames.length) % gallery.frames.length
      );
    });
  };

  return (
    <section
      aria-labelledby="product-gallery-title"
      className={styles.section}
      id="product-gallery"
    >
      <ProjectSectionHeader
        description={gallery.description}
        index="06"
        label="Real product captures"
        title={gallery.title}
        titleId="product-gallery-title"
      />

      <div className={styles.productGalleryTopline}>
        <span>CURATED PRODUCT EVIDENCE</span>
        <span>{String(gallery.frames.length).padStart(2, "0")} CAPTURES</span>
      </div>

      <div className={styles.productGalleryGrid}>
        {gallery.frames.map((frame, index) => (
          <figure
            data-featured={frame.featured || undefined}
            data-reveal
            key={frame.src}
          >
            <button
              aria-label={`Open ${frame.title} capture`}
              className={styles.productCaptureButton}
              onClick={(event) => openFrame(index, event.currentTarget)}
              type="button"
            >
              <span className={styles.productCaptureImage}>
                <Image
                  alt={frame.alt}
                  fill
                  quality={82}
                  sizes={
                    frame.featured
                      ? "(max-width: 896px) 100vw, 92vw"
                      : "(max-width: 896px) 100vw, 46vw"
                  }
                  src={frame.src}
                />
              </span>
              <span aria-hidden="true" className={styles.productCaptureAction}>
                EXPAND ↗
              </span>
            </button>
            <figcaption>
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{frame.label}</small>
              </div>
              <h3>{frame.title}</h3>
              <p>{frame.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {selectedFrame && selectedIndex !== null
        ? createPortal(
            <div
              aria-labelledby="product-capture-dialog-title"
              aria-modal="true"
              className={styles.productLightbox}
              role="dialog"
            >
              <button
                aria-label="Close product capture"
                className={styles.productLightboxBackdrop}
                onClick={() => setSelectedIndex(null)}
                type="button"
              />
              <div className={styles.productLightboxPanel} ref={lightboxRef}>
                <div className={styles.productLightboxHeader}>
                  <span>
                    {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                    {String(gallery.frames.length).padStart(2, "0")}
                  </span>
                  <span>{project.name} / Product capture</span>
                  <button
                    onClick={() => setSelectedIndex(null)}
                    ref={closeRef}
                    type="button"
                  >
                    Close <kbd>Esc</kbd>
                  </button>
                </div>
                <div className={styles.productLightboxImage}>
                  <Image
                    alt={selectedFrame.alt}
                    fill
                    priority
                    quality={90}
                    sizes="96vw"
                    src={selectedFrame.src}
                  />
                </div>
                <div className={styles.productLightboxFooter}>
                  <button
                    aria-label="Previous product capture"
                    onClick={() => moveFrame(-1)}
                    type="button"
                  >
                    ← Previous
                  </button>
                  <div>
                    <span>{selectedFrame.label}</span>
                    <h3 id="product-capture-dialog-title">
                      {selectedFrame.title}
                    </h3>
                  </div>
                  <button
                    aria-label="Next product capture"
                    onClick={() => moveFrame(1)}
                    type="button"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
