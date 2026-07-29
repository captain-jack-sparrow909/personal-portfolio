"use client";

import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import * as THREE from "three";

import type { NormalizedPointer } from "@/hooks/usePointerPosition";
import type { SceneMode } from "@/store/scene-store";

type CameraRigProps = {
  mode: SceneMode;
  pointer: RefObject<NormalizedPointer>;
  reducedMotion: boolean;
};

const cameraDepth: Record<SceneMode, number> = {
  hero: 7.8,
  identity: 8.4,
  devpulse: 7.6,
  rontgen: 7.4,
  cognora: 7.6,
  orkestria: 7.5,
  contact: 8.7,
};

export function CameraRig({ mode, pointer, reducedMotion }: CameraRigProps) {
  useFrame(({ camera }, delta) => {
    const pointerX = reducedMotion ? 0 : pointer.current.x;
    const pointerY = reducedMotion ? 0 : pointer.current.y;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      pointerX * 0.17,
      3,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      pointerY * 0.11,
      3,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      cameraDepth[mode],
      2.8,
      delta,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}
