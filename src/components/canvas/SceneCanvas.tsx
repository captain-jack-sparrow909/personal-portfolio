"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, type RefObject } from "react";
import * as THREE from "three";

import type { NormalizedPointer } from "@/hooks/usePointerPosition";
import { usePageVisibility } from "@/hooks/usePageVisibility";
import { useSceneStore } from "@/store/scene-store";

import { CameraRig } from "./CameraRig";
import { CognitiveEngine } from "./CognitiveEngine";
import { LightingRig } from "./LightingRig";
import { ParticleField } from "./ParticleField";
import { PerformanceController } from "./PerformanceController";
import { PostProcessing } from "./PostProcessing";
import { ProjectVisualSystem } from "./ProjectVisualSystem";
import { SceneEnvironment } from "./SceneEnvironment";

type SceneCanvasProps = {
  pointer: RefObject<NormalizedPointer>;
  progress: RefObject<number>;
};

function ContextController() {
  const gl = useThree((state) => state.gl);
  const setCanvasReady = useSceneStore((state) => state.setCanvasReady);

  useEffect(() => {
    const canvas = gl.domElement;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setCanvasReady(false);
    };
    const handleContextRestored = () => setCanvasReady(true);

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl, setCanvasReady]);

  return null;
}

export default function SceneCanvas({ pointer, progress }: SceneCanvasProps) {
  const currentSection = useSceneStore((state) => state.currentSection);
  const deviceTier = useSceneStore((state) => state.deviceTier);
  const reducedMotion = useSceneStore((state) => state.reducedMotion);
  const transitionState = useSceneStore((state) => state.transitionState);
  const setCanvasReady = useSceneStore((state) => state.setCanvasReady);
  const pageVisible = usePageVisibility();

  return (
    <Canvas
      camera={{ far: 40, fov: 42, near: 0.1, position: [0, 0, 7.8] }}
      dpr={deviceTier === "high" ? [1, 1.5] : [1, 1.25]}
      frameloop={pageVisible && !reducedMotion ? "always" : "demand"}
      gl={{
        alpha: true,
        antialias: deviceTier !== "low",
        depth: true,
        powerPreference:
          deviceTier === "low" ? "low-power" : "high-performance",
        preserveDrawingBuffer: false,
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.92;
        gl.setClearColor(0x000000, 0);
        setCanvasReady(true);
      }}
    >
      <SceneEnvironment />
      <LightingRig mode={currentSection} progress={progress} />
      <ParticleField deviceTier={deviceTier} reducedMotion={reducedMotion} />
      <CognitiveEngine
        deviceTier={deviceTier}
        mode={currentSection}
        pointer={pointer}
        progress={progress}
        reducedMotion={reducedMotion}
        transitionState={transitionState}
      />
      <ProjectVisualSystem
        deviceTier={deviceTier}
        mode={currentSection}
        progress={progress}
        reducedMotion={reducedMotion}
      />
      <CameraRig
        mode={currentSection}
        pointer={pointer}
        progress={progress}
        reducedMotion={reducedMotion}
        transitionState={transitionState}
      />
      <PerformanceController />
      <PostProcessing deviceTier={deviceTier} reducedMotion={reducedMotion} />
      <ContextController />
    </Canvas>
  );
}
