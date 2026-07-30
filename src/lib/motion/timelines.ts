"use client";

import { gsap } from "./gsap";

export function createHeroTimeline(): ReturnType<typeof gsap.timeline> {
  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  timeline
    .fromTo("[data-hero-eyebrow]", { y: 10 }, { duration: 0.7, y: 0 })
    .fromTo(
      "[data-hero-line]",
      { yPercent: 18 },
      {
        duration: 1.05,
        stagger: 0.09,
        yPercent: 0,
      },
      "-=0.45",
    )
    .fromTo(
      "[data-hero-support]",
      { y: 14 },
      { duration: 0.8, stagger: 0.1, y: 0 },
      "-=0.52",
    )
    .fromTo(
      "[data-hero-visual]",
      { autoAlpha: 0.72, scale: 0.96, rotate: -2 },
      { autoAlpha: 1, duration: 1.3, ease: "power2.out", rotate: 0, scale: 1 },
      0.12,
    )
    .fromTo(
      "[data-hero-rail]",
      { autoAlpha: 0.72 },
      { autoAlpha: 1, duration: 0.7 },
      "-=0.48",
    );

  return timeline;
}

export function revealImmediately(): void {
  gsap.set(
    [
      "[data-hero-eyebrow]",
      "[data-hero-line]",
      "[data-hero-support]",
      "[data-hero-visual]",
      "[data-hero-rail]",
      "[data-reveal]",
    ],
    {
      autoAlpha: 1,
      clearProps: "transform",
    },
  );
}
