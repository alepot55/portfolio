"use client"

import Link from "next/link"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import { MarkdownRenderer } from "./markdown-renderer"
import { MetricCard } from "./metric-card"
import { FeatureGrid } from "./feature-grid"
import { ProjectChart } from "./project-chart"
import { FadeIn } from "./motion-wrapper"
import type { Project } from "@/data/projects"

interface ProjectDetailPageProps {
  project: Project
  content: string
}

const CATEGORY_LABELS: Record<string, string> = {
  "ai-ml": "AI / Machine Learning",
  systems: "Systems / GPU",
  web: "Web Development",
  research: "Research",
}

export function ProjectDetailPage({ project, content }: ProjectDetailPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Live</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Github size={15} />
                <span className="hidden sm:inline">Source</span>
              </a>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <section className="pt-10 sm:pt-16 pb-8 sm:pb-12">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
                {CATEGORY_LABELS[project.category] || project.category}
              </span>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">{project.period}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 sm:mb-5">
              {project.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-6">
              {project.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Metrics Section */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="pb-8 sm:pb-12">
            <div className={`grid gap-4 ${
              project.metrics.length === 2 ? "grid-cols-2" :
              project.metrics.length === 3 ? "grid-cols-1 sm:grid-cols-3" :
              "grid-cols-2 lg:grid-cols-4"
            }`}>
              {project.metrics.map((metric, index) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  description={metric.description}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* Chart + Features Layout */}
        {(project.chartData || project.features) && (
          <section className="pb-8 sm:pb-12">
            <div className={`grid gap-6 ${project.chartData && project.features ? "lg:grid-cols-2" : ""}`}>
              {project.chartData && project.chartLabel && (
                <ProjectChart data={project.chartData} label={project.chartLabel} />
              )}
              {project.features && (
                <div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4"
                  >
                    Key Features
                  </motion.h3>
                  <FeatureGrid features={project.features} />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Markdown Content */}
        {content && (
          <section className="pb-16 sm:pb-24">
            <FadeIn delay={0.3}>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-8 sm:pt-12">
                <article className="max-w-4xl">
                  <MarkdownRenderer content={content} />
                </article>
              </div>
            </FadeIn>
          </section>
        )}

        {/* Navigation Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft size={14} />
              All Projects
            </Link>
            <div className="flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  <Github size={14} />
                  View Source
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
