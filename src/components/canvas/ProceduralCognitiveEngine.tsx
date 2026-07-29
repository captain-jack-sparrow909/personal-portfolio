"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import type { CognitiveEngineProps } from "./CognitiveEngine";

const accentByMode = {
  hero: "#5de4ff",
  identity: "#b8ff63",
  devpulse: "#ff8a5c",
  rontgen: "#5de4ff",
  cognora: "#b8ff63",
  orkestria: "#8974ff",
  contact: "#f2f1ec",
} as const;

const poseByMode = {
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
  CognitiveEngineProps["mode"],
  {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
  }
>;

function buildNodePositions(count: number): THREE.Vector3[] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  return Array.from({ length: count }, (_, index) => {
    const y = 1 - (index / Math.max(1, count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * index;
    const distance = 2.16 + (index % 3) * 0.08;

    return new THREE.Vector3(
      Math.cos(theta) * radius * distance,
      y * distance,
      Math.sin(theta) * radius * distance,
    );
  });
}

function buildFragmentTransforms(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    const radius = 2.55 + (index % 2) * 0.24;

    return {
      position: new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.7) * 1.5,
        Math.sin(angle) * radius * 0.52,
      ),
      rotation: new THREE.Euler(angle * 0.2, angle, angle * 0.35),
      scale: 0.5 + (index % 4) * 0.14,
    };
  });
}

function buildFilaments(count: number): THREE.CatmullRomCurve3[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    const offset = 0.24 * Math.sin(index * 1.7);

    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(Math.cos(angle) * 0.7, Math.sin(angle) * 0.7, offset),
      new THREE.Vector3(
        Math.cos(angle + 0.6) * 1.35,
        Math.sin(angle * 1.3) * 1.15,
        Math.sin(angle) * 0.6,
      ),
      new THREE.Vector3(
        Math.cos(angle + 1.1) * 1.78,
        Math.sin(angle + 0.3) * 1.55,
        Math.cos(angle) * 0.82,
      ),
      new THREE.Vector3(
        Math.cos(angle + 1.45) * 2.15,
        Math.sin(angle + 0.7) * 1.9,
        Math.sin(angle + 0.2) * 0.95,
      ),
    ]);
  });
}

