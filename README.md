# AURUM — AI Hair System Landing Page

AURUM is a cinematic landing page concept for an AI-driven automated hair system. The experience is designed as a premium black-and-gold narrative site that walks visitors through scan-inspired head-shape visuals, curated hairstyle recommendations, a product showcase, and a booking flow.

## Current Scope

This repository focuses on the **frontend brand and product experience**. It presents a polished landing page and visual concept for AURUM rather than a backend-powered production system.

The UI is primarily written in **Traditional Chinese (`zh-TW`)**.

## Overview

This project is a frontend-first brand experience built with Next.js App Router. The homepage is structured as a nine-part immersive journey:

1. **Awaken** — introduces the AURUM system with sensor-style visuals
2. **Scan** — presents scan-inspired head mapping visuals and precision analysis cues
3. **Evolve** — showcases curated hairstyle recommendation visuals with local assets
4. **Arrive** — frames the premium automated salon experience
5. **Cases** — client story cards and social proof
6. **Product** — AI-illustrated product catalogue with pricing
7. **Contact** — location, hours, and step-by-step booking flow
8. **Purchase** — booking form (name, phone, product selection)
9. **Final** — closes on the AURUM brand and product vision

## Highlights

- Full-screen scroll-snap storytelling homepage
- Black-and-gold luxury visual system with custom motion, glow, and HUD-inspired details
- AI-generated product illustration cards (metallic gold linework on matte black)
- Canvas-based ambient visuals — IntersectionObserver ensures only the visible section runs its rAF loop
- Purchase booking form with validation and success state
- Component-driven homepage structure with dynamically loaded sections

## Tech Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **pnpm** package manager
- Custom canvas animation and `next/image` asset rendering

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  NavDots.tsx
  SectionAwaken.tsx
  SectionScan.tsx
  SectionEvolve.tsx
  SectionArrive.tsx
  SectionCases.tsx
  SectionProduct.tsx
  SectionContact.tsx
  SectionPurchase.tsx
  SectionFinal.tsx
public/
  hair-styles/
  products/
```

## Product Assets

AI-generated product illustrations are stored in:

```text
public/products/
```

Included styles:

- 液態短鮑伯 (LIQUID SHORT BOB) — NT$ 2,200
- 鎖骨長鮑伯 (CLAVI BOB) — NT$ 3,500
- 精品吹整中長髮 (PREMIUM BLOWOUT) — NT$ 2,800
- 長層次蝴蝶剪 (BUTTERFLY CUT) — NT$ 3,200
- 雕塑感自然捲 (SCULPTURED CURL) — NT$ 4,200

## Local Development

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
pnpm lint
```

Then open:

```text
http://localhost:3000
```

## Build

To create a production build:

```bash
pnpm build
```

To run the production server locally:

```bash
pnpm start
```

## GitHub Pages Deployment

This project is configured for **GitHub Pages static export** on the custom domain:

```text
https://aurum.yx209.net
```

Deployment is handled by GitHub Actions through:

```text
.github/workflows/deploy-pages.yml
```

GitHub Pages-specific configuration includes:

- `output: "export"` in `next.config.ts`
- `images.unoptimized: true` for `next/image`
- `public/CNAME` for the custom domain
- `public/.nojekyll` so `_next` assets are served correctly
- optional `PAGES_ENABLEMENT_TOKEN` secret for first-time Pages enablement via `actions/configure-pages`

To finish setup in GitHub:

1. Open repository **Settings** → **Pages**
2. Set **Source** to **GitHub Actions**
3. In your DNS provider, point `aurum.yx209.net` to GitHub Pages

If the first workflow run fails with `Get Pages site failed ... Not Found`, either:

- manually open **Settings** → **Pages** and set **Source** to **GitHub Actions**, or
- add a repository secret named `PAGES_ENABLEMENT_TOKEN` containing a Personal Access Token with repository admin/pages write capability so `actions/configure-pages` can enable Pages automatically

## Repository Description

Recommended GitHub description:

> Cinematic Next.js landing page concept for AURUM with AI-illustrated product cards, scan-inspired visuals, and premium salon branding.
