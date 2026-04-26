# Messi Landing Page

A tribute landing page for Lionel Messi, built with Next.js 15, React 19, Tailwind v4, and Framer Motion.

## Tech stack

- Next.js 15 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion, Swiper, react-three-fiber + drei, lucide-react

## Prerequisites

- Node.js 18.18+ (Node 20+ recommended)
- Yarn (Classic 1.x or Berry)

## Getting started

```bash
# 1. Install dependencies
yarn install

# 2. Start the dev server (Turbopack)
yarn dev

# 3. Open the app
# http://localhost:3000
```

## Scripts

| Command       | Description                           |
| ------------- | ------------------------------------- |
| `yarn dev`    | Start dev server on port 3000         |
| `yarn build`  | Production build                      |
| `yarn start`  | Run the built app                     |
| `yarn lint`   | Lint with ESLint (eslint-config-next) |

## Project structure

```text
src/
  app/
    layout.tsx        # Root layout, fonts, metadata
    page.tsx          # Main landing page (edit here)
    globals.css       # Tailwind + custom mystical theme utilities
  components/
    ui/               # Carousels, hover expand, dialog, button, etc.
    skiper-ui/        # Skiper UI components (cards, marquee, AI input, ...)
  lib/
    utils.ts          # cn() helper (clsx + tailwind-merge)
public/
  images/             # Page imagery
```

## Notes

- The page is a single client component at [`src/app/page.tsx`](src/app/page.tsx); edit there to change content.
- Custom theme classes (`glass-mystical`, `text-gradient-mystical`, `animate-ghostly-pulse`, …) live in [`src/app/globals.css`](src/app/globals.css).
- Images served from `/public/images` are referenced by absolute paths (e.g. `/images/messi-football.jpeg`).

## Deploy

Optimised for [Vercel](https://vercel.com/new). Any Node host that supports Next.js 15 works (`yarn build && yarn start`).
