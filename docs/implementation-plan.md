# Implementation plan

## Delivery phases

### Phase 1 — Foundation

Strict TypeScript, pnpm, Tailwind, fonts, design tokens, typed content, semantic static sections, responsive editorial grid, metadata, sitemap, robots, and a polished static Cognitive Engine fallback.

### Phase 2 — Motion foundation

MotionProvider, Lenis/ScrollTrigger integration, reveal primitives, navigation transitions, layered parallax, mobile menu, and reduced-motion behavior.

### Phase 3 — Procedural WebGL

One persistent dynamically imported Canvas, procedural Cognitive Engine, camera/lighting rigs, particles, quality tiers, failure handling, and section state.

### Phase 4 — Project storytelling

Viewport-scale project chapters, project scene modes, scoped scroll timelines, progress indicators, and transition scaffolding.

### Phase 5 — Case studies

Dynamic project routes, shared case-study components, architecture diagrams, concept-frame treatment, metadata, and next-project navigation.

### Phase 6 — Final asset support

GLB loader, named groups and animation clips, procedural fallback parity, shader refinement, and asset compression.

### Phase 7 — Contact and production

Accessible form, Zod validation, honeypot, rate-limit abstraction, provider adapter, social links, structured project data, and configuration documentation.

### Phase 8 — Optimization and QA

Bundle analysis, asset compression, cross-browser checks, Playwright coverage, mobile/reduced-motion audits, and memory/cleanup verification.

## Proposed dependency list

### Phase 1 installed

- `next`, `react`, `react-dom`
- `tailwindcss`, `@tailwindcss/postcss`
- `clsx`, `tailwind-merge`
- `typescript`, `@types/node`, `@types/react`, `@types/react-dom`
- `eslint`, `eslint-config-next`
- `prettier`, `prettier-plugin-tailwindcss`

### Later phases

- Motion: `gsap`, `lenis`
- 3D: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- State: `zustand`
- Validation: `zod`
- Testing: `vitest`, `@playwright/test`

Dependencies are introduced only when their phase begins.

## Exact Phase 1 file plan

### Configuration

- `package.json`
- `pnpm-lock.yaml`
- `tsconfig.json`
- `next-env.d.ts`
- `next.config.mjs`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `.prettierrc.json`
- `.prettierignore`

### App routes and SEO

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/app/not-found.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`

### Content

- `src/content/site.ts`
- `src/content/navigation.ts`
- `src/content/projects.ts`
- `src/content/capabilities.ts`
- `src/content/process.ts`

### Components

- `src/components/layout/SiteHeader.tsx`
- `src/components/layout/SiteFooter.tsx`
- `src/components/fallback/StaticCognitiveEngine.tsx`
- `src/components/fallback/StaticCognitiveEngine.module.css`
- `src/components/sections/HomePage.module.css`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/ManifestoSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- `src/components/sections/CapabilitiesSection.tsx`
- `src/components/sections/ProcessSection.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/sections/ContactSection.tsx`
- `src/components/ui/SectionLabel.tsx`

### Shared styles

- `src/styles/tokens.css`
- `src/styles/typography.css`
- `src/styles/utilities.css`

## Phase 1 acceptance criteria

- Home page communicates the complete positioning and product story without animation.
- Desktop, tablet, and mobile compositions are intentional.
- Essential content is semantic and available without client JavaScript.
- No WebGL or motion runtime is included.
- No invented metrics or unavailable social URLs are published.
- Type check, lint, and production build pass.
- Browser verification shows no console errors or horizontal overflow.
