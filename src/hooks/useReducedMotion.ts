"use client";

import { useEffect, useState } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
export const MOTION_PREFERENCE_KEY = "portfolio-motion";
export const MOTION_PREFERENCE_EVENT = "portfolio:motion-preference";

function prefersReducedMotion(mediaQuery: MediaQueryList): boolean {
  try {
    return (
      mediaQuery.matches ||
      window.localStorage.getItem(MOTION_PREFERENCE_KEY) === "reduce"
    );
  } catch {
    return mediaQuery.matches;
  }
}

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window === "undefined"
      ? false
      : prefersReducedMotion(window.matchMedia(reducedMotionQuery)),
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(reducedMotionQuery);
    const updatePreference = () =>
      setReducedMotion(prefersReducedMotion(mediaQuery));

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    window.addEventListener(MOTION_PREFERENCE_EVENT, updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
      window.removeEventListener(MOTION_PREFERENCE_EVENT, updatePreference);
    };
  }, []);

  return reducedMotion;
}
