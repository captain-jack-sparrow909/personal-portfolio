"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";

import type { DeviceTier } from "@/store/scene-store";

type PostProcessingProps = {
  deviceTier: DeviceTier;
  reducedMotion: boolean;
};

export function PostProcessing({
  deviceTier,
  reducedMotion,
}: PostProcessingProps) {
  if (deviceTier === "low" || reducedMotion) return null;

  return (
    <EffectComposer multisampling={deviceTier === "high" ? 4 : 0}>
      <Bloom
        intensity={deviceTier === "high" ? 0.42 : 0.28}
        luminanceSmoothing={0.28}
        luminanceThreshold={0.78}
        mipmapBlur
        radius={0.32}
      />
    </EffectComposer>
  );
}
