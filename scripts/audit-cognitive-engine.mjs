import { readFile } from "node:fs/promises";
import path from "node:path";

const expectedGroups = [
  "Core",
  "OuterRing",
  "MiddleRing",
  "InnerRing",
  "NeuralThreads",
  "Nodes",
  "DataFragments",
  "AccentLights",
];

const expectedAnimations = [
  "Idle",
  "Awaken",
  "Orbit",
  "Disassemble",
  "Reassemble",
  "Pulse",
  "Shutdown",
];

const modelPath = path.resolve(
  process.cwd(),
  process.argv[2] ?? "public/models/cognitive-engine.glb",
);

let binary;
try {
  binary = await readFile(modelPath);
} catch {
  console.error(`Cognitive Engine model not found: ${modelPath}`);
  process.exit(1);
}

if (binary.length < 20 || binary.toString("utf8", 0, 4) !== "glTF") {
  console.error("Invalid GLB header.");
  process.exit(1);
}

const version = binary.readUInt32LE(4);
const declaredLength = binary.readUInt32LE(8);
const jsonLength = binary.readUInt32LE(12);
const jsonType = binary.readUInt32LE(16);

if (
  version !== 2 ||
  declaredLength !== binary.length ||
  jsonType !== 0x4e4f534a
) {
  console.error("The model is not a valid GLB 2.0 asset.");
  process.exit(1);
}

const document = JSON.parse(
  binary
    .toString("utf8", 20, 20 + jsonLength)
    .replace(/\u0000/g, "")
    .trim(),
);

const nodeNames = new Set(
  (document.nodes ?? []).map((node) => node.name).filter(Boolean),
);
const animationNames = new Set(
  (document.animations ?? [])
    .map((animation) => animation.name)
    .filter(Boolean),
);
const missingGroups = expectedGroups.filter((name) => !nodeNames.has(name));
const missingAnimations = expectedAnimations.filter(
  (name) => !animationNames.has(name),
);
const sizeBudget = 3 * 1024 * 1024;
const errors = [];

if (missingGroups.length > 0) {
  errors.push(`Missing groups: ${missingGroups.join(", ")}`);
}
if (missingAnimations.length > 0) {
  errors.push(`Missing animations: ${missingAnimations.join(", ")}`);
}
if (binary.length > sizeBudget) {
  errors.push(
    `Model exceeds the 3 MB preferred budget: ${binary.length} bytes`,
  );
}

console.log(
  JSON.stringify(
    {
      animations: [...animationNames],
      groups: expectedGroups.filter((name) => nodeNames.has(name)),
      meshes: document.meshes?.length ?? 0,
      path: path.relative(process.cwd(), modelPath),
      sizeBytes: binary.length,
      version,
    },
    null,
    2,
  ),
);

if (errors.length > 0) {
  errors.forEach((error) => console.error(error));
  process.exit(1);
}
