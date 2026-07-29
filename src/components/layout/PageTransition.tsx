"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { ProjectAccent } from "@/content/projects";
import { useSceneStore } from "@/store/scene-store";

import styles from "./PageTransition.module.css";

type TransitionView = {
  accent: ProjectAccent;
  name: string;
  state: "idle" | "covering" | "revealing";
};

const initialView: TransitionView = {
  accent: "cyan",
  name: "",
  state: "idle",
};

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [view, setView] = useState<TransitionView>(initialView);
  const timeoutRef = useRef(0);

  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-case-study-link]"),
    );
    links.forEach((link) => router.prefetch(link.href));

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>("[data-case-study-link]");
      if (!link || link.target === "_blank") return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();

      const accent = (link.dataset.projectAccent ?? "cyan") as ProjectAccent;
      const name = link.dataset.projectName ?? "Selected system";
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const keyboardActivation = event.detail === 0;
      const x = keyboardActivation ? "50%" : `${event.clientX}px`;
      const y = keyboardActivation ? "50%" : `${event.clientY}px`;

      document.documentElement.style.setProperty("--transition-x", x);
      document.documentElement.style.setProperty("--transition-y", y);
      useSceneStore.getState().setTransitionState("transitioning");
      setView({ accent, name, state: "covering" });

      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(
        () => router.push(`${url.pathname}${url.search}${url.hash}`),
        reducedMotion ? 90 : 620,
      );
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      window.clearTimeout(timeoutRef.current);
    };
  }, [router]);

  useEffect(() => {
    useSceneStore.getState().setTransitionState("idle");

    if (view.state === "idle") return;

    const revealTimer = window.setTimeout(() => {
      setView((current) => ({ ...current, state: "revealing" }));
      timeoutRef.current = window.setTimeout(() => {
        setView(initialView);
      }, 720);
    }, 0);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(timeoutRef.current);
    };
    // The path change is the event that releases the transition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={styles.transition}
      data-accent={view.accent}
      data-state={view.state}
    >
      <div className={styles.transitionField}>
        <span>JK / SYSTEM TRANSFER</span>
        <strong>{view.name}</strong>
        <span>INTELLIGENCE IN MOTION</span>
      </div>
    </div>
  );
}
