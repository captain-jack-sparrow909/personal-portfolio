"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

import { useSceneStore } from "@/store/scene-store";

export function PerformanceController() {
  const deviceTier = useSceneStore((state) => state.deviceTier);
  const setDeviceTier = useSceneStore((state) => state.setDeviceTier);
  const setDpr = useThree((state) => state.setDpr);

  useEffect(() => {
    const dpr =
      deviceTier === "high"
        ? Math.min(window.devicePixelRatio, 1.5)
        : deviceTier === "medium"
          ? Math.min(window.devicePixelRatio, 1.25)
          : 1;

    setDpr(dpr);
  }, [deviceTier, setDpr]);

  return (
    <PerformanceMonitor
      flipflops={2}
      onDecline={() => {
        setDeviceTier(deviceTier === "high" ? "medium" : "low");
      }}
    />
  );
}
