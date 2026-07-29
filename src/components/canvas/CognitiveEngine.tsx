"use client";

import type { RefObject } from "react";

import type { NormalizedPointer } from "@/hooks/usePointerPosition";
import type { DeviceTier, SceneMode } from "@/store/scene-store";

import { ProceduralCognitiveEngine } from "./ProceduralCognitiveEngine";

export type CognitiveEngineProps = {
  deviceTier: DeviceTier;
  mode: SceneMode;
  pointer: RefObject<NormalizedPointer>;
  progress?: number;
  reducedMotion: boolean;
};

export function CognitiveEngine(props: CognitiveEngineProps) {
  return <ProceduralCognitiveEngine {...props} />;
}
