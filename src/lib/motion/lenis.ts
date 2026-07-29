"use client";

import Lenis from "lenis";

export function createLenis(): Lenis {
  return new Lenis({
    duration: 1.05,
    easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.1,
    anchors: {
      offset: -72,
      duration: 1.15,
    },
  });
}
