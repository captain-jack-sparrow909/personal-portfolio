# Jabir Khan — Portfolio

A cinematic, systems-led portfolio for Jabir Khan: AI/ML engineer and
full-stack web and mobile developer.

The project is being delivered in phases. Phase 1 contains the polished,
server-rendered static foundation. Motion, the persistent WebGL scene,
case-study routes, and production contact integrations are deliberately
scheduled for later phases in [`project.md`](./project.md).

## Stack

- Next.js App Router
- React and strict TypeScript
- Tailwind CSS and CSS Modules
- `next/font` with Manrope, Instrument Serif, and IBM Plex Mono
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
