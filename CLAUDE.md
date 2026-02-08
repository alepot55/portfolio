# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build (static export to `out/`)
- `npm run lint` — Run ESLint
- `npm run start` — Serve production build

No test framework is configured.

## Tech Stack

- **Next.js 14** (App Router, static export for GitHub Pages)
- **React 18** with TypeScript 5
- **Tailwind CSS** with shadcn/ui components (Radix UI primitives)
- **framer-motion** for animations (fade-in, stagger effects)
- **recharts** for data visualization (bar charts on project detail pages)
- **react-markdown** with remark-gfm, remark-breaks, rehype-raw for content rendering
- **Geist** font (loaded locally with multiple weights)
- Custom `ThemeProvider` (context + localStorage) for dark/light mode — not `next-themes`

## Architecture

This is a personal portfolio site deployed as a fully static export (`output: "export"` in next.config.mjs). Key deployment config:
- `basePath` and `assetPrefix` are set to `/alepot55` **only in production** (empty in dev)
- `trailingSlash: true` — all URLs end with `/`
- `images.unoptimized: true` — required for static export

### Content Model

Data lives in two layers:
1. **Structured data** in `/data/*.ts` — TypeScript arrays/objects defining projects, experiences, education, achievements, and skills
2. **Optional markdown** in `/content/[type]/[id].md` — Rich descriptions that augment the structured data

The `hasContentFile()` utility (in `lib/content-utils.ts`) checks at build time whether a markdown file exists for a given item. Components like `ProjectCard` conditionally render links to detail pages only when markdown content is available.

**Important naming quirk:** The content directory for experiences is `content/experiences/` (plural), while the route is `app/experience/[id]/` (singular). Same pattern: `data/experiences.ts` uses plural.

### Project Data Model

Projects (`data/projects.ts`) have a rich interface with optional fields that enable different detail page sections:
- `category`: `"ai-ml" | "systems" | "web" | "research"` — drives filtering and badge colors
- `metrics?: ProjectMetric[]` — renders metric cards on detail page
- `features?: ProjectFeature[]` — renders feature grid on detail page
- `chartData?: ChartDataPoint[]` — renders bar chart visualization on detail page
- `liveUrl?: string` — adds live demo link

### Shared Types and Constants

`lib/constants.ts` exports:
- `CATEGORY_COLORS`, `CATEGORY_LABELS`, `CATEGORY_LABELS_FULL` — styling/labels for project categories
- `SKILL_CATEGORY_COLORS` — styling for skill chart bars
- `Experience`, `Education`, `Achievement` interfaces — shared type definitions

### Routing & Pages

- `app/page.tsx` — Main portfolio page with all sections (grid layouts)
- `app/projects/[id]/page.tsx` — Project detail pages (uses `ProjectDetailPage` component with hero, metrics, features, chart, markdown)
- `app/experience/[id]/page.tsx` — Experience detail pages
- `app/education/[id]/page.tsx` — Education detail pages

All dynamic routes use `generateStaticParams()` for static generation.

### Component Patterns

- **Server Components** for pages and layouts; **Client Components** (marked `"use client"`) for interactive elements (theme-toggle, MarkdownRenderer, ProjectCard, PortfolioPage)
- `MarkdownRenderer` handles custom rendering: code copy buttons, styled tables/blockquotes, responsive headings, external link handling
- `MarkdownPage` is the shared wrapper for experience/education detail pages (header, back button, GitHub link)
- `ProjectDetailPage` is the richer wrapper for project detail pages (hero section, metrics, features grid, chart, markdown)
- `MotionWrapper` exports `FadeIn`, `StaggerContainer`, `StaggerItem` for framer-motion animations
- shadcn/ui components live in `components/ui/` — use `cn()` (clsx + tailwind-merge) for class composition

### Theming

Class-based dark mode via CSS variables (HSL values) defined in `app/globals.css`. Custom `ThemeProvider` (in `components/theme-provider.tsx`) uses React context + localStorage (`"theme"` key) and applies a class to `<html>`. Wraps the app in `app/layout.tsx`.

## Adding Content

- **New project**: Add entry to `data/projects.ts`, optionally create `content/projects/[id].md`. Use `featured: true` to show in the featured section.
- **New experience/education/achievement**: Same pattern — update the corresponding `/data` file, optionally add markdown in `/content`
- Detail pages only become navigable when a matching markdown file exists in `/content`
