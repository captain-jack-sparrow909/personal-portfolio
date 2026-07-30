import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const screenshotSets = {
  "dev-pulse-ai": {
    source: "DevPulseAI",
    images: {
      "entry-point": "DevPulseAI_landing_page.png",
      dashboard: "DevPulseAI_Dashboard_page.png",
      "research-radar": "DevPulseAI_research_radar_page.png",
      "project-memory": "DevPulseA_project_memory_page.png",
      publishing: "DevPulseAI_Publishing_page.png",
    },
  },
  rontgenai: {
    source: "rontgenai",
    images: {
      "public-entry": "rontgenai_landing_page1.png",
      dashboard: "rontgenai_dashboard.png",
      blueprint: "rontgenai_blueprint.png",
      atlas: "rontgenai_atlas.png",
      sentinel: "rontgenai_sentinel.png",
      radar: "rontgenai_radar.png",
      relay: "rontgenai_relay.png",
    },
  },
  cognoraai: {
    source: "cognoraAI",
    images: {
      "product-entry": "cognoraAI_landing_page1.png",
      dashboard: "cognoraAI_dashboard.png",
      "ai-coach": "cognoraAI_AI_Coach_page.png",
      roadmaps: "cognorAI_roadmaps_page.png",
    },
  },
  orkestriaai: {
    source: "orchestriaAI",
    images: {
      "product-entry": "orchestriaAI_landing_page1.png",
      dashboard: "orchestriaAI_dashboard.png",
      loom: "orchestriaAI_loom_page.png",
      aegis: "orchestriaAI_aegis_page.png",
      ensemble: "orchestriaAI_ensemble_page.png",
      verity: "orchestriaAI_verity_page.png",
    },
  },
};

const root = process.cwd();
const sourceRoot = path.join(root, "screenshots");
const outputRoot = path.join(root, "public", "images", "projects");

let sourceBytes = 0;
let outputBytes = 0;
let imageCount = 0;

for (const [project, set] of Object.entries(screenshotSets)) {
  const projectOutput = path.join(outputRoot, project);
  await mkdir(projectOutput, { recursive: true });

  for (const [name, sourceName] of Object.entries(set.images)) {
    const source = path.join(sourceRoot, set.source, sourceName);
    const output = path.join(projectOutput, `${name}.webp`);
    const sourceFile = await stat(source);
    const result = await sharp(source)
      .resize({
        width: 2200,
        withoutEnlargement: true,
      })
      .webp({
        effort: 6,
        quality: 82,
        smartSubsample: true,
      })
      .toFile(output);

    sourceBytes += sourceFile.size;
    outputBytes += result.size;
    imageCount += 1;

    console.log(
      `${project}/${name}.webp ${result.width}×${result.height} ${formatBytes(result.size)}`,
    );
  }
}

console.log(
  `Optimized ${imageCount} captures: ${formatBytes(sourceBytes)} → ${formatBytes(outputBytes)}`,
);

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
