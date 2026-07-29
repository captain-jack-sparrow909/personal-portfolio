"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  type ReactNode,
} from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

type MotionContextValue = {
  reducedMotion: boolean;
};

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
});

export function useMotionPreferences(): MotionContextValue {
  return useContext(MotionContext);
}

type MotionProviderProps = {
  children: ReactNode;
};

function revealWithoutMotion() {
  document
    .querySelectorAll<HTMLElement>(
      [
        "[data-hero-eyebrow]",
        "[data-hero-line]",
        "[data-hero-support]",
        "[data-hero-visual]",
        "[data-hero-rail]",
        "[data-reveal]",
        "[data-project-mobile-reveal]",
      ].join(","),
    )
    .forEach((element) => {
      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.style.removeProperty("transform");
    });
}

export function MotionProvider({ children }: MotionProviderProps) {
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = document.documentElement;
    let active = true;
    let stopRuntime: (() => void) | undefined;

    root.dataset.motion = reducedMotion ? "reduced" : "ready";

    if (reducedMotion) {
      revealWithoutMotion();
      root.classList.remove("lenis", "lenis-smooth");

      return () => {
        active = false;
        delete root.dataset.motion;
      };
    }

    void import("@/lib/motion/runtime").then(({ startMotionRuntime }) => {
      if (!active) return;
      stopRuntime = startMotionRuntime();
    });

    return () => {
      active = false;
      stopRuntime?.();
      delete root.dataset.motion;
    };
  }, [reducedMotion]);

  return (
    <MotionContext.Provider value={{ reducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}
