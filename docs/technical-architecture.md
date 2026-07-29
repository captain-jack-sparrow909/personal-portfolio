# Technical architecture

## Rendering model

Next.js App Router and strict TypeScript are the foundation. Server Components render all essential copy, navigation, project descriptions, capabilities, process stages, and contact content.

Client Components are introduced only when their phase requires them:

- Phase 2: motion provider, animated navigation, mobile menu, pointer interactions
- Phase 3: persistent React Three Fiber canvas and scene controls
- Phase 4: project timeline orchestration and route-transition overlay
- Phase 7: contact form state

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

Phase-specific directories now include `canvas`, `motion`, `hooks`,
`lib/motion`, and `store`. GLB utilities, case-study components, and contact
validation remain deferred to their assigned phases.

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

## WebGL contract

Phase 3 uses one dynamically imported, fixed React Three Fiber Canvas. The
procedural engine implements the future GLB-facing `CognitiveEngine` API.
Continuous camera, pointer, ring, particle, and material values remain in refs
and `useFrame`; Zustand stores only scene mode, active project, transition
state, device tier, reduced-motion state, and canvas readiness.

The renderer clamps DPR by tier, removes postprocessing on low-tier or
reduced-motion devices, pauses its render loop when the page is hidden, and
reacts to WebGL context loss by restoring the static CSS engine.

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

## Failure behavior

- Without JavaScript: the complete semantic portfolio remains visible.
- Without WebGL: the static Cognitive Engine fallback remains.
- Reduced motion: no Lenis or scrubbed sequences; the scene holds a stable pose.
- Missing contact credentials: the future route logs a safe development message and returns a controlled response.

## SEO

Phase 1 supplies canonical metadata, sitemap, robots, and Person JSON-LD.
Phase 5 adds project-specific canonical, Open Graph, and X metadata plus the
shared social-preview asset. Project structured data remains scheduled for
Phase 7.
