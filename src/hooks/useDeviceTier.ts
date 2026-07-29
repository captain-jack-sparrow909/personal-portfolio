"use client";

import { useEffect, useState } from "react";

import type { DeviceTier } from "@/store/scene-store";

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
};

function assessDeviceTier(): DeviceTier {
  const width = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as NavigatorWithMemory).deviceMemory ?? 4;

  if (width >= 1200 && cores >= 8 && memory >= 8) return "high";
  if (width >= 768 && cores >= 4 && memory >= 4) return "medium";
  return "low";
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("medium");

  useEffect(() => {
    const updateTier = () => setTier(assessDeviceTier());
    updateTier();

    window.addEventListener("resize", updateTier, { passive: true });
    return () => window.removeEventListener("resize", updateTier);
  }, []);

  return tier;
}
