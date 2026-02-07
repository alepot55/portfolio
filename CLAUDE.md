# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build (static export)
- `npm run lint` — Run ESLint
- `npm run start` — Serve production build

No test framework is configured.

## Tech Stack

- **Next.js 14** (App Router, static export for GitHub Pages)
- **React 18** with TypeScript 5
- **Tailwind CSS** with shadcn/ui components (Radix UI primitives)
- **react-markdown** with remark-gfm, remark-breaks, rehype-raw for content rendering
- **next-themes** for dark/light mode

## Architecture

This is a personal portfolio site deployed as a fully static export (`output: "export"` in next.config.mjs). It runs under the `/alepot55` basePath in production.

### Content Model

Data lives in two layers:
1. **Structured data** in `/data/*.ts` — TypeScript arrays/objects defining projects, experiences, education, achievements, and skills
2. **Optional markdown** in `/content/[type]/[id].md` — Rich descriptions that augment the structured data

The `hasContentFile()` utility (in `lib/utils.ts`) checks at build time whether a markdown file exists for a given item. Components like `ProjectCard` conditionally render links to detail pages only when markdown content is available.

### Routing & Pages

- `app/page.tsx` — Main portfolio page with all sections (grid layouts)
- `app/projects/[id]/page.tsx` — Project detail pages
- `app/experience/[id]/page.tsx` — Experience detail pages
- `app/education/[id]/page.tsx` — Education detail pages

All dynamic routes use `generateStaticParams()` for static generation.

### Component Patterns

- **Server Components** for pages and layouts; **Client Components** (marked `"use client"`) for interactive elements (ThemeToggle, MarkdownRenderer, ProjectCard)
- `MarkdownRenderer` handles custom rendering: code copy buttons, styled tables/blockquotes, responsive headings, external link handling
- `MarkdownPage` is the shared wrapper for all detail pages (header, back button, GitHub link)
- shadcn/ui components live in `components/ui/` — use `cn()` (clsx + tailwind-merge) for class composition

### Theming

Class-based dark mode via CSS variables (HSL values) defined in `app/globals.css`. ThemeProvider (context + localStorage) wraps the app in `app/layout.tsx`.

## Adding Content

- **New project**: Add entry to `data/projects.ts`, optionally create `content/projects/[id].md`
- **New experience/education/achievement**: Same pattern — update the corresponding `/data` file, optionally add markdown in `/content`
- Detail pages only become navigable when a matching markdown file exists in `/content`
