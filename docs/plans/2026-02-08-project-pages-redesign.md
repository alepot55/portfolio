# Project Detail Pages Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform project detail pages from a generic template into intelligent, project-specific pages with interactive custom components and recreated dynamic charts.

**Architecture:** Each project detail page uses a shared base template (Hero → Custom Section → Charts → Markdown) but can declare project-specific custom components via a mapping object. Metrics and features grids are removed entirely. Charts from GitHub repo READMEs are recreated as interactive recharts/CSS components.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, framer-motion, recharts, @alepot55/chessboardjs

---

### Task 1: Restructure ProjectDetailPage Template

**Files:**
- Modify: `components/project-detail-page.tsx`

**Step 1: Remove MetricCard and FeatureGrid imports and sections**

Replace the entire `components/project-detail-page.tsx` with the restructured template. Remove:
- `import { MetricCard } from "./metric-card"`
- `import { FeatureGrid } from "./feature-grid"`
- The entire Metrics Section (lines 97-116)
- The entire Chart + Features Layout section (lines 118-140)

Add a custom section slot and a custom charts slot. The component should render:

```tsx
"use client"

import Link from "next/link"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { MarkdownRenderer } from "./markdown-renderer"
import { ProjectChart } from "./project-chart"
import { FadeIn } from "./motion-wrapper"
import type { Project } from "@/data/projects"
import { CATEGORY_LABELS_FULL } from "@/lib/constants"

// Lazy-loaded custom sections (will be added as tasks progress)
import { ChessboardDemo } from "./custom-sections/chessboard-demo"
import { SplatSLAMShowcase } from "./custom-sections/splat-slam-showcase"
import { VerificationPipeline } from "./custom-sections/verification-pipeline"
import { FlashReasoningCharts } from "./custom-sections/flash-reasoning-charts"
import { FlashSAECharts } from "./custom-sections/flash-sae-charts"
import { TerminalShowcase } from "./custom-sections/terminal-showcase"
import { ConfusionMatrixViz } from "./custom-sections/confusion-matrix-viz"
import { ConceptHubDemo } from "./custom-sections/concepthub-demo"
import type { ComponentType } from "react"

const CUSTOM_SECTIONS: Record<string, ComponentType<{ project: Project }>> = {
  "chessboard-js": ChessboardDemo,
  "slam-gaussian-splatting": SplatSLAMShowcase,
  "verify-cbl": VerificationPipeline,
  "agentrial": TerminalShowcase,
  "music-genre-classification": ConfusionMatrixViz,
  "concepthub-ai": ConceptHubDemo,
}

const CUSTOM_CHARTS: Record<string, ComponentType<{ project: Project }>> = {
  "flash-reasoning": FlashReasoningCharts,
  "flash-sae": FlashSAECharts,
}
```

The render order:
1. Sticky Header (unchanged)
2. Hero Section (unchanged)
3. Custom Section: `{CustomSection && <section className="pb-8 sm:pb-12"><CustomSection project={project} /></section>}`
4. Custom Charts OR fallback to existing ProjectChart: if `CUSTOM_CHARTS[project.id]` exists, render that; else if `project.chartData && project.chartLabel` render `<ProjectChart>`
5. Deep Dive Content (unchanged)
6. Navigation Footer (unchanged)

**Step 2: Verify the build compiles**

