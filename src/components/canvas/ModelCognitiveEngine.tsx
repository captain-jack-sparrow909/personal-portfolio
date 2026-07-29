"use client";

/* eslint-disable react-hooks/immutability -- Three.js AnimationAction instances are intentionally controlled through their imperative API. */

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

import {
  ENGINE_ACCENT_BY_MODE,
  ENGINE_CLIP_BY_MODE,
  ENGINE_POSE_BY_MODE,
  isProjectSceneMode,
  validateEngineContract,
} from "@/lib/three/model";
import {
  installEngineShaderPatch,
  updateEngineShader,
} from "@/lib/three/materials";

import type { CognitiveEngineProps } from "./CognitiveEngine";

type ModelCognitiveEngineProps = CognitiveEngineProps & {
  url: string;
};

function cloneModelMaterials(model: THREE.Object3D): THREE.Material[] {
  const materials: THREE.Material[] = [];

  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;

    if (Array.isArray(object.material)) {
      object.material = object.material.map((material) => {
        const nextMaterial = material.clone();
        materials.push(nextMaterial);
        return nextMaterial;
      });
    } else {
      object.material = object.material.clone();
      materials.push(object.material);
    }
  });

  return materials;
}

export function ModelCognitiveEngine({
  mode,
  pointer,
  progress,
  reducedMotion,
  transitionState,
  url,
}: ModelCognitiveEngineProps) {
  const root = useRef<THREE.Group>(null);
  const activeAction = useRef<THREE.AnimationAction | null>(null);
  const awakened = useRef(false);
  const gltf = useGLTF(url);
  const contract = useMemo(
    () => validateEngineContract(gltf.scene, gltf.animations),
    [gltf.animations, gltf.scene],
  );

  const model = useMemo(() => clone(gltf.scene), [gltf.scene]);
  const materials = useMemo(() => {
    const clonedMaterials = cloneModelMaterials(model);

    clonedMaterials.forEach((material) => {
      if (material instanceof THREE.MeshStandardMaterial) {
        installEngineShaderPatch(material, ENGINE_ACCENT_BY_MODE.hero);
      }
    });

    return clonedMaterials;
  }, [model]);
  const targetAccent = useMemo(() => new THREE.Color(), []);
  const { actions, mixer } = useAnimations(gltf.animations, model);

  useEffect(
    () => () => {
      materials.forEach((material) => material.dispose());
    },
    [materials],
  );

  useEffect(() => {
    const clipName = ENGINE_CLIP_BY_MODE[mode];
    const nextAction = actions[clipName] ?? null;
    const projectMode = isProjectSceneMode(mode);

    if (reducedMotion) {
      mixer.stopAllAction();
      if (nextAction) {
        nextAction.reset().play();
        nextAction.paused = true;
        nextAction.time = nextAction.getClip().duration * 0.42;
        activeAction.current = nextAction;
      }
      return;
    }

    const playAction = (action: THREE.AnimationAction | null) => {
      if (!action) return;

      const oneShot =
        clipName === "Disassemble" ||
        clipName === "Reassemble" ||
        clipName === "Shutdown";

      activeAction.current?.fadeOut(0.35);
      action.reset();
      action.setLoop(
        oneShot ? THREE.LoopOnce : THREE.LoopRepeat,
        oneShot ? 1 : Infinity,
      );
      action.clampWhenFinished = oneShot;
      action.fadeIn(0.42).play();
      action.paused = projectMode;
      activeAction.current = action;
    };

    if (!awakened.current) {
      awakened.current = true;
      const awaken = actions.Awaken ?? null;

      if (awaken) {
        awaken.reset();
        awaken.setLoop(THREE.LoopOnce, 1);
        awaken.clampWhenFinished = true;
        awaken.fadeIn(0.2).play();
        activeAction.current = awaken;

        const handleFinished = ({
          action,
        }: {
          action: THREE.AnimationAction;
        }) => {
          if (action !== awaken) return;
          mixer.removeEventListener("finished", handleFinished);
          playAction(nextAction);
        };

        mixer.addEventListener("finished", handleFinished);
        return () => mixer.removeEventListener("finished", handleFinished);
      }
    }

    playAction(nextAction);

    return () => {
      nextAction?.fadeOut(0.28);
    };
  }, [actions, mixer, mode, reducedMotion]);

  useFrame(({ clock }, delta) => {
    const engine = root.current;
    if (!engine) return;

    const pose = ENGINE_POSE_BY_MODE[mode];
    const pointerX = reducedMotion ? 0 : pointer.current.x;
    const pointerY = reducedMotion ? 0 : pointer.current.y;
    const transition = transitionState === "transitioning" ? 1 : 0;
    const targetScale = pose.scale * (transition ? 1.14 : 1);

    engine.position.x = THREE.MathUtils.damp(
      engine.position.x,
      pose.position[0] + pointerX * 0.13,
      3.5,
      delta,
    );
    engine.position.y = THREE.MathUtils.damp(
      engine.position.y,
      pose.position[1] + pointerY * 0.08,
      3.5,
      delta,
    );
    engine.position.z = THREE.MathUtils.damp(
      engine.position.z,
      pose.position[2],
      3.5,
      delta,
    );
    engine.rotation.x = THREE.MathUtils.damp(
      engine.rotation.x,
      pose.rotation[0] - pointerY * 0.06,
      3.5,
      delta,
    );
    engine.rotation.y = THREE.MathUtils.damp(
      engine.rotation.y,
      pose.rotation[1] + pointerX * 0.1,
      3.5,
      delta,
    );
    engine.rotation.z = THREE.MathUtils.damp(
      engine.rotation.z,
      pose.rotation[2],
      3.5,
      delta,
    );
    const nextScale = THREE.MathUtils.damp(
      engine.scale.x,
      targetScale,
      3.5,
      delta,
    );
    engine.scale.setScalar(nextScale);

    if (isProjectSceneMode(mode) && activeAction.current) {
      const duration = activeAction.current.getClip().duration;
      activeAction.current.time = progress.current * duration;
      activeAction.current.paused = true;
    }

    const accent = ENGINE_ACCENT_BY_MODE[mode];
    targetAccent.set(accent);
    materials.forEach((material) => {
      updateEngineShader(material, {
        accent,
        motion: reducedMotion ? 0 : 1,
        time: clock.elapsedTime,
        transition,
      });

      if (material instanceof THREE.MeshStandardMaterial) {
        material.emissive.lerp(targetAccent, 1 - Math.exp(-delta * 3));
      }
    });
  });

  if (!contract.valid) {
    throw new Error(
      `Invalid Cognitive Engine contract: groups=${contract.missingGroups.join(",")}; clips=${contract.missingClips.join(",")}`,
    );
  }

  return (
    <group ref={root}>
      <primitive object={model} />
    </group>
  );
}

export function preloadCognitiveEngine(url: string): void {
  useGLTF.preload(url);
}
