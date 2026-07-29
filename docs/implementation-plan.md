# Implementation plan

## Delivery phases

### Phase 1 — Foundation

Strict TypeScript, pnpm, Tailwind, fonts, design tokens, typed content, semantic static sections, responsive editorial grid, metadata, sitemap, robots, and a polished static Cognitive Engine fallback. **Complete.**

### Phase 2 — Motion foundation

MotionProvider, Lenis/ScrollTrigger integration, reveal primitives, navigation transitions, layered parallax, mobile menu, and reduced-motion behavior. **Complete.**

### Phase 3 — Procedural WebGL

One persistent dynamically imported Canvas, procedural Cognitive Engine, camera/lighting rigs, particles, quality tiers, failure handling, and section state.
**Complete.**

### Phase 4 — Project storytelling

Viewport-scale project chapters, project scene modes, scoped scroll timelines, progress indicators, and transition scaffolding.
**Complete.**

### Phase 5 — Case studies

Dynamic project routes, shared case-study components, architecture diagrams, concept-frame treatment, metadata, and next-project navigation.
**Complete.**

### Phase 6 — Final asset support

GLB loader, named groups and animation clips, procedural fallback parity, shader refinement, and asset compression.
**Complete.**

### Phase 7 — Contact and production

Accessible form, Zod validation, honeypot, rate-limit abstraction, provider adapter, social links, structured project data, and configuration documentation.
**Complete.**

### Phase 8 — Optimization and QA

Bundle analysis, asset compression, cross-browser checks, Playwright coverage, mobile/reduced-motion audits, and memory/cleanup verification.

## Proposed dependency list

### Phase 1 through Phase 7 installed

- `next`, `react`, `react-dom`
- `tailwindcss`, `@tailwindcss/postcss`
- `clsx`, `tailwind-merge`
- `typescript`, `@types/node`, `@types/react`, `@types/react-dom`
- `eslint`, `eslint-config-next`
- `prettier`, `prettier-plugin-tailwindcss`
- Motion: `gsap`, `lenis`
- 3D: `three`, `@react-three/fiber`, `@react-three/drei`,
  `@react-three/postprocessing`, `postprocessing`
- State: `zustand`
- Types: `@types/three`
- Validation: `zod`

### Later phases

- Testing: `vitest`, `@playwright/test`

Dependencies are introduced only when their phase begins.

Phase 4 reused the Phase 2 and Phase 3 runtime and introduced no additional
packages.

Phase 5 also introduced no runtime dependencies. Architecture diagrams and
interface concept frames use semantic HTML and CSS.

Phase 6 reuses Three.js, Drei, and the existing deferred scene chunk. The model
generator and contract audit use Three.js and Node.js without adding another
package.

Phase 7 adds only Zod. Email delivery uses the platform `fetch` API behind a
small provider adapter, so provider credentials remain server-only and no email
SDK enters the client bundle.

## Phase 7 file plan

- `.env.example`
- `src/app/api/contact/route.ts`
- `src/components/analytics/Analytics.tsx`
- `src/components/contact/ContactForm.tsx`
- `src/components/contact/ContactForm.module.css`
- `src/components/sections/ContactSection.tsx`
- `src/content/site.ts`
- `src/lib/contact/email.ts`
- `src/lib/contact/rate-limit.ts`
- `src/lib/seo/structuredData.ts`
- `src/lib/validation/contact.ts`

## Phase 6 file plan

- `public/models/cognitive-engine.glb`
- `public/models/README.md`
- `scripts/generate-cognitive-engine.mjs`
- `scripts/audit-cognitive-engine.mjs`
- `src/components/canvas/ModelCognitiveEngine.tsx`
- `src/components/canvas/CognitiveEngine.tsx`
- `src/components/canvas/ProceduralCognitiveEngine.tsx`
- `src/lib/three/model.ts`
- `src/lib/three/materials.ts`

## Phase 5 file plan

- `src/components/project/ProjectCaseStudy.tsx`
- `src/components/project/ProjectHero.tsx`
- `src/components/project/ProjectOverview.tsx`
- `src/components/project/ProjectModules.tsx`
- `src/components/project/ProjectArchitecture.tsx`
- `src/components/project/ProjectConceptFrames.tsx`
- `src/components/project/ProjectDecisions.tsx`
- `src/components/project/ProjectStatus.tsx`
- `src/components/project/ProjectNavigation.tsx`
- `src/components/project/ProjectSectionHeader.tsx`
- `src/components/project/ProjectCaseStudy.module.css`
- `src/app/work/[slug]/page.tsx`
- `src/app/work/[slug]/loading.tsx`
- `public/og.png`

## Phase 4 file plan

- `src/components/sections/ProjectChapter.tsx`
- `src/components/canvas/ProjectVisualSystem.tsx`
- `src/components/layout/PageTransition.tsx`
- `src/components/layout/PageTransition.module.css`
- `src/hooks/useSectionProgress.ts`
- `src/lib/motion/project-timelines.ts`
- `src/app/work/[slug]/page.tsx`
- `src/app/work/[slug]/page.module.css`

## Phase 3 file plan

- `src/components/canvas/SceneExperience.tsx`
- `src/components/canvas/SceneCanvas.tsx`
- `src/components/canvas/CognitiveEngine.tsx`
- `src/components/canvas/ProceduralCognitiveEngine.tsx`
- `src/components/canvas/CameraRig.tsx`
- `src/components/canvas/LightingRig.tsx`
- `src/components/canvas/ParticleField.tsx`
- `src/components/canvas/PerformanceController.tsx`
- `src/components/canvas/PostProcessing.tsx`
- `src/hooks/useDeviceTier.ts`
- `src/hooks/useWebGLSupport.ts`
- `src/hooks/usePageVisibility.ts`
- `src/hooks/usePointerPosition.ts`
- `src/store/scene-store.ts`

## Phase 2 file plan

- `src/components/motion/MotionProvider.tsx`
- `src/hooks/useReducedMotion.ts`
- `src/lib/motion/gsap.ts`
- `src/lib/motion/lenis.ts`
- `src/lib/motion/timelines.ts`
- `src/components/layout/SiteHeader.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/Sections.module.css`
- `src/app/globals.css`

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