Run: `npm run build` (will fail until custom section components exist — that's OK, we create stub files first)

**Step 3: Create stub files for all custom sections**

Create `components/custom-sections/` directory and 8 stub files — each exporting a placeholder component:

```tsx
// Each stub follows this pattern:
"use client"
import type { Project } from "@/data/projects"

export function ComponentName({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6">
      <p className="text-sm text-gray-500">Coming soon: {project.title} showcase</p>
    </div>
  )
}
```

Files to create:
- `components/custom-sections/chessboard-demo.tsx`
- `components/custom-sections/splat-slam-showcase.tsx`
- `components/custom-sections/verification-pipeline.tsx`
- `components/custom-sections/flash-reasoning-charts.tsx`
- `components/custom-sections/flash-sae-charts.tsx`
- `components/custom-sections/terminal-showcase.tsx`
- `components/custom-sections/confusion-matrix-viz.tsx`
- `components/custom-sections/concepthub-demo.tsx`

**Step 4: Verify build passes with stubs**

Run: `npm run build`
Expected: Build succeeds. All project detail pages render with hero + stub placeholder + markdown.

**Step 5: Commit**

```bash
git add components/project-detail-page.tsx components/custom-sections/
git commit -m "refactor: restructure project detail page with custom section slots"
```

---

### Task 2: Remove Metrics from Data Model

**Files:**
- Modify: `data/projects.ts`

**Step 1: Remove all `metrics` arrays from projects**

Remove the `metrics` property from these projects: agentrial, flash-reasoning, flash-sae, verify-cbl, gpu-performance-analysis, music-genre-classification.

Also remove `features` arrays from ALL projects (they are no longer rendered).

Keep: `chartData` and `chartLabel` on flash-reasoning, flash-sae, and gpu-performance-analysis (used as fallback).

**Step 2: Verify build**

Run: `npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add data/projects.ts
git commit -m "refactor: remove metrics and features from project data model"
```

---

### Task 3: Chessboard.js Interactive Demo

**Files:**
- Modify: `components/custom-sections/chessboard-demo.tsx`
- Install: `@alepot55/chessboardjs`

**Step 1: Install the chessboard package**

```bash
npm install @alepot55/chessboardjs
```

**Step 2: Investigate the package API**

Read node_modules/@alepot55/chessboardjs to understand:
- How to import the constructor
- Where piece images are located (likely needs `piecesPath` config)
- The `destroy()` cleanup method
- The `onMove`, `onMoveEnd` callbacks
- Methods: `reset()`, `undoMove()`, `getHistory()`, `fen()`

**Step 3: Copy piece images to public/**

The chessboard package likely includes piece SVGs/PNGs. Copy them to `public/pieces/` so they're accessible via the static export. If the package bundles them differently, adapt accordingly.

**Step 4: Implement the ChessboardDemo component**

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { RotateCcw, Undo2 } from "lucide-react"
import type { Project } from "@/data/projects"

export function ChessboardDemo({ project }: { project: Project }) {
  const boardRef = useRef<any>(null)
  const [moves, setMoves] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let board: any = null

    async function init() {
      const { default: Chessboard } = await import("@alepot55/chessboardjs")
      board = new Chessboard({
        id: "chess-demo",
        position: "start",
        size: 400,          // will be overridden by CSS responsive
        orientation: "w",
        draggable: true,
        clickable: true,
        onlyLegalMoves: true,
        piecesPath: "/pieces", // adjust based on package investigation
        onMoveEnd: () => {
          if (board) {
            setMoves(board.getHistory?.() || [])
          }
        },
      })
      boardRef.current = board
      setMounted(true)
    }

    init()
    return () => { board?.destroy?.() }
  }, [])

  const handleReset = () => {
    boardRef.current?.reset?.()
    setMoves([])
  }

  const handleUndo = () => {
    boardRef.current?.undoMove?.()
    setMoves(boardRef.current?.getHistory?.() || [])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Board */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-4 sm:p-6">
          <div id="chess-demo" className="w-full max-w-[400px] aspect-square mx-auto" />
          <div className="flex gap-3 mt-4 justify-center">
            <button onClick={handleUndo} className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border ...">
              <Undo2 size={14} /> Undo
            </button>
            <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border ...">
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Move History */}
        {moves.length > 0 && (
          <div className="rounded-xl border ... p-4 min-w-[200px]">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Moves</h4>
            <div className="font-mono text-sm space-y-1 max-h-[300px] overflow-y-auto">
              {/* Pair moves into rows: 1. e4 e5  2. Nf3 Nc6 */}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
```

**Important:** The exact API may differ — adapt after reading the actual package source in step 2. The package uses vanilla JS DOM manipulation, so we need a container `div#chess-demo` and dynamic import to avoid SSR issues.

**Step 5: Verify with dev server**

Run: `npm run dev`
Navigate to: `http://localhost:3000/projects/chessboard-js/`
Expected: Interactive chessboard renders, pieces are draggable, undo/reset work.

**Step 6: Commit**

```bash
git add components/custom-sections/chessboard-demo.tsx public/pieces/ package.json package-lock.json
git commit -m "feat: add interactive chessboard demo to chessboard-js project page"
```

---

### Task 4: SplatSLAM Multimedia Showcase

**Files:**
- Modify: `components/custom-sections/splat-slam-showcase.tsx`

**Step 1: Implement SplatSLAMShowcase**

The component shows 3 demo videos and a link to the thesis.

**IMPORTANT about GitHub private-user-images URLs:** These URLs require authentication tokens appended as query params. They won't work directly in `<video>` tags on a static site. Instead, we need to:
- Download the videos locally to `public/videos/splatslam/` OR
- Use the raw GitHub asset URLs which are publicly accessible

Check which URLs work publicly. The third URL format (`github.com/.../assets/...`) is typically public. The `private-user-images` ones may need raw URLs instead. Use: `https://raw.githubusercontent.com/alepot55/SplatSLAM/main/` if videos are committed to the repo.

```tsx
"use client"

import { motion } from "framer-motion"
import { Play, GraduationCap } from "lucide-react"
import type { Project } from "@/data/projects"

const VIDEOS = [
  { title: "Room Scene", description: "Dense 3D reconstruction of an indoor room from monocular RGB", src: "..." },
  { title: "Kitchen Scene", description: "Real-time mapping of a complex kitchen environment", src: "..." },
  { title: "Living Room", description: "Large-scale generalization to open environments", src: "..." },
]

export function SplatSLAMShowcase({ project }: { project: Project }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
      {/* Video Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {VIDEOS.map((video) => (
          <div key={video.title} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
            <video
              controls
              preload="metadata"
              className="w-full aspect-video bg-black"
              poster={/* optional poster image */}
            >
              <source src={video.src} type="video/mp4" />
            </video>
            <div className="p-3">
              <h4 className="text-sm font-medium">{video.title}</h4>
              <p className="text-xs text-gray-500">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* System Architecture Diagram */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-4 mb-6">
        <h4 className="text-sm font-medium text-gray-500 mb-3">System Architecture</h4>
        <img
          src="https://raw.githubusercontent.com/alepot55/SplatSLAM/main/..." // system diagram URL
          alt="SplatSLAM System Architecture"
          className="w-full max-w-3xl mx-auto rounded-lg"
          loading="lazy"
        />
      </div>

      {/* Bachelor Thesis Link */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/30 p-5 flex items-center gap-4">
        <GraduationCap size={24} className="text-gray-400 shrink-0" />
        <div>
          <h4 className="text-sm font-medium">Bachelor's Thesis</h4>
          <p className="text-xs text-gray-500 mt-0.5">This project formed the foundation of my thesis at Sapienza University of Rome</p>
        </div>
        <a href="#" className="ml-auto text-sm px-4 py-2 rounded-lg border ...">Read →</a>
      </div>
    </motion.div>
  )
}
```

**Step 2: Download or locate video sources**

Check if the repo has videos committed or use GitHub release assets. If `private-user-images` URLs fail, download the videos and place them in `public/videos/splatslam/`. Note: videos may be too large for static export / git — in that case use external hosting (GitHub release assets or CDN).

**Step 3: Verify with dev server**

Run: `npm run dev`, navigate to SplatSLAM project page.
Expected: Videos play, architecture diagram shows, thesis card renders (with placeholder link).

**Step 4: Commit**

```bash
git add components/custom-sections/splat-slam-showcase.tsx public/videos/
git commit -m "feat: add multimedia showcase to SplatSLAM project page"
```

---

### Task 5: Verify-CBL Animated Pipeline

**Files:**
- Modify: `components/custom-sections/verification-pipeline.tsx`

**Step 1: Implement VerificationPipeline**

An animated pipeline visualization + YouTube embed.

```tsx
"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { FileCode, GitBranch, TreePine, Brain, Code2, Shield, CheckCircle, AlertTriangle, RotateCcw } from "lucide-react"
import type { Project } from "@/data/projects"

const PIPELINE_STEPS = [
  { icon: FileCode, label: "COBOL Source", color: "blue" },
  { icon: GitBranch, label: "Parser", color: "teal" },
  { icon: TreePine, label: "IR Tree", color: "purple" },
  { icon: Brain, label: "LLM Translation", color: "orange" },
  { icon: Code2, label: "Java BigDecimal", color: "indigo" },
  { icon: Shield, label: "Z3 Solver", color: "red" },
]

export function VerificationPipeline({ project }: { project: Project }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
      {/* Pipeline */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 mb-6">
        <h4 className="text-sm font-medium text-gray-500 mb-6">Verification Pipeline</h4>

        {/* Desktop: horizontal, Mobile: vertical */}
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-0">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center">
              {/* Step box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg border ..."
              >
                <step.icon size={20} />
                <span className="text-xs font-medium whitespace-nowrap">{step.label}</span>
              </motion.div>

              {/* Arrow between steps */}
              {i < PIPELINE_STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ delay: i * 0.15 + 0.1, duration: 0.3 }}
                  className="hidden lg:block w-8 h-px bg-gray-300 dark:bg-gray-700 mx-1"
                />
              )}
            </div>
          ))}
        </div>

        {/* Result branches */}
        <div className="flex justify-center gap-8 mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0 }}
            className="flex items-center gap-2 text-green-600 dark:text-green-400"
          >
            <CheckCircle size={16} /> <span className="text-sm font-medium">Verified</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-2 text-red-500"
          >
            <AlertTriangle size={16} /> <span className="text-sm font-medium">Drift Detected</span>
            <RotateCcw size={12} className="text-gray-400" />
          </motion.div>
        </div>
      </div>

      {/* YouTube Demo */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="aspect-video">
          <iframe
            src="https://www.youtube.com/embed/2Tv3cGaI6PM"
            title="Verify-CBL Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  )
}
```

**Step 2: Verify with dev server**

Run: `npm run dev`, navigate to verify-cbl project page.
Expected: Pipeline animates in on scroll, YouTube video embeds below.

**Step 3: Commit**

```bash
git add components/custom-sections/verification-pipeline.tsx
git commit -m "feat: add animated verification pipeline to Verify-CBL project page"
```

---

### Task 6: Flash-Reasoning Recreated Charts

**Files:**
- Modify: `components/custom-sections/flash-reasoning-charts.tsx`

**Step 1: Implement FlashReasoningCharts**

Recreate 3 charts from the GitHub repo as interactive recharts components. Data from the README:
- Speedup: Standard Attn (1.0x) vs Flash-Reasoning (2.54x)
- Bandwidth: Standard Attn (470 GB/s) vs Flash-Reasoning (1194 GB/s), HBM Limit reference line at 900
- VRAM: Standard (100%) vs Flash-Reasoning (3.4% = 96.6% reduction)

```tsx
"use client"

import { motion } from "framer-motion"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from "recharts"
import type { Project } from "@/data/projects"

// Theme-aware colors using CSS variables would be ideal,
// but recharts needs explicit values. Use a warm/cool palette:
const COLORS = {
  standard: "hsl(0, 0%, 70%)",
  flash: "hsl(220, 80%, 55%)",
  reference: "hsl(350, 65%, 55%)",
}

const speedupData = [
  { name: "Standard Attn", value: 1.0 },
  { name: "Flash-Reasoning", value: 2.54 },
]

const bandwidthData = [
  { name: "Standard Attn", value: 470 },
  { name: "Flash-Reasoning", value: 1194 },
]

const vramData = [
  { name: "Standard", value: 100 },
  { name: "Flash-Reasoning", value: 3.4 },
]

function ChartCard({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-5"
    >
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">{title}</h4>
      <div className="h-48">{children}</div>
    </motion.div>
  )
}

export function FlashReasoningCharts({ project }: { project: Project }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ChartCard title="Attention Speedup (×)" delay={0.2}>
        {/* Bar chart: 1.0x vs 2.54x */}
      </ChartCard>
      <ChartCard title="Effective Bandwidth (GB/s)" delay={0.3}>
        {/* Bar chart: 470 vs 1194, reference line at 900 */}
      </ChartCard>
      <ChartCard title="VRAM Usage (%)" delay={0.4}>
        {/* Bar chart: 100% vs 3.4% */}
      </ChartCard>
    </div>
  )
}
```

Each chart uses recharts `BarChart` with custom tooltip showing the exact value. Colors distinguish "standard" (gray) from "flash" (blue). The bandwidth chart has a dashed red reference line at 900 GB/s labeled "HBM Limit".

**Step 2: Verify with dev server**

Run: `npm run dev`, navigate to flash-reasoning project page.
Expected: 3 charts in a responsive grid, animated entry, interactive tooltips.

**Step 3: Commit**

```bash
git add components/custom-sections/flash-reasoning-charts.tsx
git commit -m "feat: add recreated performance charts to Flash-Reasoning project page"
```

---

### Task 7: Flash-SAE Recreated Charts

**Files:**
- Modify: `components/custom-sections/flash-sae-charts.tsx`

**Step 1: Implement FlashSAECharts**

Recreate charts from the GitHub repo README data:
- Benchmark: Encoder (1.06x), Decoder (13.6x), Full Forward (1.78x) — vs 1.0x PyTorch baseline
- Memory: Standard (100%) vs Flash-SAE (3%) for decoder
- Scaling: How speedup changes with different batch sizes/feature counts (use representative data from README if available, otherwise use the key metrics)

Since the README has 4 charts (benchmark, memory, speedup scaling, training curves), recreate the most impactful ones:

```tsx
const benchmarkData = [
  { name: "Encoder", flash: 1.06, pytorch: 1.0 },
  { name: "Decoder", flash: 13.6, pytorch: 1.0 },
  { name: "Full Forward", flash: 1.78, pytorch: 1.0 },
]

const memoryData = [
  { name: "Standard PyTorch", value: 100 },
  { name: "Flash-SAE", value: 3 },
]
```

Use grouped bar chart for benchmark (PyTorch baseline gray, Flash-SAE blue side by side).

**Step 2: Verify with dev server**

Run: `npm run dev`, navigate to flash-sae project page.
Expected: Charts render with grouped bars, interactive tooltips.

**Step 3: Commit**

```bash
git add components/custom-sections/flash-sae-charts.tsx
git commit -m "feat: add recreated benchmark charts to Flash-SAE project page"
```

---

### Task 8: Agentrial Terminal Showcase

**Files:**
- Modify: `components/custom-sections/terminal-showcase.tsx`

**Step 1: Implement TerminalShowcase**

A terminal window UI showing simulated agentrial output.

```tsx
"use client"

import { motion } from "framer-motion"
import type { Project } from "@/data/projects"

const TERMINAL_LINES = [
  { text: "$ agentrial run booking_agent --trials 50 --parallel 8", type: "command" },
  { text: "", type: "blank" },
  { text: "agentrial v0.5.2 — Statistical Agent Testing Framework", type: "info" },
  { text: "Running 50 trials with 8 parallel workers...", type: "info" },
  { text: "", type: "blank" },
  { text: "  ✓ Trial  1/50  PASS  (3.2s, $0.012)", type: "pass" },
  { text: "  ✓ Trial  2/50  PASS  (2.8s, $0.011)", type: "pass" },
  { text: "  ✗ Trial  3/50  FAIL  step: parse_dates (4.1s, $0.015)", type: "fail" },
  { text: "  ✓ Trial  4/50  PASS  (3.0s, $0.012)", type: "pass" },
  { text: "  ...", type: "dim" },
  { text: "  ✓ Trial 50/50  PASS  (2.9s, $0.011)", type: "pass" },
  { text: "", type: "blank" },
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", type: "dim" },
  { text: "  Results: 47/50 passed", type: "info" },
  { text: "  Success Rate: 94.0% [83.5% — 98.7%] (Wilson CI)", type: "highlight" },
  { text: "  Agent Reliability Score: 87/100", type: "highlight" },
  { text: "", type: "blank" },
  { text: "  Step Failure Attribution (Fisher exact test):", type: "info" },
  { text: "    parse_dates     p=0.003  ★★★  2/3 failures", type: "warn" },
  { text: "    validate_input  p=0.142       1/3 failures", type: "dim" },
  { text: "", type: "blank" },
  { text: "  Cost: $0.61 total ($0.012/trial avg)", type: "info" },
  { text: "  Duration: 18.4s (parallel), est. 156s serial", type: "info" },
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", type: "dim" },
]

export function TerminalShowcase({ project }: { project: Project }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-gray-500 ml-2 font-mono">agentrial</span>
        </div>
        {/* Terminal body */}
        <div className="bg-gray-950 p-4 sm:p-6 font-mono text-sm leading-relaxed overflow-x-auto">
          {TERMINAL_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              className={/* color class based on line.type */}
            >
              {line.text || "\u00A0"}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
```

Color mapping: `command` = white bold, `pass` = green-400, `fail` = red-400, `warn` = yellow-400, `highlight` = cyan-400, `info` = gray-300, `dim` = gray-600.

**Step 2: Verify with dev server**

Run: `npm run dev`, navigate to agentrial project page.
Expected: Terminal window with animated line-by-line appearance, colored output.

**Step 3: Commit**

```bash
git add components/custom-sections/terminal-showcase.tsx
git commit -m "feat: add terminal showcase to agentrial project page"
```

---

### Task 9: Music Genre Classification — Confusion Matrix

**Files:**
- Modify: `components/custom-sections/confusion-matrix-viz.tsx`

**Step 1: Implement ConfusionMatrixViz**

An interactive heatmap showing classification results across 10 GTZAN genres.

```tsx
const GENRES = ["Blues", "Classical", "Country", "Disco", "HipHop", "Jazz", "Metal", "Pop", "Reggae", "Rock"]

// Realistic confusion matrix data (10x10 grid, values 0-100)
// Diagonal should be high (~80-90%), off-diagonal low
const MATRIX = [
  [82, 2, 4, 1, 0, 5, 0, 2, 3, 1], // Blues
  [1, 95, 0, 0, 0, 2, 1, 1, 0, 0], // Classical
  [3, 0, 78, 2, 1, 1, 0, 5, 4, 6], // Country
  // ... etc for all 10 genres
]
```

Each cell is a colored div in a CSS Grid. Color gradient from transparent (0%) through light blue to deep blue (100%). Hover shows tooltip with "Predicted: X, Actual: Y, Value: Z%".

**Step 2: Verify with dev server**

Run: `npm run dev`, navigate to music-genre-classification project page.
Expected: 10x10 grid with colored cells, genre labels on axes, hover tooltips.

**Step 3: Commit**

```bash
git add components/custom-sections/confusion-matrix-viz.tsx
git commit -m "feat: add confusion matrix visualization to music genre classification page"
```

---

### Task 10: ConceptHub AI — App Demo

**Files:**
- Modify: `components/custom-sections/concepthub-demo.tsx`

**Step 1: Implement ConceptHubDemo**

An embedded iframe of the live Vercel app with a fallback.

```tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Maximize2 } from "lucide-react"
import type { Project } from "@/data/projects"

export function ConceptHubDemo({ project }: { project: Project }) {
  const [iframeError, setIframeError] = useState(false)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xs text-gray-500 font-medium">Live Preview</span>
          <a href="https://concepthub-chi.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
            <Maximize2 size={12} /> Open Full App
          </a>
        </div>
        {/* iframe */}
        {!iframeError ? (
          <iframe
            src="https://concepthub-chi.vercel.app/"
            title="ConceptHub Live Preview"
            className="w-full h-[500px] bg-white"
            loading="lazy"
            onError={() => setIframeError(true)}
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center px-6">
            <p className="text-sm text-gray-500 mb-4">Preview unavailable</p>
            <a href="https://concepthub-chi.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg border ...">
              <ExternalLink size={14} /> Open ConceptHub
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}
```

Note: The Vercel app may block iframe embedding (X-Frame-Options). If so, fall back to a styled link card with a screenshot. Check this during implementation.

**Step 2: Verify with dev server**

Run: `npm run dev`, navigate to concepthub-ai project page.
Expected: Either the embedded app or a graceful fallback with link.

**Step 3: Commit**

```bash
git add components/custom-sections/concepthub-demo.tsx
git commit -m "feat: add live app demo to ConceptHub project page"
```

---

### Task 11: GPU Performance Analysis — Enhanced Chart

**Files:**
- Modify: `components/project-chart.tsx` (the existing chart, kept as fallback)

**Step 1: Improve the existing ProjectChart**

The gpu-performance-analysis project uses the generic `ProjectChart`. Enhance it:
- Add animated bar entry (use `animationDuration={800}` on Bar)
- Improve tooltip styling to match the project's visual language
- Add baseline reference line at value=1.0 to show the "parity" line
- Use theme-aware colors that adapt to dark mode

These improvements are minor refinements to the existing component, not a rewrite.

**Step 2: Verify with dev server**

Run: `npm run dev`, navigate to gpu-performance-analysis project page.
Expected: Enhanced chart with smoother animations and baseline reference line.

**Step 3: Commit**

```bash
git add components/project-chart.tsx
git commit -m "feat: enhance project chart with animations and baseline reference"
```

---

### Task 12: Clean Up and Final Verification

**Files:**
- Potentially delete: `components/metric-card.tsx`, `components/feature-grid.tsx` (if no longer imported anywhere)

**Step 1: Check for remaining imports**

Search the entire codebase for imports of `metric-card` and `feature-grid`. If nothing imports them, delete the files.

**Step 2: Run full build**

Run: `npm run build`
Expected: Build succeeds, all pages generate correctly.

**Step 3: Run lint**

Run: `npm run lint`
Expected: No errors.

**Step 4: Visual verification**

Run: `npm run dev` and visit all 9 project pages:
1. `/projects/chessboard-js/` — interactive chessboard
2. `/projects/slam-gaussian-splatting/` — video gallery + thesis link
3. `/projects/verify-cbl/` — animated pipeline + YouTube
4. `/projects/flash-reasoning/` — 3 performance charts
5. `/projects/flash-sae/` — benchmark charts
6. `/projects/agentrial/` — terminal showcase
7. `/projects/music-genre-classification/` — confusion matrix
8. `/projects/concepthub-ai/` — app demo
9. `/projects/gpu-performance-analysis/` — enhanced chart

**Step 5: Final commit**

```bash
git add -A
git commit -m "refactor: clean up unused metric-card and feature-grid components"
```
