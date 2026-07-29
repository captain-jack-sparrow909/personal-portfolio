"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

import type { DeviceTier, ProjectMode, SceneMode } from "@/store/scene-store";

type ProjectVisualSystemProps = {
  deviceTier: DeviceTier;
  mode: SceneMode;
  progress: RefObject<number>;
  reducedMotion: boolean;
};

function DevPulseVisual({
  count,
  progress,
  reducedMotion,
}: {
  count: number;
  progress: RefObject<number>;
  reducedMotion: boolean;
}) {
  const fragments = useRef<THREE.InstancedMesh>(null);
  const ribbon = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }, delta) => {
    const mesh = fragments.current;
    if (!mesh) return;

    const chapter = reducedMotion ? 0.56 : progress.current;
    const time = reducedMotion ? 0 : clock.elapsedTime;

    for (let index = 0; index < count; index += 1) {
      const phase = (index / count + time * 0.035) % 1;
      const x = THREE.MathUtils.lerp(-2.7, 2.7, phase);
      const envelope = Math.sin(Math.PI * Math.min(1, chapter * 1.4));
      const y = Math.sin(phase * Math.PI * 4 + time * 0.9) * 0.5 * envelope;

      dummy.position.set(x, y, Math.sin(phase * Math.PI * 2) * 0.28);
      dummy.rotation.set(0, phase * Math.PI, phase * 0.5);
      dummy.scale.set(0.08 + chapter * 0.08, 0.028, 0.018);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (ribbon.current) {
      ribbon.current.rotation.z = THREE.MathUtils.damp(
        ribbon.current.rotation.z,
        (chapter - 0.5) * 0.16,
        4,
        delta,
      );
    }
  });

  return (
    <group position={[0.7, -0.15, -0.55]} ref={ribbon}>
      <instancedMesh args={[undefined, undefined, count]} ref={fragments}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ff8a5c" toneMapped={false} />
      </instancedMesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.7, 0.008, 4, 120, Math.PI]} />
        <meshBasicMaterial color="#ff8a5c" opacity={0.36} transparent />
      </mesh>
    </group>
  );
}

function RontgenVisual({
  progress,
  reducedMotion,
}: {
  progress: RefObject<number>;
  reducedMotion: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Mesh>(null);
  const scanMaterial = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    const chapter = reducedMotion ? 0.55 : progress.current;
    if (scan.current) {
      scan.current.position.x = THREE.MathUtils.damp(
        scan.current.position.x,
        THREE.MathUtils.lerp(-2.15, 2.15, chapter),
        7,
        delta,
      );
    }
    if (scanMaterial.current) {
      scanMaterial.current.opacity = 0.18 + Math.sin(chapter * Math.PI) * 0.28;
    }
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(
        root.current.rotation.y,
        -0.14 + chapter * 0.28,
        4,
        delta,
      );
    }
  });

  return (
    <group position={[-0.8, 0, -0.65]} ref={root}>
      {[-0.72, 0, 0.72].map((depth, index) => (
        <mesh key={depth} position={[0, 0, depth]} scale={[2.2, 1.5, 0.025]}>
          <boxGeometry />
          <meshBasicMaterial
            color={index === 1 ? "#5de4ff" : "#748189"}
            opacity={index === 1 ? 0.13 : 0.07}
            transparent
            wireframe
          />
        </mesh>
      ))}
      <mesh position={[-2.15, 0, 0]} ref={scan} scale={[0.018, 1.7, 1.1]}>
        <boxGeometry />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color="#5de4ff"
          opacity={0.3}
          ref={scanMaterial}
          transparent
        />
      </mesh>
    </group>
  );
}

const cognoraPositions = [
  [-1.8, 0.2, 0],
  [-1.15, 1.05, -0.15],
  [-0.75, -0.85, 0.2],
  [0, 0.25, 0.35],
  [0.65, 1.2, -0.1],
  [0.9, -0.9, 0],
  [1.6, 0.45, 0.18],
  [2.05, -0.45, -0.18],
] as const;

