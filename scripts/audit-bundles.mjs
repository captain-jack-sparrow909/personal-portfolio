import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = process.cwd();
const nextDirectory = path.join(root, ".next");
const indexPath = path.join(nextDirectory, "server/app/index.html");
const chunkDirectory = path.join(nextDirectory, "static/chunks");
const budgets = {
  initialJavaScript: 170 * 1024,
  deferredWebGL: 450 * 1024,
  model: 3 * 1024 * 1024,
  socialCard: 300 * 1024,
};

let html;
try {
  html = await readFile(indexPath, "utf8");
} catch {
  console.error("Production output is missing. Run `pnpm build` first.");
  process.exit(1);
}

const scriptTags = [
  ...html.matchAll(/<script\b[^>]*\bsrc="([^"]+\.js)"[^>]*>/g),
];
const initialAssets = [
  ...new Set(
    scriptTags
      .filter((match) => !/\bnomodule\b/i.test(match[0]))
      .map((match) => match[1])
      .filter((asset) => asset.startsWith("/_next/static/chunks/")),
  ),
];

const gzipSize = async (file) => gzipSync(await readFile(file)).length;
let initialJavaScript = 0;

for (const asset of initialAssets) {
  const file = path.join(nextDirectory, asset.replace(/^\/_next\//, ""));
  initialJavaScript += await gzipSize(file);
}

const chunkFiles = await import("node:fs/promises").then(({ readdir }) =>
  readdir(chunkDirectory),
);
let deferredWebGL = 0;
let deferredWebGLFile = "";

for (const filename of chunkFiles.filter((file) => file.endsWith(".js"))) {
  const file = path.join(chunkDirectory, filename);
  const source = await readFile(file, "utf8");

  if (
    source.includes("cognitive-engine.glb") ||
    source.includes("engineFresnel")
  ) {
    deferredWebGL += await gzipSize(file);
    deferredWebGLFile = filename;
  }
}

const model = (
  await stat(path.join(root, "public/models/cognitive-engine.glb"))
).size;
const socialCard = (await stat(path.join(root, "public/og.jpg"))).size;

const result = {
  deferredWebGL: {
    budgetBytes: budgets.deferredWebGL,
    file: deferredWebGLFile,
    gzipBytes: deferredWebGL,
  },
  initialJavaScript: {
    assets: initialAssets.length,
    budgetBytes: budgets.initialJavaScript,
    gzipBytes: initialJavaScript,
  },
  model: {
    budgetBytes: budgets.model,
    bytes: model,
  },
  socialCard: {
    budgetBytes: budgets.socialCard,
    bytes: socialCard,
  },
};

console.log(JSON.stringify(result, null, 2));

const failures = [
  initialJavaScript > budgets.initialJavaScript &&
    `Initial JavaScript exceeds 170 KiB: ${initialJavaScript} bytes gzip`,
  deferredWebGL > budgets.deferredWebGL &&
    `Deferred WebGL exceeds 450 KiB: ${deferredWebGL} bytes gzip`,
  model > budgets.model && `GLB exceeds 3 MiB: ${model} bytes`,
  socialCard > budgets.socialCard &&
    `Social card exceeds 300 KiB: ${socialCard} bytes`,
].filter(Boolean);

if (failures.length > 0) {
  failures.forEach((failure) => console.error(failure));
  process.exit(1);
}
