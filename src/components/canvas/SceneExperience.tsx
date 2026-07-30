"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, type ReactNode } from "react";

import { useMotionPreferences } from "@/components/motion/MotionProvider";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { usePointerPosition } from "@/hooks/usePointerPosition";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import {
  useSceneStore,
  type ProjectMode,
  type SceneMode,
} from "@/store/scene-store";

import styles from "./SceneExperience.module.css";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  loading: () => null,
  ssr: false,
});

const sceneModes: readonly SceneMode[] = [
  "hero",
  "identity",
  "devpulse",
  "rontgen",
  "cognora",
  "orkestria",
  "contact",
];

const projectModes: readonly ProjectMode[] = [
  "devpulse",
  "rontgen",
  "cognora",
  "orkestria",
];

const sceneStateLabels: Record<SceneMode, string> = {
  hero: "ASSEMBLED / CALM",
  identity: "SIGNAL / IDENTITY",
  devpulse: "RESEARCH PIPELINE",
  rontgen: "ARCHITECTURE SCAN",
  cognora: "KNOWLEDGE GRAPH",
  orkestria: "APPROVAL ORBIT",
  contact: "RESOLVE / JK",
};

function isSceneMode(value: string | undefined): value is SceneMode {
  return sceneModes.includes(value as SceneMode);
}

function isProjectMode(mode: SceneMode): mode is ProjectMode {
  return projectModes.includes(mode as ProjectMode);
}

type SceneErrorBoundaryProps = {
  children: ReactNode;
};

type SceneErrorBoundaryState = {
  failed: boolean;
};

class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch() {
    useSceneStore.getState().setCanvasReady(false);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function useSceneSections() {
  const setActiveProject = useSceneStore((state) => state.setActiveProject);
  const setCurrentSection = useSceneStore((state) => state.setCurrentSection);
  const setTransitionState = useSceneStore((state) => state.setTransitionState);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene-mode]"),
    );
    const visibility = new Map<HTMLElement, number>();
    let transitionTimer = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target as HTMLElement, entry.intersectionRatio);
        });

        const active = [...visibility.entries()]
          .filter(([, ratio]) => ratio > 0)
          .sort((left, right) => right[1] - left[1])[0]?.[0];
        const nextMode = active?.dataset.sceneMode;

        if (!isSceneMode(nextMode)) return;

        setTransitionState("transitioning");
        setCurrentSection(nextMode);
        setActiveProject(isProjectMode(nextMode) ? nextMode : null);

        window.clearTimeout(transitionTimer);
        transitionTimer = window.setTimeout(
          () => setTransitionState("idle"),
          650,
        );
      },
      {
        rootMargin: "-18% 0px -38% 0px",
        threshold: [0, 0.12, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.clearTimeout(transitionTimer);
      observer.disconnect();
      visibility.clear();
    };
  }, [setActiveProject, setCurrentSection, setTransitionState]);
}

export function SceneExperience() {
  const { reducedMotion } = useMotionPreferences();
  const deviceTier = useDeviceTier();
  const webGLSupported = useWebGLSupport();
  const canvasReady = useSceneStore((state) => state.canvasReady);
  const currentSection = useSceneStore((state) => state.currentSection);
  const setCanvasReady = useSceneStore((state) => state.setCanvasReady);
  const setDeviceTier = useSceneStore((state) => state.setDeviceTier);
  const setReducedMotion = useSceneStore((state) => state.setReducedMotion);
  const pointer = usePointerPosition(!reducedMotion && deviceTier !== "low");
  const progress = useSectionProgress();

  useSceneSections();

  useEffect(() => {
    setDeviceTier(deviceTier);
  }, [deviceTier, setDeviceTier]);

  useEffect(() => {
    setReducedMotion(reducedMotion);
  }, [reducedMotion, setReducedMotion]);

  useEffect(() => {
    const root = document.documentElement;

    if (canvasReady) {
      root.dataset.canvas = "ready";
    } else {
      root.dataset.canvas = "fallback";
    }

    return () => {
      delete root.dataset.canvas;
    };
  }, [canvasReady]);

  useEffect(() => {
    if (webGLSupported === false) setCanvasReady(false);
  }, [setCanvasReady, webGLSupported]);

  if (!webGLSupported) return null;

  return (
    <div aria-hidden="true" className={styles.scene} data-webgl-scene>
      <SceneErrorBoundary>
        <SceneCanvas pointer={pointer} progress={progress} />
      </SceneErrorBoundary>
      <div className={styles.hud}>
        <span>CE / HYBRID-06</span>
        <span>{sceneStateLabels[currentSection]}</span>
        <span>{deviceTier.toUpperCase()} TIER</span>
      </div>
    </div>
  );
}
