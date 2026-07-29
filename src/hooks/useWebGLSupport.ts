"use client";

import { useEffect, useState } from "react";

export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (!active) return;

      try {
        const canvas = document.createElement("canvas");
        const context =
          canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ??
          canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });

        setSupported(Boolean(context));
      } catch {
        setSupported(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return supported;
}
