# Performance budget

## Experience targets

- Semantic hero content appears immediately.
- No WebGL dependency blocks first content.
- No severe layout shift after fonts or scene assets load.
- No permanent rendering loop while the document is hidden.
- Mobile remains usable without section pinning or pointer effects.

## Asset budgets

| Asset                                   | Preferred budget |
| --------------------------------------- | ---------------: |
| Final Cognitive Engine GLB              |           ≤ 3 MB |
| Individual texture                      |  ≤ 1K resolution |
| Initial route JavaScript before WebGL   |    ≤ 170 KB gzip |
| Deferred WebGL and postprocessing chunk |    ≤ 450 KB gzip |
| Above-the-fold raster fallback          |         ≤ 180 KB |
| Project gallery image                   |    ≤ 250 KB each |

Budgets are targets rather than license to degrade visual quality. Regressions require an explicit reason.

## Renderer policy

- One persistent Canvas.
- DPR clamped to 1–1.5.
- No real-time shadows unless a measured visual requirement justifies them.
- Geometry and materials are reused.
- Repeated fragments and particles are instanced.
- Tab visibility pauses expensive updates.
- Low tier disables postprocessing and uses fewer particles.

## Quality tiers

- **High:** full procedural/GLB model, controlled bloom, limited ambient occlusion, richer particles.
- **Medium:** DPR near 1, fewer particles, no ambient occlusion, minimal bloom.
- **Low:** simplified geometry, demand-based rendering, no postprocessing.
- **Fallback:** optimized static visual with complete DOM content.

## Phase 3 implementation

- The WebGL scene is dynamically split from the server-rendered route.
- The current production WebGL chunk measures approximately 323 KB gzip,
  including the Phase 4 project motifs, within the
  450 KB deferred-chunk budget.
- DPR is clamped to 1.5 on high, 1.25 on medium, and 1 on low tiers.
- Instancing is used for luminous nodes and data fragments.
- Particle and filament counts step down by device tier.
- Bloom is disabled on low-tier and reduced-motion devices.
- The render loop changes to demand mode for reduced motion and while hidden.
- Context loss restores the CSS fallback instead of removing content.

## Phase 4 implementation

- Project progress travels through a mutable ref and browser event rather than
  React render state.
- Desktop chapters use one scoped timeline each; mobile removes pinning and
  uses normal document flow.
- All repeated project motif nodes and signal fragments use instancing.
- Project motifs reuse the persistent Phase 3 Canvas instead of mounting
  additional renderers.
- Reduced motion removes scrubbed timelines and holds each scene at a stable
  representative state.

## Phase 5 implementation

- Case-study routes are statically generated from the shared typed project
  model.
- Architecture diagrams and interface explorations use no raster assets,
  additional canvas, or visualization dependency.
- Project sections reuse the existing reveal runtime and route-transition
  layer.
- Essential case-study content is server-rendered and visible before client
  animation initializes.
- The 1200×630 social-preview image is metadata-only and is not requested by
  the visible page.

## Phase 6 implementation

- The uncompressed generated GLB measured approximately 615 KB. Phase 8
  Meshopt compression reduces the production asset to approximately 131 KB,
  below the preferred 3 MB budget.
- The complete deferred WebGL chunk, including the GLB loader and shader patch,
  measures approximately 346 KB gzip, below the 450 KB budget.
- Medium and high tiers load the GLB only after an inexpensive availability
  check; low-tier devices keep the procedural engine.
- The model reuses geometry and materials inside the GLB and contains no raster
  textures.
- The asset audit fails when required groups or clips are missing, the file is
  not GLB 2.0, or the preferred size budget is exceeded.

## Phase 8 implementation

- The initial modern route JavaScript measures approximately 160 KB gzip,
  within the 170 KB budget. GSAP and Lenis now enter through a deferred motion
  runtime instead of the initial client graph.
- The deferred WebGL and postprocessing chunk measures approximately 346 KB
  gzip, within the 450 KB budget.
- The production Cognitive Engine is Meshopt-compressed to approximately
  131 KB, a reduction of about 79% from the generated source asset. Its audit
  verifies both the semantic contract and the compression extension.
- The 1200×630 social card is a progressive JPEG of approximately 111 KB, a
  reduction of about 89% from the previous PNG.
- Client-side contact validation no longer imports Zod. The server keeps the
  authoritative Zod schema while the browser uses a small equivalent validator
  for immediate accessible feedback.
- Playwright covers Chromium, Firefox, WebKit, and a mobile Chromium profile.
  It checks semantic rendering, duplicate IDs, horizontal overflow, keyboard
  navigation, mobile focus containment, contact errors, reduced motion, and
  WebGL fallback behavior.
- Motion initialization is cancellable across route transitions. Its cleanup
  destroys Lenis, listeners, GSAP contexts, media queries, ticker callbacks,
  and remaining ScrollTriggers.
- Direct hash navigation skips reveal initialization for content above the
  landing position, preventing an invisible contact form at `/#contact`.

Run `pnpm audit:bundles` after a production build to enforce the JavaScript and
asset thresholds.

## Phase 1 measurement

Phase 1 contains no WebGL or client animation runtime. Validation focuses on semantic HTML, font loading, responsive CSS, zero horizontal overflow, and a production build without warnings.

## Monitoring gates

- Inspect route bundle output after every major phase.
- Test a mid-range mobile viewport before shipping a phase.
- Check reduced-motion mode after motion is introduced.
- Record and fix console errors, hydration warnings, stale triggers, and context-loss failures.
