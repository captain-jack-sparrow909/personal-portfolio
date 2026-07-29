import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

class NodeFileReader {
  result = null;
  onloadend = null;
  onerror = null;

  readAsArrayBuffer(blob) {
    void blob
      .arrayBuffer()
      .then((result) => {
        this.result = result;
        this.onloadend?.();
      })
      .catch((error) => this.onerror?.(error));
  }

  readAsDataURL(blob) {
    void blob
      .arrayBuffer()
      .then((result) => {
        const base64 = Buffer.from(result).toString("base64");
        this.result = `data:${blob.type};base64,${base64}`;
        this.onloadend?.();
      })
      .catch((error) => this.onerror?.(error));
  }
}

globalThis.FileReader ??= NodeFileReader;

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const outputPath = path.resolve(
  projectRoot,
  process.argv[2] ?? "public/models/cognitive-engine.glb",
);

const accent = new THREE.Color("#5de4ff");
const darkMetal = new THREE.MeshStandardMaterial({
  color: "#10191f",
  emissive: accent,
  emissiveIntensity: 0.08,
  metalness: 0.88,
  roughness: 0.18,
});
const paleMetal = new THREE.MeshStandardMaterial({
  color: "#748189",
  emissive: accent,
  emissiveIntensity: 0.05,
  metalness: 0.78,
  roughness: 0.2,
});
const signalMaterial = new THREE.MeshStandardMaterial({
  color: accent,
  emissive: accent,
  emissiveIntensity: 1.4,
  metalness: 0.28,
  roughness: 0.18,
});
const coreMaterial = new THREE.MeshPhysicalMaterial({
  clearcoat: 1,
  clearcoatRoughness: 0.12,
  color: "#071016",
  emissive: accent,
  emissiveIntensity: 0.16,
  ior: 1.42,
  metalness: 0.2,
  opacity: 0.94,
  roughness: 0.14,
  thickness: 1,
  transmission: 0.68,
  transparent: true,
});

const scene = new THREE.Scene();
scene.name = "CognitiveEngineAsset";

const root = new THREE.Group();
root.name = "CognitiveEngine";
scene.add(root);

const core = new THREE.Group();
core.name = "Core";
root.add(core);

const coreShell = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.82, 4),
  coreMaterial,
);
coreShell.name = "CoreShell";
core.add(coreShell);

const coreMechanism = new THREE.Mesh(
  new THREE.DodecahedronGeometry(0.62, 1),
  signalMaterial,
);
coreMechanism.name = "CoreMechanism";
coreMechanism.material = signalMaterial.clone();
coreMechanism.material.wireframe = true;
core.add(coreMechanism);

const center = new THREE.Mesh(new THREE.OctahedronGeometry(0.26, 2), paleMetal);
center.name = "DecisionCore";
core.add(center);

function createRing(name, radius, tube, rotation, material) {
  const ring = new THREE.Group();
  ring.name = name;
  ring.rotation.set(...rotation);

  const main = new THREE.Mesh(
    new THREE.TorusGeometry(radius, tube, 12, 144),
    material,
  );
  main.name = `${name}Rail`;
  ring.add(main);

  const signal = new THREE.Mesh(
    new THREE.TorusGeometry(radius, Math.max(0.008, tube * 0.22), 8, 144),
    signalMaterial,
  );
  signal.name = `${name}Signal`;
  signal.rotation.z = Math.PI / 3;
  ring.add(signal);

  root.add(ring);
  return ring;
}

createRing("OuterRing", 2.15, 0.04, [1.16, 0.18, -0.14], darkMetal);
createRing("MiddleRing", 1.68, 0.052, [0.22, 1.22, 0.42], darkMetal);
createRing("InnerRing", 1.27, 0.028, [0.56, 0.35, 1.24], paleMetal);

const neuralThreads = new THREE.Group();
neuralThreads.name = "NeuralThreads";
root.add(neuralThreads);

