"use client";

import {
  Component,
  Suspense,
  useEffect,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

import type { NormalizedPointer } from "@/hooks/usePointerPosition";
import { COGNITIVE_ENGINE_MODEL_URL } from "@/lib/three/model";
import type {
  DeviceTier,
  SceneMode,
  TransitionState,
} from "@/store/scene-store";

import {
  ModelCognitiveEngine,
  preloadCognitiveEngine,
} from "./ModelCognitiveEngine";
import { ProceduralCognitiveEngine } from "./ProceduralCognitiveEngine";

export type CognitiveEngineProps = {
  deviceTier: DeviceTier;
  mode: SceneMode;
  pointer: RefObject<NormalizedPointer>;
  progress: RefObject<number>;
  reducedMotion: boolean;
  transitionState: TransitionState;
};

type ModelAvailability = "checking" | "available" | "missing";

type ModelBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type ModelBoundaryState = {
  failed: boolean;
};

class ModelBoundary extends Component<ModelBoundaryProps, ModelBoundaryState> {
  state: ModelBoundaryState = { failed: false };

  static getDerivedStateFromError(): ModelBoundaryState {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function CognitiveEngine(props: CognitiveEngineProps) {
  const [availability, setAvailability] =
    useState<ModelAvailability>("checking");

  useEffect(() => {
    if (props.deviceTier === "low") {
      return;
    }

    const controller = new AbortController();

    void fetch(COGNITIVE_ENGINE_MODEL_URL, {
      cache: "force-cache",
      method: "HEAD",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          setAvailability("missing");
          return;
        }

        preloadCognitiveEngine(COGNITIVE_ENGINE_MODEL_URL);
        setAvailability("available");
      })
      .catch(() => {
        if (!controller.signal.aborted) setAvailability("missing");
      });

    return () => controller.abort();
  }, [props.deviceTier]);

  const fallback = <ProceduralCognitiveEngine {...props} />;
  const effectiveAvailability =
    props.deviceTier === "low" ? "missing" : availability;

  if (effectiveAvailability !== "available") return fallback;

  return (
    <Suspense fallback={fallback}>
      <ModelBoundary fallback={fallback}>
        <ModelCognitiveEngine {...props} url={COGNITIVE_ENGINE_MODEL_URL} />
      </ModelBoundary>
    </Suspense>
  );
}
