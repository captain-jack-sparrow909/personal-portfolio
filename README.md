# Jabir Khan — Portfolio

A cinematic, systems-led portfolio for Jabir Khan: AI/ML engineer and
full-stack web and mobile developer.

The project is being delivered in phases. Phase 1 established the polished,
server-rendered foundation. Phase 2 adds the shared GSAP and Lenis motion
system, masked text reveals, layered parallax, responsive navigation
transitions, and reduced-motion behavior. The persistent WebGL scene,
introduced in Phase 3, adds a procedural Cognitive Engine with adaptive
quality, lighting, particles, and failure-safe static fallbacks. Case-study
transition shells, viewport-scale project chapters, scroll-linked project
motifs, and progress UI arrive in Phase 4. Full case-study narratives and
shared architecture, conceptual interface frames, project metadata, and
next-project navigation arrive in Phase 5. Final model support and production
asset generation, animation clips, runtime contract validation, shader
refinement, and procedural fallback parity arrive in Phase 6. Phase 7 adds the
accessible project-enquiry form, server validation and spam controls, Resend
delivery adapter, verified contact channels, project structured data, and
opt-in analytics. Phase 8 completes the planned build with deferred motion
loading, lightweight client validation, Meshopt model compression, enforced
bundle budgets, and automated Chromium, Firefox, WebKit, mobile,
reduced-motion, keyboard, and WebGL-fallback coverage.

The post-launch evidence release promotes RontgenAI to a public flagship,
introduces distinct case-study narratives and Engineering Evidence chapters,
adds a professional timeline and Build Log, ships the interactive `/lab`
route, adds the global System Navigator, strengthens contact conversion, and
enables Vercel Speed Insights. A subsequent product-evidence pass adds 22
curated real interface captures across the four case studies, responsive image
delivery, and an accessible keyboard-navigable lightbox.

## Stack

- Next.js App Router
- React and strict TypeScript
- Tailwind CSS and CSS Modules
- `next/font` with Manrope, Instrument Serif, and IBM Plex Mono
- GSAP, ScrollTrigger, and Lenis
- Three.js, React Three Fiber, Drei, and controlled postprocessing
- Zustand for discrete scene state
- Zod for authoritative server contact validation
- Vercel Speed Insights for real-user Core Web Vitals
- Vitest and Playwright for unit and cross-browser interaction coverage
- pnpm

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Validation

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm audit:model
pnpm audit:bundles
pnpm test:unit
pnpm test:e2e
```

`pnpm audit:bundles` reads the production output, so run `pnpm build` first.
Use `pnpm generate:model` to regenerate and Meshopt-compress the Cognitive
Engine before auditing its runtime contract.

Original product captures stay in the ignored local `screenshots/` directory.
Run `pnpm assets:project-screenshots` to regenerate the selected, consistently
named WebP files in `public/images/projects`.

## Configuration

Copy `.env.example` to `.env.local` and fill only the services you intend to
use.

- `NEXT_PUBLIC_SITE_URL` sets canonical, sitemap and structured-data URLs.
- `RESEND_API_KEY` and `CONTACT_EMAIL_FROM` activate server-side contact
  delivery. The sender must use a domain verified in Resend.
- `CONTACT_EMAIL_TO` defaults to `khanjabir909@gmail.com`.
- `CONTACT_RATE_LIMIT_MAX` and `CONTACT_RATE_LIMIT_WINDOW_MS` tune the basic
  in-memory limiter.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` enables Plausible analytics. When it is blank,
  no analytics script is rendered.

In development, missing email credentials produce a safe server message and a
successful simulated delivery. In production, the endpoint returns a clear
configuration response and directs visitors to the published email link rather
than claiming delivery.

Planning and architecture decisions live in [`docs`](./docs). The feedback
implementation and remaining authentic-media requirements are tracked in
[`docs/feedback-release.md`](./docs/feedback-release.md).
