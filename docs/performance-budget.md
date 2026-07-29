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
- The production WebGL chunk measures approximately 321 KB gzip, within the
  450 KB deferred-chunk budget.
- DPR is clamped to 1.5 on high, 1.25 on medium, and 1 on low tiers.
- Instancing is used for luminous nodes and data fragments.
- Particle and filament counts step down by device tier.
- Bloom is disabled on low-tier and reduced-motion devices.
- The render loop changes to demand mode for reduced motion and while hidden.
- Context loss restores the CSS fallback instead of removing content.

## Phase 1 measurement

Phase 1 contains no WebGL or client animation runtime. Validation focuses on semantic HTML, font loading, responsive CSS, zero horizontal overflow, and a production build without warnings.

## Monitoring gates

- Inspect route bundle output after every major phase.
- Test a mid-range mobile viewport before shipping a phase.
- Check reduced-motion mode after motion is introduced.
- Record and fix console errors, hydration warnings, stale triggers, and context-loss failures.