for (let index = 0; index < 10; index += 1) {
  const angle = (index / 10) * Math.PI * 2;
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(Math.cos(angle) * 0.72, Math.sin(angle) * 0.72, 0),
    new THREE.Vector3(
      Math.cos(angle + 0.6) * 1.3,
      Math.sin(angle * 1.3) * 1.1,
      Math.sin(angle) * 0.55,
    ),
    new THREE.Vector3(
      Math.cos(angle + 1.1) * 1.75,
      Math.sin(angle + 0.3) * 1.5,
      Math.cos(angle) * 0.78,
    ),
    new THREE.Vector3(
      Math.cos(angle + 1.45) * 2.12,
      Math.sin(angle + 0.7) * 1.86,
      Math.sin(angle + 0.2) * 0.92,
    ),
  ]);
  const thread = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 28, 0.009, 4, false),
    index % 3 === 0 ? signalMaterial : paleMetal,
  );
  thread.name = `NeuralThread_${String(index + 1).padStart(2, "0")}`;
  neuralThreads.add(thread);
}

const nodes = new THREE.Group();
nodes.name = "Nodes";
root.add(nodes);

const nodeGeometry = new THREE.SphereGeometry(0.052, 10, 10);
const goldenAngle = Math.PI * (3 - Math.sqrt(5));
for (let index = 0; index < 22; index += 1) {
  const y = 1 - (index / 21) * 2;
  const radius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = goldenAngle * index;
  const distance = 2.16 + (index % 3) * 0.08;
  const node = new THREE.Mesh(nodeGeometry, signalMaterial);
  node.name = `Node_${String(index + 1).padStart(2, "0")}`;
  node.position.set(
    Math.cos(theta) * radius * distance,
    y * distance,
    Math.sin(theta) * radius * distance,
  );
  node.scale.setScalar(index % 5 === 0 ? 1.4 : 0.84);
  nodes.add(node);
}

const dataFragments = new THREE.Group();
dataFragments.name = "DataFragments";
root.add(dataFragments);

const fragmentGeometry = new THREE.BoxGeometry(0.08, 0.38, 0.028);
for (let index = 0; index < 14; index += 1) {
  const angle = (index / 14) * Math.PI * 2;
  const radius = 2.5 + (index % 2) * 0.23;
  const fragment = new THREE.Mesh(fragmentGeometry, darkMetal);
  fragment.name = `DataFragment_${String(index + 1).padStart(2, "0")}`;
  fragment.position.set(
    Math.cos(angle) * radius,
    Math.sin(angle * 1.7) * 1.45,
    Math.sin(angle) * radius * 0.5,
  );
  fragment.rotation.set(angle * 0.2, angle, angle * 0.35);
  dataFragments.add(fragment);
}

const accentLights = new THREE.Group();
accentLights.name = "AccentLights";
root.add(accentLights);

for (let index = 0; index < 8; index += 1) {
  const angle = (index / 8) * Math.PI * 2;
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 10, 10),
    signalMaterial,
  );
  marker.name = `AccentLight_${String(index + 1).padStart(2, "0")}`;
  marker.position.set(
    Math.cos(angle) * 1.05,
    Math.sin(angle * 1.4) * 0.85,
    Math.sin(angle) * 0.8,
  );
  accentLights.add(marker);
}

function quaternionValues(baseRotation, axis, angles) {
  const base = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(...baseRotation),
  );

  return angles.flatMap((angle) => {
    const delta = new THREE.Quaternion().setFromAxisAngle(axis, angle);
    const quaternion = base.clone().multiply(delta);
    return quaternion.toArray();
  });
}