function CognoraVisual({
  progress,
  reducedMotion,
}: {
  progress: RefObject<number>;
  reducedMotion: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const nodeMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const lineMaterial = useRef<THREE.LineBasicMaterial>(null);

  const linePositions = useMemo(() => {
    const points: number[] = [];

    for (let index = 1; index < cognoraPositions.length; index += 1) {
      const parent = cognoraPositions[Math.floor((index - 1) / 2)];
      const child = cognoraPositions[index];
      points.push(...parent, ...child);
    }

    return new Float32Array(points);
  }, []);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();

    cognoraPositions.forEach((position, index) => {
      dummy.position.set(position[0], position[1], position[2]);
      dummy.scale.setScalar(index === 3 ? 1.5 : 0.85);
      dummy.updateMatrix();
      nodes.current?.setMatrixAt(index, dummy.matrix);
    });

    if (nodes.current) nodes.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((_, delta) => {
    const chapter = reducedMotion ? 0.7 : progress.current;
    if (root.current) {
      const nextScale = THREE.MathUtils.damp(
        root.current.scale.x,
        0.72 + chapter * 0.28,
        5,
        delta,
      );
      root.current.scale.setScalar(nextScale);
      root.current.rotation.z = THREE.MathUtils.damp(
        root.current.rotation.z,
        (chapter - 0.5) * 0.09,
        4,
        delta,
      );
    }
    if (nodeMaterial.current) {
      nodeMaterial.current.opacity = 0.18 + chapter * 0.82;
    }
    if (lineMaterial.current) {
      lineMaterial.current.opacity = 0.08 + chapter * 0.42;
    }
  });

  return (
    <group position={[0.85, 0, -0.62]} ref={root}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            args={[linePositions, 3]}
            attach="attributes-position"
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#b8ff63"
          opacity={0.35}
          ref={lineMaterial}
          transparent
        />
      </lineSegments>
      <instancedMesh
        args={[undefined, undefined, cognoraPositions.length]}
        ref={nodes}
      >
        <sphereGeometry args={[0.085, 10, 10]} />
        <meshBasicMaterial
          color="#b8ff63"
          ref={nodeMaterial}
          toneMapped={false}
          transparent
        />
      </instancedMesh>
    </group>
  );
}

function OrkestriaVisual({
  count,
  progress,
  reducedMotion,
}: {
  count: number;
  progress: RefObject<number>;
  reducedMotion: boolean;
}) {
  const agents = useRef<THREE.InstancedMesh>(null);
  const approvalCore = useRef<THREE.Mesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }, delta) => {
    const mesh = agents.current;
    if (!mesh) return;

    const chapter = reducedMotion ? 0.7 : progress.current;
    const time = reducedMotion ? 0 : clock.elapsedTime * 0.12;
    const radius = 1.15 + chapter * 1.05;

    for (let index = 0; index < count; index += 1) {
      const angle = (index / count) * Math.PI * 2 + time;
      const waiting = index % 3 === 0 && chapter < 0.68;
      const nodeRadius = waiting ? radius * 0.72 : radius;

      dummy.position.set(
        Math.cos(angle) * nodeRadius,
        Math.sin(angle) * nodeRadius * 0.58,
        Math.sin(angle * 1.6) * 0.52,
      );
      dummy.rotation.set(angle * 0.2, angle, 0);
      dummy.scale.setScalar(waiting ? 0.65 : 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (approvalCore.current) {
      const pulse = 0.92 + Math.sin(chapter * Math.PI) * 0.16;
      approvalCore.current.scale.setScalar(
        THREE.MathUtils.damp(approvalCore.current.scale.x, pulse, 5, delta),
      );
    }
  });

  return (
    <group position={[-0.78, -0.05, -0.68]}>
      <mesh ref={approvalCore}>
        <octahedronGeometry args={[0.26, 1]} />
        <meshBasicMaterial color="#f2f1ec" wireframe />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.65, 0.012, 6, 120]} />
        <meshBasicMaterial color="#8974ff" opacity={0.45} transparent />
      </mesh>
      <instancedMesh args={[undefined, undefined, count]} ref={agents}>
        <dodecahedronGeometry args={[0.13, 0]} />
        <meshStandardMaterial
          color="#8974ff"
          emissive="#8974ff"
          emissiveIntensity={1.1}
          roughness={0.22}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

function isProjectMode(mode: SceneMode): mode is ProjectMode {
  return (
    mode === "devpulse" ||
    mode === "rontgen" ||
    mode === "cognora" ||
    mode === "orkestria"
  );
}

export function ProjectVisualSystem({
  deviceTier,
  mode,
  progress,
  reducedMotion,
}: ProjectVisualSystemProps) {
  if (!isProjectMode(mode)) return null;

  const count = deviceTier === "high" ? 22 : deviceTier === "medium" ? 16 : 10;

  if (mode === "devpulse") {
    return (
      <DevPulseVisual
        count={count}
        progress={progress}
        reducedMotion={reducedMotion}
      />
    );
  }

  if (mode === "rontgen") {
    return <RontgenVisual progress={progress} reducedMotion={reducedMotion} />;
  }

  if (mode === "cognora") {
    return <CognoraVisual progress={progress} reducedMotion={reducedMotion} />;
  }

  return (
    <OrkestriaVisual
      count={Math.max(8, Math.round(count * 0.72))}
      progress={progress}
      reducedMotion={reducedMotion}
    />
  );
}
