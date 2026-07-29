import type { AnimationClip, Object3D } from "three";

import type { SceneMode } from "@/store/scene-store";

export const COGNITIVE_ENGINE_MODEL_URL = "/models/cognitive-engine.glb";

export const ENGINE_GROUPS = [
  "Core",
  "OuterRing",
  "MiddleRing",
  "InnerRing",
  "NeuralThreads",
  "Nodes",
  "DataFragments",
  "AccentLights",
] as const;

export const ENGINE_CLIPS = [
  "Idle",
  "Awaken",
  "Orbit",
  "Disassemble",
  "Reassemble",
  "Pulse",
  "Shutdown",
] as const;

export type EngineClipName = (typeof ENGINE_CLIPS)[number];

export const ENGINE_CLIP_BY_MODE: Record<SceneMode, EngineClipName> = {
  hero: "Idle",
  identity: "Disassemble",
  devpulse: "Orbit",
  rontgen: "Pulse",
  cognora: "Pulse",
  orkestria: "Orbit",
  contact: "Reassemble",
};

export const ENGINE_ACCENT_BY_MODE: Record<SceneMode, string> = {
  hero: "#5de4ff",
  identity: "#b8ff63",
  devpulse: "#ff8a5c",
  rontgen: "#5de4ff",
  cognora: "#b8ff63",
  orkestria: "#8974ff",
  contact: "#f2f1ec",
};

export const ENGINE_POSE_BY_MODE = {
  hero: {
    position: [1.15, -0.12, 0],
    rotation: [0.05, -0.15, -0.02],
    scale: 1,
  },
  identity: {
    position: [-1.35, 0.05, -0.1],
    rotation: [-0.06, 0.34, 0.05],
    scale: 0.92,
  },
  devpulse: {
    position: [1.4, 0.03, -0.2],
    rotation: [0.15, 0.52, -0.16],
    scale: 1.02,
  },
  rontgen: {
    position: [-1.35, 0.05, -0.15],
    rotation: [-0.08, -0.46, 0.08],
    scale: 1,
  },
  cognora: {
    position: [1.3, 0.04, -0.2],
    rotation: [0.12, 0.44, -0.08],
    scale: 1.04,
  },
  orkestria: {
    position: [-1.3, 0.02, -0.2],
    rotation: [-0.14, -0.52, 0.12],
    scale: 1.05,
  },
  contact: {
    position: [1.55, -0.08, -0.3],
    rotation: [0.02, 0.08, 0],
    scale: 0.88,
  },
} satisfies Record<
  SceneMode,
  {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
  }
>;

export function validateEngineContract(
  scene: Object3D,
  animations: readonly AnimationClip[],
): { missingClips: string[]; missingGroups: string[]; valid: boolean } {
  const animationNames = new Set(animations.map((clip) => clip.name));
  const missingGroups = ENGINE_GROUPS.filter(
    (name) => !scene.getObjectByName(name),
  );
  const missingClips = ENGINE_CLIPS.filter((name) => !animationNames.has(name));

  return {
    missingClips,
    missingGroups,
    valid: missingGroups.length === 0 && missingClips.length === 0,
  };
}

export function isProjectSceneMode(mode: SceneMode): boolean {
  return (
    mode === "devpulse" ||
    mode === "rontgen" ||
    mode === "cognora" ||
    mode === "orkestria"
  );
}
