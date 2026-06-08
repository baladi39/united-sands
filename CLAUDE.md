# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses **pnpm**.

```bash
pnpm dev            # Next.js dev server (http://localhost:3000)
pnpm build          # Production build
pnpm start          # Serve the production build
pnpm lint           # ESLint (eslint-config-next core-web-vitals + typescript)
pnpm zip:hostinger  # Bundle the repo into a deployable zip for Hostinger
```

There is no test suite. `@/*` resolves to `./src/*` (see `tsconfig.json`).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 (via `@tailwindcss/postcss`, no `tailwind.config`) · Framer Motion 12 · Lenis (smooth scroll) · Resend (email). Almost every component is a Client Component (`"use client"`) because the site is animation-driven.

## The three landing experiences

The repo contains three parallel front-doors. Know which one you're touching before editing — they share fonts/theme but not components.

- **`/` — production homepage** (`src/app/page.tsx`, `src/components/home/*`). The build currently in progress: splash → nav → hero with a scroll-driven arch zoom. This is what ships.
- **`/demo` — animation prototype** (`src/app/demo/*`, `src/components/demo/*`). A fuller sandbox with all the planned sections (stats, sectors, CTA morph, portfolio, contact finale). Has its own layout + `LenisProvider`. Used to prototype effects before promoting them into `home/`.
- **`/coming-soon` — legacy "under renovation" page** (`src/app/coming-soon/page.tsx`). Email-capture splash with `ElectricBackground` and `EmailForm`.

`docs/United_Sands_Requirements.md` is the canonical client spec (13 homepage parts + inner pages, animation references, brand notes). Consult it when building out new sections.

## Animation architecture

- **Lenis smooth scroll** is set up by a `LenisProvider` (one per experience: `home/` and `demo/`). It attaches the Lenis instance to `window.lenis` so unrelated components can `stop()`/`start()` scrolling. `page.tsx` uses this to freeze the page while the splash plays, then releases on `onComplete`.
- **Splash pattern**: a `Splash` component runs internal phases (`counting → reveal → exit`) and fires an `onComplete` callback. The parent owns the resulting state (`splashDone`) and gates nav visibility + scroll lock on it.
- **Scroll scrubbing** (`home/hero.tsx`): the hero is a tall section (`h-[220vh]`) with a `sticky` inner viewport. It reads the global `useScroll().scrollYProgress`. Transform-bound values (`scale`, `y`) scrub reliably via `useTransform`; **opacity does not** — those fades are driven imperatively through refs inside `useMotionValueEvent`. Follow this split when adding scroll effects.

## Theme & fonts

- Brand palette lives as CSS custom properties in `src/app/globals.css`: `--background` (`#0d0a1a` dark navy), `--purple-accent`, `--purple-light`, `--gold`, `--gold-light`. Tailwind v4 `@theme inline` bridges them. The site is dark-themed with purple/violet + gold accents.
- Fonts are **local** (`next/font/local` in `src/app/layout.tsx`): Oswald (headings) and Roboto (body), exposed as `--font-oswald` / `--font-roboto`. Apply via the `font-oswald` / `font-roboto` utility classes or `style={{ fontFamily: "var(--font-oswald)" }}`.
- `ElectricBackground` respects opt-out hooks on elements: `data-electric-mute` and `data-electric-safezone`.

## Email signup (`/api/join`)

`POST /api/join` (Node.js runtime) handles mailing-list signups via **Resend**: sends a notification to `info@unitedsands.co` and a confirmation to the subscriber. A hidden `website` field is a honeypot — if filled, the request is silently accepted and dropped. Requires the `RESEND_API_KEY` env var. There is no database; the subscriber list is just the notification emails (free tier ≈ 50 signups/day). See `docs/email-notification-setup.md` for DNS/SPF/DKIM setup and scaling notes.

## Deployment

Configured for **server-rendered hosting, not static export** (`next.config.ts` sets `trailingSlash: true` and `images.unoptimized: true`) so the `/api/join` route keeps working. `pnpm zip:hostinger` (`scripts/package-hostinger.sh`) rsyncs the repo minus build artifacts into a zip; on the server run `pnpm install` then `pnpm build`. The repo is also Vercel-compatible.
