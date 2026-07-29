"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

import type { SceneMode } from "@/store/scene-store";

type LightingRigProps = {
  mode: SceneMode;
  progress: RefObject<number>;
};

const accentByMode: Record<SceneMode, string> = {
  hero: "#5de4ff",
  identity: "#b8ff63",
  devpulse: "#ff8a5c",
  rontgen: "#5de4ff",
  cognora: "#b8ff63",
  orkestria: "#8974ff",
  contact: "#f2f1ec",
};

export function LightingRig({ mode, progress }: LightingRigProps) {
  const keyLight = useRef<THREE.SpotLight>(null);
  const rimLight = useRef<THREE.PointLight>(null);
  const targetColor = useMemo(
    () => new THREE.Color(accentByMode[mode]),
    [mode],
  );

  useFrame((_, delta) => {
    if (keyLight.current) {
      keyLight.current.color.lerp(targetColor, 1 - Math.exp(-delta * 3));
      keyLight.current.intensity = THREE.MathUtils.damp(
        keyLight.current.intensity,
        18 + Math.sin(progress.current * Math.PI) * 4,
        4,
        delta,
      );
    }
    if (rimLight.current) {
      rimLight.current.color.lerp(targetColor, 1 - Math.exp(-delta * 3));
      rimLight.current.intensity = THREE.MathUtils.damp(
        rimLight.current.intensity,
        8 + progress.current * 2,
        4,
        delta,
      );
    }
  });

  return (
    <>
      <ambientLight color="#c9d5da" intensity={0.28} />
      <hemisphereLight color="#dceef2" groundColor="#050506" intensity={0.56} />
      <spotLight
        angle={0.48}
        color="#5de4ff"
        decay={1.7}
        distance={18}
        intensity={18}
        penumbra={0.85}
        position={[4.5, 6, 6]}
        ref={keyLight}
      />
      <pointLight
        color="#5de4ff"
        decay={1.6}
        distance={12}
        intensity={8}
        position={[-4, 1.5, 3]}
        ref={rimLight}
      />
      <pointLight
        color="#8974ff"
        decay={2}
        distance={9}
        intensity={4}
        position={[0, -4, 2]}
      />
    </>
  );
}
