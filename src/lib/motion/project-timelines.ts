"use client";

import type { ProjectSceneMode } from "@/content/projects";
import { emitProjectSceneProgress } from "@/hooks/useSectionProgress";

import { gsap, ScrollTrigger } from "./gsap";

type PausableAnimation = {
  pause: () => unknown;
  resume: () => unknown;
};

type ProjectTimelineController = {
  animations: PausableAnimation[];
  cleanup: () => void;
};

function getProjectMode(chapter: HTMLElement): ProjectSceneMode | null {
  const mode = chapter.dataset.sceneMode;

  if (
    mode === "devpulse" ||
    mode === "rontgen" ||
    mode === "cognora" ||
    mode === "orkestria"
  ) {
    return mode;
  }

  return null;
}

function publishProgress(chapter: HTMLElement, progress: number): void {
  const mode = getProjectMode(chapter);
  if (!mode) return;

  const normalized = Math.min(1, Math.max(0, progress));
  chapter.style.setProperty("--chapter-progress", normalized.toFixed(4));
  emitProjectSceneProgress({ mode, progress: normalized });
}

export function createProjectStorytellingTimelines(): ProjectTimelineController {
  const animations: PausableAnimation[] = [];
  const progressTriggers: Array<ReturnType<typeof ScrollTrigger.create>> = [];
  const matchMedia = gsap.matchMedia();
  const chapters = gsap.utils.toArray<HTMLElement>("[data-project-chapter]");

  matchMedia.add("(min-width: 897px)", () => {
    chapters.forEach((chapter, index) => {
      const title = chapter.querySelector<HTMLElement>("[data-project-title]");
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          anticipatePin: 1,
          end: "+=145%",
          onEnter: () => publishProgress(chapter, 0),
          onEnterBack: () =>
            publishProgress(
              chapter,
              Number.parseFloat(
                chapter.style.getPropertyValue("--chapter-progress") || "1",
              ),
            ),
          onLeave: () => publishProgress(chapter, 1),
          onLeaveBack: () => publishProgress(chapter, 0),
          onUpdate: ({ progress }) => publishProgress(chapter, progress),
          pin: true,
          scrub: 0.75,
          start: "top top",
          trigger: chapter,
        },
      });

      timeline
        .fromTo(
          chapter.querySelector("[data-project-index]"),
          { autoAlpha: 0, x: index % 2 === 0 ? -24 : 24 },
          { autoAlpha: 1, duration: 0.16, x: 0 },
          0,
        )
        .fromTo(
          chapter.querySelector("[data-project-category]"),
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, duration: 0.18, y: 0 },
          0.03,
        )
        .fromTo(
          title,
          { autoAlpha: 0, yPercent: 118 },
          { autoAlpha: 1, duration: 0.32, yPercent: 0 },
          0.08,
        )
        .fromTo(
          chapter.querySelector("[data-project-summary]"),
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, duration: 0.24, y: 0 },
          0.19,
        )
        .fromTo(
          chapter.querySelectorAll("[data-project-detail]"),
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            duration: 0.22,
            stagger: 0.025,
            y: 0,
          },
          0.29,
        )
        .fromTo(
          chapter.querySelector("[data-project-visual]"),
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, duration: 0.35, scale: 1 },
          0.04,
        )
        .fromTo(
          chapter.querySelector("[data-case-study-link]"),
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, duration: 0.2, y: 0 },
          0.54,
        )
        .to(
          title,
          {
            duration: 0.42,
            ease: "none",
            x: index % 2 === 0 ? -12 : 12,
          },
          0.58,
        )
        .to(
          chapter.querySelector("[data-project-visual]"),
          { duration: 0.46, ease: "none", yPercent: -4 },
          0.54,
        );

      animations.push(timeline);
    });
  });

  matchMedia.add("(max-width: 896px)", () => {
    chapters.forEach((chapter) => {
      const revealTargets = chapter.querySelectorAll<HTMLElement>(
        "[data-project-mobile-reveal]",
      );
      const reveal = gsap.fromTo(
        revealTargets,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          duration: 0.78,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            once: true,
            start: "top 82%",
            trigger: chapter,
          },
          y: 0,
        },
      );
      const progressTrigger = ScrollTrigger.create({
        end: "bottom top",
        onEnter: () => publishProgress(chapter, 0),
        onEnterBack: () => publishProgress(chapter, 0.75),
        onLeave: () => publishProgress(chapter, 1),
        onLeaveBack: () => publishProgress(chapter, 0),
        onUpdate: ({ progress }) => publishProgress(chapter, progress),
        start: "top bottom",
        trigger: chapter,
      });

      animations.push(reveal);
      progressTriggers.push(progressTrigger);
    });
  });

  return {
    animations,
    cleanup: () => {
      progressTriggers.forEach((trigger) => trigger.kill());
      matchMedia.revert();
    },
  };
}
