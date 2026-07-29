"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import type { DeviceTier } from "@/store/scene-store";

type ParticleFieldProps = {
  deviceTier: DeviceTier;
  reducedMotion: boolean;
};

function createParticlePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const seed = index + 1;
    const radius = 4 + ((seed * 37) % 100) / 13;
    const theta = seed * 2.399963;
    const phi = Math.acos(1 - (2 * ((seed * 53) % count)) / count);

    positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[index * 3 + 2] = radius * Math.cos(phi) - 2;
  }

  return positions;
}

export function ParticleField({
  deviceTier,
  reducedMotion,
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);
  const count =
    deviceTier === "high" ? 760 : deviceTier === "medium" ? 380 : 140;
  const positions = useMemo(() => createParticlePositions(count), [count]);

  useFrame((_, delta) => {
    if (!reducedMotion && points.current) {
      points.current.rotation.y += delta * 0.006;
      points.current.rotation.x -= delta * 0.002;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#d9f7ff"
        depthWrite={false}
        opacity={deviceTier === "low" ? 0.35 : 0.5}
        size={deviceTier === "high" ? 0.018 : 0.024}
        sizeAttenuation
        transparent
      />
    </points>
  );
}
