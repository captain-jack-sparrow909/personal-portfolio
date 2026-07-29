# Jabir Khan — Portfolio

A cinematic, systems-led portfolio for Jabir Khan: AI/ML engineer and
full-stack web and mobile developer.

The project is being delivered in phases. Phase 1 established the polished,
server-rendered foundation. Phase 2 adds the shared GSAP and Lenis motion
system, masked text reveals, layered parallax, responsive navigation
transitions, and reduced-motion behavior. The persistent WebGL scene,
introduced in Phase 3, adds a procedural Cognitive Engine with adaptive
quality, lighting, particles, and failure-safe static fallbacks. Case-study
routes and production contact integrations remain deliberately scheduled for
later phases in [`project.md`](./project.md).

## Stack

- Next.js App Router
- React and strict TypeScript
- Tailwind CSS and CSS Modules
- `next/font` with Manrope, Instrument Serif, and IBM Plex Mono
- GSAP, ScrollTrigger, and Lenis
- Three.js, React Three Fiber, Drei, and controlled postprocessing
- Zustand for discrete scene state
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
```

## Configuration

Set `NEXT_PUBLIC_SITE_URL` to the verified production origin before
deployment. Local metadata uses `http://localhost:3000` when it is absent.

Planning and architecture decisions live in [`docs`](./docs).
