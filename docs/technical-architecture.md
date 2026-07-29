# Technical architecture

## Rendering model

Next.js App Router and strict TypeScript are the foundation. Server Components render all essential copy, navigation, project descriptions, capabilities, process stages, and contact content.

Client Components are introduced only when their phase requires them:

- Phase 2: motion provider, animated navigation, mobile menu, pointer interactions
- Phase 3: persistent React Three Fiber canvas and scene controls
- Phase 4: project timeline orchestration and route-transition overlay
- Phase 7: contact form state
- Phase 8: deferred motion bootstrap and lightweight browser-side validation

## Directory strategy

The application lives under `src/`:

- `src/app`: routes, metadata, sitemap, robots, global styles
- `src/components/layout`: header and footer shells
- `src/components/sections`: semantic home chapters
- `src/components/ui`: reusable presentational primitives
- `src/components/project`: shared case-study sections and visualizations
- `src/components/fallback`: static visual fallback
- `src/content`: typed editorial and project content
- `src/styles`: tokens, typography, and shared utilities
- `docs`: architecture and delivery documentation

Phase-specific directories now include `canvas`, `contact`, `motion`, `hooks`,
`lib/contact`, `lib/motion`, `lib/three`, `lib/validation`, and `store`.

## Content contracts

Projects use a typed `Project` model containing identity, status, accent,
descriptions, problem framing, product concept, modules, conceptual
architecture, decisions, interface explorations, current status, next focus,
technologies, and visual motif. No component owns project facts. Home chapters,
case-study routes, navigation, metadata, and 3D scene modes consume the same
model.

## Styling

Tailwind CSS supplies layout primitives and utilities. CSS Modules own section-specific art direction and complex responsive styling. CSS custom properties define the palette, spacing, type, and grid. `clsx` and `tailwind-merge` provide deterministic composition.

## Motion contract

Phase 2 provides one `MotionProvider` that coordinates Lenis and ScrollTrigger,
scopes GSAP timelines, responds to page visibility, and honors reduced motion.
Motion enhances the server-rendered layout and never owns essential content.

Phase 8 keeps that public contract while splitting its implementation. The
provider publishes reduced-motion state immediately, then dynamically imports
GSAP, ScrollTrigger, Lenis, and the project timelines only for visitors who can
use motion. Initialization is cancellable and teardown removes every listener,
ticker callback, media query, Lenis instance, GSAP context, and ScrollTrigger.
Hash landings keep already-passed reveal content visible.

## WebGL contract

Phase 3 uses one dynamically imported, fixed React Three Fiber Canvas. The
procedural engine implements the future GLB-facing `CognitiveEngine` API.
Continuous camera, pointer, ring, particle, and material values remain in refs
and `useFrame`; Zustand stores only scene mode, active project, transition
state, device tier, reduced-motion state, and canvas readiness.

The renderer clamps DPR by tier, removes postprocessing on low-tier or
reduced-motion devices, pauses its render loop when the page is hidden, and
reacts to WebGL context loss by restoring the static CSS engine.

## Model asset contract

Phase 6 adds a generated GLB at `public/models/cognitive-engine.glb`. A
framework-free Node generator creates the mechanical-neural asset. Phase 8
passes it through deterministic Meshopt compression, and the audit script
verifies GLB 2.0 integrity, the compression extension, the eight required named
groups, the seven required clips, and the 3 MB size target.

The browser checks asset availability before mounting `useGLTF`. The loaded
scene is cloned, its materials are isolated, and its contract is validated
again. `ModelCognitiveEngine` and `ProceduralCognitiveEngine` consume the same
mode, progress, pointer, reduced-motion, and transition props. Suspense, an
engine-specific error boundary, and low-tier policy all resolve to the
procedural implementation.

Both implementations use the same material patch: subtle Fresnel emissive
response, low-amplitude vertex motion, and a restrained transition-only color
separation. Shader uniforms are updated through refs and `useFrame`, never
through React state.

## Project storytelling contract

Phase 4 gives every selected project one semantic, viewport-scale chapter. A
scoped GSAP timeline publishes normalized progress through a browser event into
a mutable scene ref. The ref is consumed by the camera, lighting, Cognitive
Engine, and `ProjectVisualSystem` without causing React renders or continuous
Zustand writes.

Desktop chapters use short pinning windows. Tablet and mobile keep normal
document flow and lightweight entrance sequences. Reduced-motion mode bypasses
scrubbing entirely while preserving all project content and links.

The root route-transition overlay persists across navigation. Project links
carry only route, accent, and display-name metadata; the transition layer owns
the cinematic cover/reveal and falls back to opacity for reduced motion.

## Case-study rendering contract

Phase 5 statically generates all project routes from the shared content model.
Server Components render the hero, overview, module breakdown, conceptual
architecture, interface explorations, decisions, current status, and
next-project navigation.

Architecture diagrams are semantic ordered lists with CSS linework. Interface
frames are explicitly labeled concepts and use CSS composition rather than
invented screenshots. Project metadata is generated per route. The existing
client motion layer only enhances server-rendered content and owns no project
facts.

The root and project metadata share one validated 1200×630 portfolio social
card. It is referenced only through Open Graph and X metadata and does not enter
the visible route payload.

## Contact and production boundary

The contact form is the only client-owned production input surface. It performs
the same field-level rules used by the server to produce immediate accessible
errors, but the route handler remains authoritative. The lightweight browser
validator avoids shipping Zod; the server-only Zod schema performs canonical
normalization and validation.

`POST /api/contact` applies the following sequence:

1. Reject oversized or unreadable request bodies.
2. Silently absorb honeypot submissions.
3. Validate and normalize every accepted field with Zod.
4. Apply the `RateLimiter` abstraction using a connection key.
5. Pass only normalized fields to the server-only email adapter.
6. Return a generic delivery state without provider credentials or internals.

The initial limiter is intentionally process-local and suitable as a basic
defense. Its interface can be replaced by a durable distributed implementation
without changing the route. The initial email adapter targets Resend through
the standard `fetch` API. Provider keys, sender identity and recipient overrides
are read only from server environment variables.

Plausible analytics is opt-in: the script component renders nothing unless
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is configured.

The homepage structured-data graph connects the portfolio `WebSite`, Jabir's
verified `Person` identity and an `ItemList` of selected projects. Each
case-study route also emits its own `CreativeWork` record.

## Failure behavior

- Without JavaScript: the complete semantic portfolio remains visible.
- Without WebGL: the static Cognitive Engine fallback remains.
- Reduced motion: no Lenis or scrubbed sequences; the scene holds a stable pose.
- Missing contact credentials: development logs a safe delivery summary;
  production returns a controlled configuration response and leaves the direct
  email channel available.

## SEO

Phase 1 supplies canonical metadata, sitemap, robots, and Person JSON-LD.
Phase 5 adds project-specific canonical, Open Graph, and X metadata plus the
shared social-preview asset. Phase 7 expands the homepage into a linked
Person/WebSite/project graph and adds one CreativeWork record per case study.

## Quality gate

Vitest covers deterministic validation logic. Playwright exercises the
production build in Chromium, Firefox, WebKit, and a mobile viewport, including
keyboard focus, overflow, reduced motion, WebGL failure, and runtime console
errors. The bundle audit reads the emitted route graph and fails when initial
JavaScript, deferred WebGL, the model, or the social card exceed their budgets.
