# Cognitive Engine asset contract

Phase 6 generates and loads the optimized production asset at:

`public/models/cognitive-engine.glb`

The generated GLB currently measures approximately 615 KB. It is built from
custom procedural geometry and contains the required runtime contract.

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

Regenerate and audit the asset with:

```bash
pnpm generate:model
pnpm audit:model
```

The runtime performs the same contract validation before showing the GLB. A
missing, invalid, or failed model automatically leaves the procedural Cognitive
Engine in place. Low-tier devices intentionally keep the procedural model.