export function ProceduralCognitiveEngine({
  deviceTier,
  mode,
  pointer,
  reducedMotion,
}: CognitiveEngineProps) {
  const root = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const coreMaterial = useRef<THREE.MeshPhysicalMaterial>(null);
  const outerRing = useRef<THREE.Group>(null);
  const middleRing = useRef<THREE.Group>(null);
  const innerRing = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const fragments = useRef<THREE.InstancedMesh>(null);

  const accent = accentByMode[mode];
  const nodeCount =
    deviceTier === "high" ? 28 : deviceTier === "medium" ? 18 : 10;
  const fragmentCount =
    deviceTier === "high" ? 18 : deviceTier === "medium" ? 12 : 6;
  const filamentCount =
    deviceTier === "high" ? 12 : deviceTier === "medium" ? 8 : 4;

  const nodePositions = useMemo(
    () => buildNodePositions(nodeCount),
    [nodeCount],
  );
  const fragmentTransforms = useMemo(
    () => buildFragmentTransforms(fragmentCount),
    [fragmentCount],
  );
  const filaments = useMemo(
    () => buildFilaments(filamentCount),
    [filamentCount],
  );

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();

    nodePositions.forEach((position, index) => {
      dummy.position.copy(position);
      dummy.scale.setScalar(index % 5 === 0 ? 1.45 : 0.86);
      dummy.updateMatrix();
      nodes.current?.setMatrixAt(index, dummy.matrix);
    });
    if (nodes.current) nodes.current.instanceMatrix.needsUpdate = true;

    fragmentTransforms.forEach((fragment, index) => {
      dummy.position.copy(fragment.position);
      dummy.rotation.copy(fragment.rotation);
      dummy.scale.set(0.06 * fragment.scale, 0.32 * fragment.scale, 0.025);
      dummy.updateMatrix();
      fragments.current?.setMatrixAt(index, dummy.matrix);
    });
    if (fragments.current) fragments.current.instanceMatrix.needsUpdate = true;
  }, [fragmentTransforms, nodePositions]);

  useFrame(({ clock }, delta) => {
    const engine = root.current;
    if (!engine) return;

    const pose = poseByMode[mode];
    const pointerX = reducedMotion ? 0 : pointer.current.x;
    const pointerY = reducedMotion ? 0 : pointer.current.y;

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
      pose.scale,
      3.5,
      delta,
    );
    engine.scale.setScalar(nextScale);

    const separation = mode === "identity" ? 0.18 : 0;
    if (outerRing.current) {
      outerRing.current.position.x = THREE.MathUtils.damp(
        outerRing.current.position.x,
        separation,
        3.5,
        delta,
      );
    }
    if (middleRing.current) {
      middleRing.current.position.x = THREE.MathUtils.damp(
        middleRing.current.position.x,
        -separation,
        3.5,
        delta,
      );
    }

    if (!reducedMotion) {
      if (outerRing.current) outerRing.current.rotation.z += delta * 0.08;
      if (middleRing.current) middleRing.current.rotation.x -= delta * 0.11;
      if (innerRing.current) innerRing.current.rotation.y += delta * 0.15;
      if (fragments.current) fragments.current.rotation.y -= delta * 0.035;

      const pulse = 1 + Math.sin(clock.elapsedTime * 1.35) * 0.025;
      core.current?.scale.setScalar(pulse);
      if (coreMaterial.current) {
        coreMaterial.current.emissiveIntensity =
          0.15 + Math.sin(clock.elapsedTime * 1.35) * 0.035;
      }
    }
  });

  return (
    <group ref={root}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.82, deviceTier === "low" ? 2 : 4]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.12}
          color="#071016"
          emissive={accent}
          emissiveIntensity={0.15}
          envMapIntensity={0.7}
          ior={1.42}
          metalness={0.18}
          opacity={0.94}
          ref={coreMaterial}
          roughness={0.14}
          thickness={1.1}
          transmission={0.7}
          transparent
        />
      </mesh>

      <mesh scale={0.64}>
        <dodecahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.35}
          metalness={0.65}
          roughness={0.22}
          wireframe
        />
      </mesh>

      <mesh scale={0.32}>
        <octahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#f2f1ec" wireframe />
      </mesh>

      <group ref={outerRing} rotation={[1.16, 0.18, -0.14]}>
        <mesh>
          <torusGeometry args={[2.15, 0.035, 12, 180]} />
          <meshStandardMaterial
            color="#69737b"
            emissive={accent}
            emissiveIntensity={0.13}
            metalness={0.88}
            roughness={0.18}
          />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[2.15, 0.009, 8, 180]} />
          <meshBasicMaterial color={accent} transparent opacity={0.52} />
        </mesh>
      </group>

      <group ref={middleRing} rotation={[0.22, 1.22, 0.42]}>
        <mesh>
          <torusGeometry args={[1.68, 0.052, 14, 160]} />
          <meshStandardMaterial
            color="#48525a"
            emissive={accent}
            emissiveIntensity={0.1}
            metalness={0.84}
            roughness={0.2}
          />
        </mesh>
      </group>

      <group ref={innerRing} rotation={[0.56, 0.35, 1.24]}>
        <mesh>
          <torusGeometry args={[1.27, 0.025, 10, 140]} />
          <meshStandardMaterial
            color="#a8b1b6"
            emissive={accent}
            emissiveIntensity={0.12}
            metalness={0.78}
            roughness={0.16}
          />
        </mesh>
      </group>

      {filaments.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 36, 0.008, 4, false]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? accent : "#829097"}
            opacity={index % 3 === 0 ? 0.72 : 0.3}
            transparent
          />
        </mesh>
      ))}

      <instancedMesh args={[undefined, undefined, nodeCount]} ref={nodes}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshStandardMaterial
          color="#dffaff"
          emissive={accent}
          emissiveIntensity={1.6}
          roughness={0.18}
          toneMapped={false}
        />
      </instancedMesh>

      <instancedMesh
        args={[undefined, undefined, fragmentCount]}
        ref={fragments}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.38}
          metalness={0.6}
          roughness={0.25}
          transparent
          opacity={0.72}
        />
      </instancedMesh>

      <pointLight color={accent} distance={5} intensity={1.4} />
    </group>
  );
}
