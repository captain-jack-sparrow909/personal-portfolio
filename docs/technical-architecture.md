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

Future directories are added only in their implementation phase: `canvas`, `motion`, `hooks`, `lib/motion`, `lib/three`, `store`, and contact validation.

## Content contracts

Projects use a typed `Project` model containing identity, status, accent, descriptions, features, technologies, and visual motif. No component owns project facts. Future case-study pages and 3D scene modes will consume the same model.

## Styling

Tailwind CSS supplies layout primitives and utilities. CSS Modules own section-specific art direction and complex responsive styling. CSS custom properties define the palette, spacing, type, and grid. `clsx` and `tailwind-merge` provide deterministic composition.

## Motion contract

Phase 1 includes no JavaScript animation. DOM structure exposes stable hooks and section IDs for Phase 2. Motion must enhance existing layouts, not become responsible for their legibility.

## WebGL contract

Phase 3 adds one dynamically imported fixed Canvas. The procedural and GLB implementations will share the `CognitiveEngine` conceptual API. Continuous values remain in refs/useFrame; Zustand will store only discrete scene state.

## Failure behavior

- Without JavaScript: the complete semantic portfolio remains visible.
- Without WebGL: the static Cognitive Engine fallback remains.
- Reduced motion: no Lenis or scrubbed sequences; future scene remains static.
- Missing contact credentials: the future route logs a safe development message and returns a controlled response.

## SEO

Phase 1 supplies canonical metadata, Open Graph and Twitter metadata, sitemap, robots, and Person JSON-LD. Project-specific metadata arrives with the case-study routes.
