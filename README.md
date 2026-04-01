# AURUM — AI Hair System Landing Page

AURUM is a cinematic landing page concept for an AI-driven automated hair system. The experience is designed as a premium black-and-gold narrative site that walks visitors through scan-inspired head-shape visuals, curated hairstyle recommendations, and a future-salon brand story.

## Current Scope

This repository focuses on the **frontend brand and product experience**. It presents a polished landing page and visual concept for AURUM rather than a backend-powered production system.

The UI is primarily written in **Traditional Chinese (`zh-TW`)**.

## Overview

This project is a frontend-first brand experience built with Next.js App Router. The homepage is structured as a five-part immersive journey:

1. **Awaken** — introduces the AURUM system with sensor-style visuals
2. **Scan** — presents scan-inspired head mapping visuals and precision analysis cues
3. **Evolve** — showcases curated hairstyle recommendation visuals with local assets
4. **Arrive** — frames the premium automated salon experience
5. **Final** — closes on the AURUM brand and product vision

## Highlights

- Full-screen scroll-snap storytelling homepage
- Black-and-gold luxury visual system with custom motion, glow, and HUD-inspired details
- Curated hairstyle recommendation section powered by local image assets
- Canvas-based ambient visuals across the landing-page narrative
- Component-driven homepage structure with dynamically loaded sections

## Tech Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
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
  SectionFinal.tsx
public/
  hair-styles/
```

## Hairstyle Assets

The recommendation section uses local assets stored in:

```text
public/hair-styles/
```

Current included styles:

- 液態短鮑伯
- 鎖骨長鮑伯
- 長層次蝴蝶剪
- 雕塑感自然捲
- 精品吹整中長髮

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
npm run lint
```

Then open:

```text
http://localhost:3000
```

## Build

To create a production build:

```bash
npm run build
```

To run the production server locally:

```bash
npm run start
```

## GitHub Pages Deployment

This project is configured for **GitHub Pages static export** on the custom domain:

```text
https://hair.yx209.net/
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

To finish setup in GitHub:

1. Open repository **Settings** → **Pages**
2. Set **Source** to **GitHub Actions**
3. In your DNS provider, point `hair.yx209.net` to GitHub Pages

## Repository Description

Recommended GitHub description:

> Cinematic Next.js landing page concept for AURUM with scan-inspired visuals, curated hairstyle recommendations, and premium salon branding.
