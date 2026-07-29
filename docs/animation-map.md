# Animation map

This document defines the motion system across delivery phases. Phase 2 now
implements the shared DOM motion foundation; WebGL and project-specific scene
choreography remain reserved for their later phases.

## Global rules

- GSAP owns timeline choreography.
- ScrollTrigger owns scroll-linked progress.
- Lenis owns smooth scrolling and is disabled for reduced motion.
- CSS owns hover, focus, and small state transitions.
- React Three Fiber owns continuous 3D motion.
- Transform and opacity are preferred; layout properties are not scrubbed.

## Sequence map

### Preloader

`JK wireframe → scan → honest asset progress → particles converge → Cognitive Engine silhouette → mask reveal`

Target duration: 1.4–2 seconds after required assets are ready. Session replay is shortened. Timeout and WebGL-failure paths always release the page.

### Navigation

At the top, the navigation is transparent and wide. After the first threshold it contracts, gains a subtle surface and border, and updates a small active-section indicator. Magnetic displacement remains below 6px.

### Hero

1. Eyebrow fades and rises.
2. Three headline lines reveal through independent masks.
3. Engine pieces assemble.
4. Nodes activate in a controlled sequence.
5. Camera pushes in slightly.
6. Grid opacity rises.
7. CTA row appears.
8. Technical ticker begins a slow continuous translation.

### Manifesto

Each discipline activates one conceptual engine layer. Technical keywords enter on short orbital paths; copy remains stationary enough to read.

### Projects

Each chapter owns a scoped ScrollTrigger timeline:

`index → category → masked title → description → scene mode → labels → CTA → progress`

Alignment alternates by project. Desktop may use short pinning; mobile uses normal flow and short reveals.

### Capabilities

Desktop selection changes constellation topology and engine layer. Mobile uses an accessible accordion with a lightweight visual response.

### Process

One signal moves across the five-stage line. The line becomes vertical on mobile.

### Contact

Engine reassembles into an abstract JK mark while the contact headline resolves. Pointer influence affects only the final glow field.

## Reduced-motion mapping

- Preloader becomes a short opacity transition or is skipped.
- Text masks become immediate short fades.
- No smooth scrolling or pinned scrub sequences.
- Parallax and pointer influence are removed.
- The Cognitive Engine holds a stable, readable pose.
- Content order and spacing remain identical.

## Cleanup requirements

All GSAP contexts, ScrollTriggers, Lenis listeners, pointer listeners, visibility listeners, and requestAnimationFrame callbacks must be disposed on unmount and route transition.

## Phase 2 implementation status

Implemented:

- One `MotionProvider` connecting Lenis updates to ScrollTrigger
- Font-ready refresh and page-visibility pause/resume behavior
- Masked hero typography and supporting-copy entrance
- Reusable viewport reveals through semantic data attributes
- Desktop-only layered scroll parallax
- Continuous technical ticker and restrained signal-orbit motion
- Contracting navigation shell and active-section states
- Magnetic pointer response below a six-pixel visual displacement
- Accessible masked mobile navigation with focus trapping and restoration
- Reduced-motion bypass for smooth scrolling, parallax, scrubbing, and loops

Deferred:

- Project-specific engine transformations
- Pinned project choreography
- Case-study page transitions

## Phase 3 implementation status

Implemented:

- One persistent, dynamically loaded WebGL canvas
- Procedural Cognitive Engine with core, rings, filaments, nodes, and fragments
- Section-aware camera, pose, accent-light, and engine state
- Pointer influence that is disabled for touch, low-tier, and reduced motion
- Adaptive particle density, geometry detail, DPR, and bloom
- Page-visibility pausing and WebGL context-loss fallback
- Stable reduced-motion pose and persistent semantic DOM content

Deferred:

- Full project-specific geometry transformations and pinned choreography
- Case-study transitions
- Final GLB clips, named groups, and shader refinement
