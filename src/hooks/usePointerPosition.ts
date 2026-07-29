"use client";

import { useEffect, useRef, type RefObject } from "react";

export type NormalizedPointer = {
  x: number;
  y: number;
};

export function usePointerPosition(
  enabled: boolean,
): RefObject<NormalizedPointer> {
  const pointer = useRef<NormalizedPointer>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || !window.matchMedia("(pointer: fine)").matches) {
      pointer.current.x = 0;
      pointer.current.y = 0;
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const resetPointer = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
    };
  }, [enabled]);

  return pointer;
}
