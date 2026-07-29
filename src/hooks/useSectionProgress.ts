"use client";

import { useEffect, useRef, type RefObject } from "react";

import type { ProjectSceneMode } from "@/content/projects";
import { useSceneStore } from "@/store/scene-store";

export const PROJECT_SCENE_PROGRESS_EVENT = "portfolio:project-progress";

export type ProjectSceneProgressDetail = {
  mode: ProjectSceneMode;
  progress: number;
};

export function emitProjectSceneProgress(
  detail: ProjectSceneProgressDetail,
): void {
  window.dispatchEvent(
    new CustomEvent<ProjectSceneProgressDetail>(PROJECT_SCENE_PROGRESS_EVENT, {
      detail,
    }),
  );
}

export function useSectionProgress(): RefObject<number> {
  const progress = useRef(0);

  useEffect(() => {
    let transitionTimer = 0;

    const handleProgress = (event: Event) => {
      const { detail } = event as CustomEvent<ProjectSceneProgressDetail>;
      const nextProgress = Math.min(1, Math.max(0, detail.progress));
      const scene = useSceneStore.getState();

      progress.current = nextProgress;

      if (scene.currentSection !== detail.mode) {
        scene.setTransitionState("transitioning");
        scene.setCurrentSection(detail.mode);
        scene.setActiveProject(detail.mode);
        window.clearTimeout(transitionTimer);
        transitionTimer = window.setTimeout(() => {
          useSceneStore.getState().setTransitionState("idle");
        }, 650);
      }
    };

    window.addEventListener(PROJECT_SCENE_PROGRESS_EVENT, handleProgress);

    return () => {
      window.clearTimeout(transitionTimer);
      window.removeEventListener(PROJECT_SCENE_PROGRESS_EVENT, handleProgress);
    };
  }, []);

  return progress;
}
