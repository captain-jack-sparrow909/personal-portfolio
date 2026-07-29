# Technical architecture

## Rendering model

Next.js App Router and strict TypeScript are the foundation. Server Components render all essential copy, navigation, project descriptions, capabilities, process stages, and contact content.

Client Components are introduced only when their phase requires them:

- Phase 2: motion provider, animated navigation, mobile menu, pointer interactions
- Phase 3: persistent React Three Fiber canvas and scene controls
- Phase 7: contact form state

## Directory strategy

The application lives under `src/`:

- `src/app`: routes, metadata, sitemap, robots, global styles
- `src/components/layout`: header and footer shells
- `src/components/sections`: semantic home chapters
- `src/components/ui`: reusable presentational primitives
- `src/components/fallback`: static visual fallback
- `src/content`: typed editorial and project content
- `src/styles`: tokens, typography, and shared utilities
- `docs`: architecture and delivery documentation

Phase-specific directories now include `canvas`, `motion`, `hooks`,
`lib/motion`, and `store`. GLB utilities, case-study components, and contact
validation remain deferred to their assigned phases.

## Content contracts

Projects use a typed `Project` model containing identity, status, accent, descriptions, features, technologies, and visual motif. No component owns project facts. Future case-study pages and 3D scene modes will consume the same model.

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

## Failure behavior

- Without JavaScript: the complete semantic portfolio remains visible.
- Without WebGL: the static Cognitive Engine fallback remains.
- Reduced motion: no Lenis or scrubbed sequences; the scene holds a stable pose.
- Missing contact credentials: the future route logs a safe development message and returns a controlled response.

## SEO

Phase 1 supplies canonical metadata, Open Graph and Twitter metadata, sitemap, robots, and Person JSON-LD. Project-specific metadata arrives with the case-study routes.
