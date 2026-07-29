# Cognitive Engine asset contract

Phase 6 generates and loads the optimized production asset at:

`public/models/cognitive-engine.glb`

The generated source GLB is approximately 615 KB. The production copy is
Meshopt-compressed to approximately 131 KB while preserving the required
runtime contract.

Animation clips:

- Idle
- Awaken
- Orbit
- Disassemble
- Reassemble
- Pulse
- Shutdown

Named groups:

- Core
- OuterRing
- MiddleRing
- InnerRing
- NeuralThreads
- Nodes
- DataFragments
- AccentLights

Regenerate, compress, and audit the asset with:

```bash
pnpm generate:model
pnpm audit:model
```

`pnpm generate:model:raw` rebuilds the uncompressed source form when inspection
before optimization is useful. `pnpm optimize:model` compresses the current
asset and verifies the optimized copy before replacing the production file.

The runtime performs the same contract validation before showing the GLB. A
missing, invalid, or failed model automatically leaves the procedural Cognitive
Engine in place. Low-tier devices intentionally keep the procedural model.
