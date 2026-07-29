"use client";

import type Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { createLenis } from "@/lib/motion/lenis";
import { createProjectStorytellingTimelines } from "@/lib/motion/project-timelines";
import { createHeroTimeline } from "@/lib/motion/timelines";

type PausableAnimation = {
  pause: () => unknown;
  resume: () => unknown;
};

export function startMotionRuntime(): () => void {
  const root = document.documentElement;
  const animations: PausableAnimation[] = [];
  const cleanups: Array<() => void> = [];
  let lenis: Lenis | null = null;
  let disposed = false;

  const context = gsap.context(() => {
    animations.push(createHeroTimeline());

    const projectStorytelling = createProjectStorytellingTimelines();
    animations.push(...projectStorytelling.animations);
    cleanups.push(projectStorytelling.cleanup);

    const deepLinked = Boolean(window.location.hash);

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      if (deepLinked) {
        gsap.set(element, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      const animation = gsap.fromTo(
        element,
        { autoAlpha: 0, y: 44 },
        {
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
          y: 0,
        },
      );

      animations.push(animation);
    });

    const tickerTrack = document.querySelector<HTMLElement>(
      "[data-ticker-track]",
    );
    if (tickerTrack) {
      animations.push(
        gsap.to(tickerTrack, {
          duration: 32,
          ease: "none",
          repeat: -1,
          xPercent: -50,
        }),
      );
    }

    gsap.utils
      .toArray<HTMLElement>("[data-signal-orbit]")
      .forEach((orbit, index) => {
        animations.push(
          gsap.to(orbit, {
            duration: 22 + index * 3,
            ease: "none",
            repeat: -1,
            rotate: index % 2 === 0 ? "+=360" : "-=360",
          }),
        );
      });

    const processSignal = document.querySelector<HTMLElement>(
      "[data-process-signal]",
    );
    if (processSignal) {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(min-width: 897px)", () => {
        gsap.fromTo(
          processSignal,
          { scaleX: 0, transformOrigin: "left center" },
          {
            ease: "none",
            scaleX: 1,
            scrollTrigger: {
              end: "bottom 45%",
              scrub: 0.5,
              start: "top 82%",
              trigger: processSignal.parentElement,
            },
          },
        );
      });

      matchMedia.add("(max-width: 896px)", () => {
        gsap.fromTo(
          processSignal,
          { scaleY: 0, transformOrigin: "center top" },
          {
            ease: "none",
            scaleY: 1,
            scrollTrigger: {
              end: "bottom 45%",
              scrub: 0.5,
              start: "top 82%",
              trigger: processSignal.parentElement,
            },
          },
        );
      });

      cleanups.push(() => matchMedia.revert());
    }

    const parallaxMedia = gsap.matchMedia();
    parallaxMedia.add("(min-width: 897px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const depth = element.dataset.parallax;
        const distance = depth === "slow" ? -34 : depth === "fast" ? -92 : -64;

        gsap.to(element, {
          ease: "none",
          scrollTrigger: {
            end: "bottom top",
            scrub: 0.8,
            start: "top bottom",
            trigger: element.closest("section") ?? element,
          },
          y: distance,
        });
      });
    });
    cleanups.push(() => parallaxMedia.revert());

    const headerInner = document.querySelector<HTMLElement>(
      ".site-header__inner",
    );
    if (headerInner) {
      ScrollTrigger.create({
        end: "max",
        onEnter: () => headerInner.setAttribute("data-scrolled", "true"),
        onLeaveBack: () => headerInner.removeAttribute("data-scrolled"),
        start: 80,
      });
    }

    const navigationLinks = gsap.utils.toArray<HTMLAnchorElement>(
      ".site-header__links a",
    );
    navigationLinks.forEach((link) => {
      const targetId = link.hash.slice(1);
      const section = document.getElementById(targetId);
      if (!section) return;

      ScrollTrigger.create({
        end: "bottom center",
        onToggle: ({ isActive }) => {
          if (!isActive) return;

          navigationLinks.forEach((item) => {
            item.removeAttribute("aria-current");
            item.removeAttribute("data-active");
          });
          link.setAttribute("aria-current", "location");
          link.setAttribute("data-active", "true");
        },
        start: "top center",
        trigger: section,
      });
    });

    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    if (pointerFine) {
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((element) => {
        const moveX = gsap.quickTo(element, "x", {
          duration: 0.5,
          ease: "power3.out",
        });
        const moveY = gsap.quickTo(element, "y", {
          duration: 0.5,
          ease: "power3.out",
        });

        const handlePointerMove = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          const offsetX = event.clientX - bounds.left - bounds.width / 2;
          const offsetY = event.clientY - bounds.top - bounds.height / 2;
          moveX(offsetX * 0.12);
          moveY(offsetY * 0.12);
        };
        const resetPosition = () => {
          moveX(0);
          moveY(0);
        };

        element.addEventListener("pointermove", handlePointerMove);
        element.addEventListener("pointerleave", resetPosition);
        cleanups.push(() => {
          element.removeEventListener("pointermove", handlePointerMove);
          element.removeEventListener("pointerleave", resetPosition);
        });
      });

      gsap.utils
        .toArray<HTMLElement>("[data-project-chapter]")
        .forEach((chapter) => {
          const title = chapter.querySelector<HTMLElement>(
            "[data-project-title]",
          );
          if (!title) return;

          const moveX = gsap.quickTo(title, "x", {
            duration: 0.7,
            ease: "power3.out",
          });
          const moveY = gsap.quickTo(title, "y", {
            duration: 0.7,
            ease: "power3.out",
          });

          const handlePointerMove = (event: PointerEvent) => {
            const bounds = chapter.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;

            moveX(x * 10);
            moveY(y * 6);
          };
          const resetTitle = () => {
            moveX(0);
            moveY(0);
          };

          chapter.addEventListener("pointermove", handlePointerMove);
          chapter.addEventListener("pointerleave", resetTitle);
          cleanups.push(() => {
            chapter.removeEventListener("pointermove", handlePointerMove);
            chapter.removeEventListener("pointerleave", resetTitle);
          });
        });
    }
  }, root);

  lenis = createLenis();
  lenis.on("scroll", ScrollTrigger.update);

  const updateLenis = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(updateLenis);
  gsap.ticker.lagSmoothing(0);

  const handleVisibility = () => {
    if (document.hidden) {
      lenis?.stop();
      animations.forEach((animation) => animation.pause());
    } else {
      lenis?.start();
      animations.forEach((animation) => animation.resume());
      ScrollTrigger.refresh();
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);

  void document.fonts.ready.then(() => {
    if (!disposed) ScrollTrigger.refresh();
  });

  const refreshOnLoad = () => ScrollTrigger.refresh();
  window.addEventListener("load", refreshOnLoad, { once: true });

  return () => {
    disposed = true;
    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("load", refreshOnLoad);
    gsap.ticker.remove(updateLenis);
    lenis?.destroy();
    cleanups.forEach((cleanup) => cleanup());
    context.revert();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
