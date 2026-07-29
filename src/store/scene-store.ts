import { create } from "zustand";

import type { ProjectSceneMode } from "@/content/projects";

export type DeviceTier = "high" | "medium" | "low";

export type SceneMode =
  | "hero"
  | "identity"
  | "devpulse"
  | "rontgen"
  | "cognora"
  | "orkestria"
  | "contact";

export type ProjectMode = ProjectSceneMode;

type TransitionState = "idle" | "transitioning";

type SceneState = {
  activeProject: ProjectMode | null;
  canvasReady: boolean;
  currentSection: SceneMode;
  deviceTier: DeviceTier;
  reducedMotion: boolean;
  transitionState: TransitionState;
  setActiveProject: (project: ProjectMode | null) => void;
  setCanvasReady: (ready: boolean) => void;
  setCurrentSection: (section: SceneMode) => void;
  setDeviceTier: (tier: DeviceTier) => void;
  setReducedMotion: (reduced: boolean) => void;
  setTransitionState: (state: TransitionState) => void;
};

export const useSceneStore = create<SceneState>((set) => ({
  activeProject: null,
  canvasReady: false,
  currentSection: "hero",
  deviceTier: "medium",
  reducedMotion: false,
  transitionState: "idle",
  setActiveProject: (activeProject) => set({ activeProject }),
  setCanvasReady: (canvasReady) => set({ canvasReady }),
  setCurrentSection: (currentSection) => set({ currentSection }),
  setDeviceTier: (deviceTier) => set({ deviceTier }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setTransitionState: (transitionState) => set({ transitionState }),
}));