const clips = [
  new THREE.AnimationClip("Idle", 4, [
    new THREE.VectorKeyframeTrack(
      "Core.scale",
      [0, 2, 4],
      [1, 1, 1, 1.045, 1.045, 1.045, 1, 1, 1],
    ),
  ]),
  new THREE.AnimationClip("Awaken", 1.8, [
    new THREE.VectorKeyframeTrack(
      "CognitiveEngine.scale",
      [0, 1.8],
      [0.72, 0.72, 0.72, 1, 1, 1],
    ),
    new THREE.QuaternionKeyframeTrack(
      "OuterRing.quaternion",
      [0, 1.8],
      quaternionValues(
        [1.16, 0.18, -0.14],
        new THREE.Vector3(0, 0, 1),
        [-0.9, 0],
      ),
    ),
  ]),
  new THREE.AnimationClip("Orbit", 6, [
    new THREE.QuaternionKeyframeTrack(
      "OuterRing.quaternion",
      [0, 6],
      quaternionValues([1.16, 0.18, -0.14], new THREE.Vector3(0, 0, 1), [
        0,
        Math.PI * 2,
      ]),
    ),
    new THREE.QuaternionKeyframeTrack(
      "MiddleRing.quaternion",
      [0, 6],
      quaternionValues([0.22, 1.22, 0.42], new THREE.Vector3(1, 0, 0), [
        0,
        -Math.PI * 2,
      ]),
    ),
    new THREE.QuaternionKeyframeTrack(
      "InnerRing.quaternion",
      [0, 6],
      quaternionValues([0.56, 0.35, 1.24], new THREE.Vector3(0, 1, 0), [
        0,
        Math.PI * 2,
      ]),
    ),
  ]),
  new THREE.AnimationClip("Disassemble", 2.2, [
    new THREE.VectorKeyframeTrack(
      "OuterRing.position",
      [0, 2.2],
      [0, 0, 0, 0.48, 0.12, 0],
    ),
    new THREE.VectorKeyframeTrack(
      "MiddleRing.position",
      [0, 2.2],
      [0, 0, 0, -0.38, -0.08, 0.1],
    ),
    new THREE.VectorKeyframeTrack(
      "NeuralThreads.scale",
      [0, 2.2],
      [1, 1, 1, 1.18, 1.18, 1.18],
    ),
  ]),
  new THREE.AnimationClip("Reassemble", 2.2, [
    new THREE.VectorKeyframeTrack(
      "OuterRing.position",
      [0, 2.2],
      [0.48, 0.12, 0, 0, 0, 0],
    ),
    new THREE.VectorKeyframeTrack(
      "MiddleRing.position",
      [0, 2.2],
      [-0.38, -0.08, 0.1, 0, 0, 0],
    ),
    new THREE.VectorKeyframeTrack(
      "NeuralThreads.scale",
      [0, 2.2],
      [1.18, 1.18, 1.18, 1, 1, 1],
    ),
  ]),
  new THREE.AnimationClip("Pulse", 2.4, [
    new THREE.VectorKeyframeTrack(
      "Core.scale",
      [0, 1.2, 2.4],
      [1, 1, 1, 1.12, 1.12, 1.12, 1, 1, 1],
    ),
    new THREE.VectorKeyframeTrack(
      "AccentLights.scale",
      [0, 1.2, 2.4],
      [1, 1, 1, 1.35, 1.35, 1.35, 1, 1, 1],
    ),
  ]),
  new THREE.AnimationClip("Shutdown", 1.6, [
    new THREE.VectorKeyframeTrack(
      "Nodes.scale",
      [0, 1.6],
      [1, 1, 1, 0.01, 0.01, 0.01],
    ),
    new THREE.VectorKeyframeTrack(
      "DataFragments.scale",
      [0, 1.6],
      [1, 1, 1, 0.01, 0.01, 0.01],
    ),
    new THREE.VectorKeyframeTrack(
      "CognitiveEngine.scale",
      [0, 1.6],
      [1, 1, 1, 0.78, 0.78, 0.78],
    ),
  ]),
];

scene.updateMatrixWorld(true);

const exporter = new GLTFExporter();
const binary = await exporter.parseAsync(scene, {
  animations: clips,
  binary: true,
  includeCustomExtensions: false,
  onlyVisible: true,
  trs: true,
});

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, Buffer.from(binary));

const size = Buffer.byteLength(Buffer.from(binary));
console.log(
  JSON.stringify(
    {
      animations: clips.map((clip) => clip.name),
      output: path.relative(projectRoot, outputPath),
      sizeBytes: size,
    },
    null,
    2,
  ),
);
